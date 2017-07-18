package services

import models.db.TokenEntityTable
import models.{TokenEntity, UserEntity}
import utils.DatabaseService

import scala.concurrent.{ExecutionContext, Future}

class AuthService(val databaseService: DatabaseService)(usersService: UsersService)(implicit executionContext: ExecutionContext) extends TokenEntityTable {

  import databaseService._
  import databaseService.driver.api._

  def signIn(gaUserId: String): Future[Option[TokenEntity]] = {
    db.run(users.filter(u => u.gaUserId === gaUserId).result.headOption).flatMap {
      case Some(user) => db.run(tokens.filter(_.userId === user.id).result.headOption).flatMap {
        case Some(token) => Future.successful(Some(token))
        case None => createToken(user).map(token => Some(token))
      }
      case None => Future.successful(None)
    }
  }

  def signUp(newUser: UserEntity): Future[TokenEntity] = {
    usersService.createUser(newUser).flatMap(user => createToken(user))
  }

  def authenticate(token: String): Future[Option[UserEntity]] =
    db.run((for {
      token <- tokens.filter(_.token === token)
      user <- users.filter(_.id === token.userId)
    } yield user).result.headOption)

  def createToken(user: UserEntity): Future[TokenEntity] = db.run {
    tokens returning tokens.map(_.id) into ((token, id) => token.copy(id = Some(id))) += TokenEntity(userId = user.id.get)
  }

}

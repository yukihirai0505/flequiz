package services

import models.db.UserEntityTable
import models.{UserEntity, UserEntityUpdate}
import utils.DatabaseService

import scala.concurrent.{ExecutionContext, Future}

class UsersService(val databaseService: DatabaseService)(implicit executionContext: ExecutionContext) extends UserEntityTable {

  import databaseService._
  import databaseService.driver.api._

  def getUsers: Future[Seq[UserEntity]] = db.run(users.result)

  def getUserById(id: Long): Future[Option[UserEntity]] = db.run(users.filter(_.id === id).result.headOption)

  def createUser(user: UserEntity): Future[UserEntity] = db.run(
    users returning users.map(_.id) into ((user, id) => user.copy(id = Some(id))) += user
  )

  def updateUser(id: Long, userUpdate: UserEntityUpdate): Future[Option[UserEntity]] = getUserById(id).flatMap {
    case Some(user) =>
      val updatedUser = userUpdate.merge(user)
      db.run(users.filter(_.id === id).update(updatedUser)).map(_ => Some(updatedUser))
    case None => Future.successful(None)
  }

  def deleteUser(id: Long): Future[Int] = db.run(users.filter(_.id === id).delete)

}
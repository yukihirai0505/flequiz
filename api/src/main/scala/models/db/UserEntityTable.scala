package models.db

import models.UserEntity
import utils.DatabaseService

trait UserEntityTable {

  protected val databaseService: DatabaseService

  import databaseService.driver.api._
  import slick.jdbc.{GetResult => GR}

  implicit def GetResultUserEntity(implicit e0: GR[String], e1: GR[Option[String]], e2: GR[Boolean], e3: GR[Option[Long]]): GR[UserEntity] = GR{
    prs => import prs._
      val r = (<<?[Long], <<[String], <<[String], <<[String], <<?[String], <<[Boolean])
      import r._
      UserEntity.tupled((_2, _3, _4, _5, _6, _1)) // putting AutoInc last
  }
  class Users(_tableTag: Tag) extends Table[UserEntity](_tableTag, "users") {
    def * = (gaUserId, username, email, profilePicUrl, isAdmin, Rep.Some(id)) <> (UserEntity.tupled, UserEntity.unapply)
    def ? = (Rep.Some(gaUserId), Rep.Some(username), Rep.Some(email), profilePicUrl, Rep.Some(isAdmin), Rep.Some(id)).shaped.<>({r=>import r._; _1.map(_=> UserEntity.tupled((_1.get, _2.get, _3.get, _4, _5.get, _6)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    val gaUserId: Rep[String] = column[String]("ga_user_id", O.Length(100,varying=true))
    val username: Rep[String] = column[String]("username", O.Length(500,varying=true))
    val email: Rep[String] = column[String]("email", O.Length(500,varying=true))
    val profilePicUrl: Rep[Option[String]] = column[Option[String]]("profile_pic_url", O.Length(500,varying=true), O.Default(None))
    val isAdmin: Rep[Boolean] = column[Boolean]("is_admin", O.Default(false))
    val id: Rep[Long] = column[Long]("id", O.AutoInc, O.PrimaryKey)
  }

  lazy val users = new TableQuery(tag => new Users(tag))
}

package models.db

import models.ExamTakeUserEntity
import utils.DatabaseService

trait ExamTakeUserTable {

  protected val databaseService: DatabaseService

  import databaseService.driver.api._
  import slick.jdbc.{GetResult => GR}

  implicit def GetResultExamTakeUserEntity(implicit e0: GR[Long], e1: GR[Int], e2: GR[Option[Long]]): GR[ExamTakeUserEntity] = GR {
    prs =>
      import prs._
      val r = (<<?[Long], <<[Long], <<[Long], <<[Int], <<[Int])
      import r._
      ExamTakeUserEntity.tupled((_2, _3, _4, _5, _1)) // putting AutoInc last
  }

  class ExamTakeUsers(_tableTag: Tag) extends Table[ExamTakeUserEntity](_tableTag, "exam_take_users") {
    def * = (examId, userId, score, takeSeconds, Rep.Some(id)) <> (ExamTakeUserEntity.tupled, ExamTakeUserEntity.unapply)

    def ? = (Rep.Some(examId), Rep.Some(userId), Rep.Some(score), Rep.Some(takeSeconds), Rep.Some(id)).shaped.<>({ r => import r._; _1.map(_ => ExamTakeUserEntity.tupled((_1.get, _2.get, _3.get, _4.get, _5))) }, (_: Any) => throw new Exception("Inserting into ? projection not supported."))

    val examId: Rep[Long] = column[Long]("exam_id")
    val userId: Rep[Long] = column[Long]("user_id")
    val score: Rep[Int] = column[Int]("score")
    val takeSeconds: Rep[Int] = column[Int]("take_seconds")
    val id: Rep[Long] = column[Long]("id", O.AutoInc, O.PrimaryKey)
  }

  lazy val examTakeUser = new TableQuery(tag => new ExamTakeUsers(tag))
}

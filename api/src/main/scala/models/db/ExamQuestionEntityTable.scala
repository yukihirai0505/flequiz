package models.db

import models.ExamQuestionEntity
import utils.DatabaseService

trait ExamQuestionEntityTable {

  protected val databaseService: DatabaseService

  import databaseService.driver.api._
  import slick.jdbc.{GetResult => GR}

  implicit def GetResultExamQuestionEntity(implicit e0: GR[Long], e2: GR[String]): GR[ExamQuestionEntity] = GR{
    prs => import prs._
      val r = (<<?[Long], <<[Long], <<[String])
      import r._
      ExamQuestionEntity.tupled((_2, _3, _1)) // putting AutoInc last
  }
  class ExamQuestions(_tableTag: Tag) extends Table[ExamQuestionEntity](_tableTag, "exam_questions") {
    def * = (examId, content, Rep.Some(id)) <> (ExamQuestionEntity.tupled, ExamQuestionEntity.unapply)
    def ? = (Rep.Some(examId), Rep.Some(content), Rep.Some(id)).shaped.<>({r=>import r._; _1.map(_=> ExamQuestionEntity.tupled((_1.get, _2.get, _3)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    val examId: Rep[Long] = column[Long]("exam_id")
    val content: Rep[String] = column[String]("content")
    val id: Rep[Long] = column[Long]("id", O.AutoInc, O.PrimaryKey)
  }

  lazy val examQuestions = new TableQuery(tag => new ExamQuestions(tag))

}

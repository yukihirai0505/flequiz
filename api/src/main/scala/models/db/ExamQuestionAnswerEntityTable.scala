package models.db

import models.ExamQuestionAnswerEntity
import utils.DatabaseService

trait ExamQuestionAnswerEntityTable {

  protected val databaseService: DatabaseService

  import databaseService.driver.api._
  import slick.jdbc.{GetResult => GR}

  implicit def GetResultExamQuestionAnswerEntity(implicit e0: GR[Long], e1: GR[String], e2: GR[Boolean], e3: GR[Option[Long]]): GR[ExamQuestionAnswerEntity] = GR{
    prs => import prs._
      val r = (<<?[Long], <<[Long], <<[String], <<[Boolean])
      import r._
      ExamQuestionAnswerEntity.tupled((_2, _3, _4, _1)) // putting AutoInc last
  }
  
  class ExamQuestionAnswers(_tableTag: Tag) extends Table[ExamQuestionAnswerEntity](_tableTag, "exam_question_answers") {
    def * = (examQuestionId, content, isCorrectAnswer, Rep.Some(id)) <> (ExamQuestionAnswerEntity.tupled, ExamQuestionAnswerEntity.unapply)
    def ? = (Rep.Some(examQuestionId), Rep.Some(content), Rep.Some(isCorrectAnswer), Rep.Some(id)).shaped.<>({r=>import r._; _1.map(_=> ExamQuestionAnswerEntity.tupled((_1.get, _2.get, _3.get, _4)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    val examQuestionId: Rep[Long] = column[Long]("exam_question_id")
    val content: Rep[String] = column[String]("content", O.Length(500,varying=true))
    val isCorrectAnswer: Rep[Boolean] = column[Boolean]("is_correct_answer")
    val id: Rep[Long] = column[Long]("id", O.AutoInc, O.PrimaryKey)
  }

  lazy val examQuestionAnswers = new TableQuery(tag => new ExamQuestionAnswers(tag))

}

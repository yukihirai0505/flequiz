package models

case class ExamQuestionAnswerEntity(examQuestionId: Long, content: String, isCorrectAnswer: Boolean, id: Option[Long] = None)

case class UpdateExamQuestionAnswerEntity(content: String, id: Option[Long] = None)

case class CreateExamQuestionAnswerEntity(content: String) {
  def merge(examQuestionId: Long, isCorrectAnswer: Boolean): ExamQuestionAnswerEntity = {
    ExamQuestionAnswerEntity(examQuestionId, content, isCorrectAnswer)
  }
}
package models

case class ExamQuestionEntity(examId: Long, content: String, id: Option[Long] = None)

case class UpdateExamQuestionEntity(content: String, id: Option[Long] = None) {
  def merge(examId: Long): ExamQuestionEntity = {
    ExamQuestionEntity(examId, content, id)
  }
}

case class CreateExamQuestionEntity(content: String) {
  def merge(examId: Long): ExamQuestionEntity = {
    ExamQuestionEntity(examId, content)
  }
}
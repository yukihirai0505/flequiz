package models

case class ExamTakeUserEntity(examId: Long, userId: Long, score: Int, takeSeconds: Int, id: Option[Long] = None)

case class CreateExamTakeUserEntity(examId: Long, score: Int, takeSeconds: Int) {
  def merge(userId: Long): ExamTakeUserEntity = {
    ExamTakeUserEntity(examId, userId, score, takeSeconds)
  }
}

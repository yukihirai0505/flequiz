package models

case class ExamEntity(examCategoryId: Long, name: String, limitTime: Int, updateUsername: String, updateDate: String, id: Option[Long] = None)

case class QuestionEntity(question: CreateExamQuestionEntity, answers: Seq[CreateExamQuestionAnswerEntity] = Seq.empty)

case class CreateExamEntity(exam: ExamEntity, questions: Seq[QuestionEntity] = Seq.empty)

case class UpdateQuestionEntity(question: UpdateExamQuestionEntity, answers: Seq[UpdateExamQuestionAnswerEntity] = Seq.empty)

case class UpdateExamEntity(exam: ExamEntity, questions: Seq[UpdateQuestionEntity] = Seq.empty)

case class AllQuestionEntity(question: ExamQuestionEntity, answers: Seq[ExamQuestionAnswerEntity] = Seq.empty)

case class AllExamEntity(exam: ExamEntity, questions: Seq[AllQuestionEntity] = Seq.empty)
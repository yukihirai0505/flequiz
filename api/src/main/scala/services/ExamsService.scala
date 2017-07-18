package services

import models._
import models.db.{ExamQuestionAnswerEntityTable, ExamQuestionEntityTable, ExamsEntityTable}
import utils.DatabaseService

import scala.concurrent.{ExecutionContext, Future}
import scala.language.postfixOps
import scala.util.Random

class ExamsService(val databaseService: DatabaseService)(implicit executionContext: ExecutionContext)
  extends ExamsEntityTable with ExamQuestionAnswerEntityTable with ExamQuestionEntityTable {

  import databaseService._
  import databaseService.driver.api._

  def getExams: Future[Seq[ExamEntity]] = db.run(exams.result)

  def getExamById(examId: Long, isAnswerRandom: Boolean = false): Future[AllExamEntity] = {
    val action = for {
      (exam, examQuestionAnswers) <- exams.filter(_.id === examId) join examQuestions on (_.id === _.examId) join examQuestionAnswers on (_._2.id === _.examQuestionId)
    } yield {
      (exam._1, exam._2, examQuestionAnswers)
    }
    db.run(action.result).flatMap { r =>
      val exam = r.head._1
      val questions: Seq[AllQuestionEntity] = r.groupBy(x => x._2.id).map { x =>
        val question = x._2.head._2
        val answers = x._2.map { y =>
          y._3
        }
        AllQuestionEntity(question = question, answers = if (isAnswerRandom) Random.shuffle(answers) else answers.sortBy(x => x.id))
      }.toSeq
      Future successful AllExamEntity(exam = exam, questions = questions.sortBy(x => x.question.id))
    }
  }

  def createExam(entity: CreateExamEntity): Future[AllExamEntity] = {
    val action = for {
      exam <- exams returning exams.map(_.id) into ((exam, id) => exam.copy(id = Some(id))) += entity.exam
      questions <- DBIO.sequence(entity.questions.map { q =>
        for {
          question <- examQuestions returning examQuestions.map(_.id) into ((examQuestion, id) => examQuestion.copy(id = Some(id))) += q.question.merge(examId = exam.id.get)
          answers <- {
            val answers = q.answers.zipWithIndex.map { case (a, i) => a.merge(examQuestionId = question.id.get, isCorrectAnswer = i == 0) }
            examQuestionAnswers returning examQuestionAnswers.map(_.id) into ((questionAnswers, id) => questionAnswers.copy(id = Some(id))) ++= answers
          }
        } yield AllQuestionEntity(question, answers)
      }
      )
    } yield AllExamEntity(exam, questions)
    db.run(action)
  }

  def updateExam(examId: Long, entity: UpdateExamEntity): Future[Option[AllExamEntity]] = {
    val action = for {
      exam <- {
        val updateExam = entity.exam.copy(id = Some(examId))
        exams.filter(_.id === examId).update(updateExam).map(_ => updateExam)
      }
      _ <- {
        val filteredQuestion = entity.questions.filter(_.question.id.isDefined)
        val qIds = filteredQuestion.map(_.question.id.get)
        var aIds = Seq.empty[Long]
        filteredQuestion.foreach { q =>
          val filteredAnswers = q.answers.filter(_.id.isDefined)
          aIds ++ filteredAnswers.map(_.id.get)
        }
        for {
          _ <- examQuestions.filter(_.examId === examId).filterNot(_.id inSet qIds).delete
          _ <- examQuestionAnswers.filter(_.examQuestionId inSet qIds).filterNot(_.id inSet aIds).delete
        } yield {}
      }
      questions <- DBIO.sequence(entity.questions.map { q =>
        for {
          question <- {
            val newQuestion = q.question.merge(examId)
            (examQuestions returning examQuestions.map(_.id)).insertOrUpdate(newQuestion).map {
              case Some(id) => newQuestion.copy(id = Some(id))
              case None => newQuestion
            }
          }
          answers <- {
            val answers = q.answers.zipWithIndex.map { case (a, i) =>
              ExamQuestionAnswerEntity(examQuestionId = question.id.get, content = a.content, isCorrectAnswer = i == 0, id = a.id)
            }
            DBIO.sequence(answers.map { answer =>
              (examQuestionAnswers returning examQuestionAnswers.map(_.id)).insertOrUpdate(answer).map {
                case Some(id) => answer.copy(id = Some(id))
                case None => answer
              }
            })
          }
        } yield AllQuestionEntity(question, answers)
      }
      )
    } yield Some(AllExamEntity(exam, questions))
    db.run(action).recover { case e =>
      println(e.getMessage)
      None
    }
  }

}
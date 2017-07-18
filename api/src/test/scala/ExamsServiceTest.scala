import java.text.SimpleDateFormat
import java.util.Calendar

import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.model.{HttpEntity, MediaTypes}
import io.circe.generic.auto._
import models.{AllExamEntity, CreateExamEntity}
import org.scalatest.concurrent.ScalaFutures

import scala.util.Random

class ExamsServiceTest extends BaseServiceTest with ScalaFutures {

  trait Context {
    val testCategories = provisionExamCategoriesList(2)
    val route = httpService.examsRouter.route
  }

  "Exams service" should {

    "retrieve exams list" in new Context {
      Get("/exams") ~> route ~> check {
        response.status should be(OK)
      }
    }

    "create exam and retrieve it" in new Context {
      val testCategory = testCategories.head
      val examName = "yeah!testName"
      val format = new SimpleDateFormat("yyyy-MM-dd")
      val requestEntity = HttpEntity(MediaTypes.`application/json`,
        s"""{
               "exam": {
                   "examCategoryId": ${testCategory.id.get},
                   "name": "$examName",
                   "limitTime": 60,
                   "updateUsername": "test user",
                   "updateDate": "${format.format(Calendar.getInstance().getTime)}"
               },
               "questions": [
                 {
                   "question": {
                     "content": "hogehoge"
                   },
                   "answers": [
                     {
                       "content": "isCorrectAnswer"
                     },
                     {
                     "content": "ageage"
                     }
                   ]
                 },
                 {
                   "question": {
                     "content": "sagesage"
                   },
                   "answers": [
                     {
                       "content": "isCorrectAnswer"
                     },
                     {
                     "content": "ageage"
                     }
                   ]
                 }
               ]
           }""".stripMargin)

      Post("/exams", requestEntity) ~> route ~> check {
        response.status should be(Created)
        responseAs[CreateExamEntity].exam.name should be(examName)
      }
    }

    "retrieve exam by id" in new Context {
      val testCategory = testCategories.head
      val entity = provisionExamsList(1, testCategory.id.get).head
      Get(s"/exams/${entity.exam.id.get}?is_random=false") ~> route ~> check {
        response.status should be(OK)
        responseAs[AllExamEntity].exam.name should be(entity.exam.name)
      }
    }

    "update exam by id" in new Context {
      val testCategory = testCategories.head
      val entity = provisionExamsList(1, testCategory.id.get).head
      val newExamName = s"テスト-${Random.nextString(10)}"
      val newQuestionContent = s"テスト-${Random.nextString(10)}"
      val newCorrectAnswer = "isNewCorrectAnswer"
      val format = new SimpleDateFormat("yyyy-MM-dd")
      val requestEntity = HttpEntity(MediaTypes.`application/json`,
        s"""{
               "exam": {
                   "examCategoryId": ${testCategory.id.get},
                   "name": "$newExamName",
                   "limitTime": 30,
                   "updateUsername": "test user",
                   "updateDate": "${format.format(Calendar.getInstance().getTime)}"
               },
               "questions": [
                 {
                   "question": {
                     "id": ${entity.questions.head.question.id.get},
                     "content": "$newQuestionContent"
                   },
                   "answers": [
                     {
                       "id": "${entity.questions.head.answers.head.id.get}",
                       "content": "$newCorrectAnswer"
                     },
                     {
                     "content": "ageage"
                     }
                   ]
                 },
                 {
                   "question": {
                     "content": "sagesage"
                   },
                   "answers": [
                     {
                       "content": "isCorrectAnswer"
                     },
                     {
                     "content": "ageage"
                     }
                   ]
                 }
               ]
           }""".stripMargin)
      Put(s"/exams/${entity.exam.id.get}", requestEntity) ~> route ~> check {
        response.status should be(Created)
        responseAs[AllExamEntity].exam.name should be(newExamName)
        responseAs[AllExamEntity].questions.head.question.content should be(newQuestionContent)
        responseAs[AllExamEntity].questions.head.answers.head.content should be(newCorrectAnswer)
      }
    }
  }

}

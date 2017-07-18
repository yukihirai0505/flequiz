import akka.http.scaladsl.model.{HttpEntity, MediaTypes}
import io.circe.generic.auto._
import models.ExamTakeUserEntity
import org.scalatest.concurrent.ScalaFutures

import scala.util.Random

class ExamTakeUsersServiceTest extends BaseServiceTest with ScalaFutures {

  import examTakeUsersService._

  trait Context {
    val testUsers = provisionUsersList(1)
    val testTokens = provisionTokensForUsers(testUsers)
    val route = httpService.examTakeUsersRouter.route
  }

  "ExamTakeUsers service" should {

    "retrieve exam take users by user id" in new Context {
      val testUser = testUsers.head
      provisionExamTakeUsersList(1, testUser.id.get)
      val header = "Token" -> testTokens.find(_.userId == testUser.id.get).get.token
      Get(s"/exam_take_users/user") ~> addHeader(header._1, header._2) ~> route ~> check {
        responseAs[Seq[ExamTakeUserEntity]].isEmpty should be(false)
      }
    }

    "retrieve exam take user by id" in new Context {
      val testUser = testUsers.head
      val testExamTakeUser = provisionExamTakeUsersList(1, testUser.id.get).head
      Get(s"/exam_take_users/${testExamTakeUser.id.get}") ~> route ~> check {
        responseAs[ExamTakeUserEntity] should be(testExamTakeUser)
      }
    }

    "create exam take user" in new Context {
      val testUser = testUsers.head
      val header = "Token" -> testTokens.find(_.userId == testUser.id.get).get.token
      val testCategory = provisionExamCategoriesList(1).head
      val testExam = provisionExamsList(1, testCategory.id.get).head
      val score = Random.nextInt(10)
      val takeSeconds = Random.nextInt(5)
      val requestEntity = HttpEntity(MediaTypes.`application/json`,
        s"""{"score": "$score", "examId": "${testExam.exam.id.get}", "userId": "${testUser.id.get}", "takeSeconds": "$takeSeconds"}""".stripMargin
      )
      Post("/exam_take_users", requestEntity) ~> addHeader(header._1, header._2) ~> route ~> check {
        responseAs[ExamTakeUserEntity].score should be(score)
      }
    }

    "update exam take user" in new Context {
      val testUser = testUsers.head
      val testExamTakeUser = provisionExamTakeUsersList(1, testUser.id.get).head
      val newScore = Random.nextInt(10)
      val requestEntity = HttpEntity(MediaTypes.`application/json`,
        s"""{"score": "$newScore", "examId": "${testExamTakeUser.examId}", "userId": "${testExamTakeUser.userId}", "takeSeconds": "${testExamTakeUser.takeSeconds}"}""".stripMargin
      )
      val header = "Token" -> testTokens.find(_.userId == testExamTakeUser.userId).get.token
      Post("/exam_take_users", requestEntity) ~> addHeader(header._1, header._2) ~> route ~> check {
        responseAs[ExamTakeUserEntity] should be(testExamTakeUser.copy(score = newScore))
        whenReady(getByExamTakeUserId(testExamTakeUser.id.get)) { result =>
          result.get.score should be(newScore)
        }
      }
    }

  }

}

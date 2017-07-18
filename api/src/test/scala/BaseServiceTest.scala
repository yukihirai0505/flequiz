import java.text.SimpleDateFormat
import java.util.Calendar

import akka.http.scaladsl.testkit.ScalatestRouteTest
import de.heikoseeberger.akkahttpcirce.CirceSupport
import http.HttpService
import models._
import org.scalatest.{Matchers, WordSpec}
import services._
import utils.DatabaseService

import scala.concurrent.duration._
import scala.concurrent.{Await, Future}
import scala.util.Random

/**
  * author Yuki Hirai on 2017/06/27.
  */
trait BaseServiceTest extends WordSpec with Matchers with ScalatestRouteTest with CirceSupport {

  private val databaseService = new DatabaseService("jdbc:mysql://localhost:3306/flequiz?autoReconnect=true&useSSL=false&useUnicode=yes&characterEncoding=UTF-8&connectionCollation=utf8mb4_general_ci", "root", "root")

  val usersService = new UsersService(databaseService)
  val authService = new AuthService(databaseService)(usersService)
  val examCategoriesService = new ExamCategoriesService(databaseService)
  val examsService = new ExamsService(databaseService)
  val examTakeUsersService = new ExamTakeUsersService(databaseService)
  val rankingService = new RankingService(databaseService)
  val alertService = new AlertService(databaseService)
  val httpService = new HttpService(
    usersService, authService, examCategoriesService,
    examsService, examTakeUsersService, rankingService, alertService
  )

  def provisionUsersList(size: Int): Seq[UserEntity] = {
    val savedUsers = (1 to size).map { _ =>
      UserEntity(
        id = Some(Random.nextLong()),
        gaUserId = s"テスト${Random.nextInt()}",
        username = s"テスト${Random.nextInt()}",
        email = s"hogehoge${Random.nextInt()}"
      )
    }.map(usersService.createUser)

    Await.result(Future.sequence(savedUsers), 10.seconds)
  }

  def provisionExamCategoriesList(size: Int): Seq[ExamCategoryEntity] = {
    val savedExamCategories = (1 to size).map { _ =>
      ExamCategoryEntity(id = Some(Random.nextLong()), name = s"テスト${Random.nextInt()}")
    }.map(examCategoriesService.createExamCategory)
    Await.result(Future.sequence(savedExamCategories), 10.seconds)
  }

  def provisionExamsList(size: Int, examCategoryId: Long): Seq[AllExamEntity] = {
    val format = new SimpleDateFormat("yyyy-MM-dd")
    val savedExams = (1 to size).map { _ =>
      val exam = ExamEntity(
        examCategoryId,
        name = s"テスト${Random.nextInt()}",
        limitTime = 60,
        updateUsername = "test",
        updateDate = format.format(Calendar.getInstance().getTime)
      )
      val questions = Seq(QuestionEntity(question = CreateExamQuestionEntity("hogehoge"), answers = Seq(CreateExamQuestionAnswerEntity("answer"))))
      CreateExamEntity(exam, questions)
    }.map(examsService.createExam)
    Await.result(Future.sequence(savedExams), 10.seconds)
  }

  def provisionExamTakeUsersList(size: Int, userId: Long): Seq[ExamTakeUserEntity] = {
    val testCategory = provisionExamCategoriesList(1).head
    val testExam = provisionExamsList(1, testCategory.id.get).head
    val savedExams = (1 to size).map { _ =>
      ExamTakeUserEntity(
        examId = testExam.exam.id.get,
        userId = userId,
        score = Random.nextInt(10),
        takeSeconds = Random.nextInt(10)
      )
    }.map(examTakeUsersService.createExamTakeUser)
    Await.result(Future.sequence(savedExams), 10.seconds)
  }

  def provisionTokensForUsers(usersList: Seq[UserEntity]) = {
    val savedTokens = usersList.map(authService.createToken)
    Await.result(Future.sequence(savedTokens), 10.seconds)
  }

}

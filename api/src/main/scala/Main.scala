import akka.actor.ActorSystem
import akka.event.{Logging, LoggingAdapter}
import akka.http.scaladsl.Http
import akka.stream.ActorMaterializer
import http.HttpService
import services._
import utils.{Config, DatabaseService, FlywayService}

import scala.concurrent.ExecutionContext

/**
  * author Yuki Hirai on 2017/06/27.
  */
object Main extends App with Config {
  implicit val actorSystem = ActorSystem()
  implicit val executor: ExecutionContext = actorSystem.dispatcher
  implicit val log: LoggingAdapter = Logging(actorSystem, getClass)
  implicit val materializer: ActorMaterializer = ActorMaterializer()

  val flywayService = new FlywayService(jdbcUrl, dbUser, dbPassword)
  flywayService.migrateDatabaseSchema()

  val databaseService = new DatabaseService(jdbcUrl, dbUser, dbPassword)

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

  Http().bindAndHandle(httpService.routes, httpHost, httpPort)
}

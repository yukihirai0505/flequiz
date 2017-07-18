package http

import akka.actor.ActorSystem
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import http.routes._
import services._
import utils.CorsSupport

import scala.concurrent.ExecutionContext

class HttpService(usersService: UsersService,
                  authService: AuthService,
                  examCategoriesService: ExamCategoriesService,
                  examsService: ExamsService,
                  examTakeUsersService: ExamTakeUsersService,
                  rankingService: RankingService,
                  alertService: AlertService
                 )(implicit executionContext: ExecutionContext, actorSystem: ActorSystem, materializer: ActorMaterializer) extends CorsSupport {

  val usersRouter = new UsersServiceRoute(authService, usersService)
  val authRouter = new AuthServiceRoute(authService)
  val examCategoriesRouter = new ExamCategoriesServiceRoute(authService, examCategoriesService)
  val examsRouter = new ExamsServiceRoute(authService, examsService)
  val examTakeUsersRouter = new ExamTakeUsersServiceRoute(authService, examTakeUsersService)
  val rankingRouter = new RankingServiceRoute(authService, rankingService)
  val alertRouter = new AlertServiceRoute(authService, alertService)

  val routes =
    pathPrefix("v1") {
      corsHandler {
        usersRouter.route ~
          authRouter.route ~
          examCategoriesRouter.route ~
          examsRouter.route ~
          examTakeUsersRouter.route ~
          rankingRouter.route ~
          alertRouter.route
      }
    }

}

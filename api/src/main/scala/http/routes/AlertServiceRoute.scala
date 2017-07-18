package http.routes

import akka.http.scaladsl.server.Directives._
import de.heikoseeberger.akkahttpcirce.CirceSupport
import http.SecurityDirectives
import services.{AlertService, AuthService}

import scala.concurrent.ExecutionContext

class AlertServiceRoute(val authService: AuthService,
                        alertService: AlertService
                       )(implicit executionContext: ExecutionContext) extends CirceSupport with SecurityDirectives {

  import akka.http.scaladsl.model.StatusCodes._
  import alertService._

  val route = pathPrefix("alerts") {
    pathEndOrSingleSlash {
      post {
        onSuccess(sendAlertMail) { ignored =>
          complete(OK)
        }
      }
    }
  }

}

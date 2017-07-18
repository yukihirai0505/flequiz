package http.routes

import akka.actor.ActorSystem
import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directives.{entity, _}
import akka.stream.ActorMaterializer
import de.heikoseeberger.akkahttpcirce.CirceSupport
import http.SecurityDirectives
import io.circe.generic.auto._
import io.circe.syntax._
import models.CreateExamTakeUserEntity
import services.{AuthService, ExamTakeUsersService}
import utils.Config

import scala.concurrent.ExecutionContext

class ExamTakeUsersServiceRoute(val authService: AuthService, examTakeUsersService: ExamTakeUsersService)(implicit executionContext: ExecutionContext, actorSystem: ActorSystem, materializer: ActorMaterializer)
  extends CirceSupport
    with SecurityDirectives with Config {

  import StatusCodes._
  import examTakeUsersService._

  val route = pathPrefix("exam_take_users") {
    pathEndOrSingleSlash {
      authenticate { loggedUser =>
        post {
          entity(as[CreateExamTakeUserEntity]) { entity =>
            complete(Created -> createExamTakeUser(entity.merge(loggedUser.id.get)).map(_.asJson))
          }
        }
      }
    } ~ pathPrefix(IntNumber) { id =>
      pathEndOrSingleSlash {
        get {
          complete(getByExamTakeUserId(id).map(_.asJson))
        }
      }
    } ~ pathPrefix("user") {
      pathEndOrSingleSlash {
        authenticate { loggedUser =>
          get {
            complete(getByUserId(loggedUser.id.get).map(_.asJson))
          }
        }
      }
    }
  }

  private case class AlibabaResponse(user: AlibabaUser)

  private case class AlibabaUser(email: String, gaId: String, name: AlibabaUserName)

  private case class AlibabaUserName(familyName: String, givenName: String)

}

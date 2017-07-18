package http.routes

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.{HttpRequest, StatusCodes, Uri}
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.unmarshalling.Unmarshal
import akka.stream.ActorMaterializer
import de.heikoseeberger.akkahttpcirce.CirceSupport
import http.SecurityDirectives
import io.circe.generic.auto._
import models.UserEntity
import services.AuthService
import utils.Config

import scala.concurrent.{ExecutionContext, Future}
import scala.util.Failure

class AuthServiceRoute(val authService: AuthService)(implicit executionContext: ExecutionContext, actorSystem: ActorSystem, materializer: ActorMaterializer)
  extends CirceSupport
    with SecurityDirectives with Config {

  import StatusCodes._
  import authService._

  val route = pathPrefix("auth") {
    path("signIn") {
      pathEndOrSingleSlash {
        get {
          val redirectUrl = "redirect url" // TODO
          redirect(redirectUrl, MovedPermanently)
        }
      }
    } ~
      path("callback") {
        pathEndOrSingleSlash {
          get {
            parameters('ga_id.as[String]) { gaUserId =>
              val token: Future[String] = signIn(gaUserId).flatMap {
                case Some(t) => Future successful t.token
                case None =>
                  val userApi = Uri("api url") // TODO
                  val content = for {
                    res <- Http().singleRequest(HttpRequest(uri = userApi))
                    entity <- Unmarshal(res.entity).to[AlibabaResponse]
                  } yield entity
                  content.flatMap { alibabaData =>
                    val newUser = UserEntity(
                      gaUserId = alibabaData.user.gaId,
                      username = s"${alibabaData.user.name.familyName} ${alibabaData.user.name.givenName}",
                      email = alibabaData.user.email,
                      profilePicUrl = alibabaData.user.profilePicUrl
                    )
                    signUp(newUser).flatMap(t => Future successful t.token)
                  }
              }
              onComplete(token) {
                case scala.util.Success(value) => redirect(s"$userCallbackUrl?token=$value", Found)
                case Failure(ex) => complete((InternalServerError, s"An error occurred: ${ex.getMessage}"))
              }
            }
          }
        }
      }
  }

  private case class AlibabaResponse(user: AlibabaUser)

  private case class AlibabaUser(email: String, gaId: String, name: AlibabaUserName, profilePicUrl: Option[String] = None)

  private case class AlibabaUserName(familyName: String, givenName: String)

}

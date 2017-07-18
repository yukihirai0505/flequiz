package http.routes

import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directives.{entity, _}
import de.heikoseeberger.akkahttpcirce.CirceSupport
import http.SecurityDirectives
import io.circe.generic.auto._
import io.circe.syntax._
import models.{CreateExamEntity, UpdateExamEntity}
import services.{AuthService, ExamsService}

import scala.concurrent.ExecutionContext

class ExamsServiceRoute(
                         val authService: AuthService,
                         val examsService: ExamsService
                       )(implicit executionContext: ExecutionContext) extends CirceSupport with SecurityDirectives {

  import StatusCodes._
  import examsService._

  val route = pathPrefix("exams") {
    pathEndOrSingleSlash {
      get {
        complete(getExams.map(_.asJson))
      } ~
        post {
          entity(as[CreateExamEntity]) { entity =>
            if (entity.questions.isEmpty || entity.questions.exists(_.answers.isEmpty)) {
              complete(BadRequest)
            } else complete(Created -> createExam(entity).map(_.asJson))
          }
        }
    } ~ pathPrefix(IntNumber) { id =>
      pathEndOrSingleSlash {
        get {
          parameters('is_random.as[Boolean]) { isRandom =>
            complete(getExamById(id, isRandom).map(_.asJson))
          }
        } ~ put {
          entity(as[UpdateExamEntity]) { entity =>
            if (entity.questions.isEmpty || entity.questions.exists(_.answers.isEmpty)) {
              complete(BadRequest)
            } else complete(Created -> updateExam(id, entity).map(_.asJson))
          }
        }
      }
    }
  }

}

package http.routes

import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directives._
import de.heikoseeberger.akkahttpcirce.CirceSupport
import http.SecurityDirectives
import io.circe.generic.auto._
import io.circe.syntax._
import models.ExamCategoryEntity
import services.{AuthService, ExamCategoriesService}

import scala.concurrent.ExecutionContext

class ExamCategoriesServiceRoute(
                                  val authService: AuthService,
                                  val examCategoriesService: ExamCategoriesService
                                )(implicit executionContext: ExecutionContext) extends CirceSupport with SecurityDirectives {

  import StatusCodes._
  import examCategoriesService._

  val route = pathPrefix("exam_categories") {
    pathEndOrSingleSlash {
      get {
        complete(getExamCategories.map(_.asJson))
      } ~
        post {
          entity(as[ExamCategoryEntity]) { entity =>
            complete(Created -> createExamCategory(entity).map(_.asJson))
          }
        }
    } ~ pathPrefix(IntNumber) { id =>
      pathEndOrSingleSlash {
        put {
          entity(as[ExamCategoryEntity]) { entity =>
            complete(updateExamCategory(id, entity).map(_.asJson))
          }
        } ~
          delete {
            onSuccess(deleteExamCategory(id)) { ignored =>
              complete(NoContent)
            }
          }
      }
    }
  }

}

import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.model.{HttpEntity, MediaTypes}
import io.circe.generic.auto._
import models.ExamCategoryEntity
import org.scalatest.concurrent.ScalaFutures

import scala.util.Random

class ExamCategoriesServiceTest extends BaseServiceTest with ScalaFutures {

  import examCategoriesService._

  trait Context {
    val testCategories = provisionExamCategoriesList(2)
    val route = httpService.examCategoriesRouter.route
  }

  "ExamCategories service" should {

    "retrieve exam categories list" in new Context {
      Get("/exam_categories") ~> route ~> check {
        responseAs[Seq[ExamCategoryEntity]].isEmpty should be(false)
      }
    }

    "create exam category and retrieve it" in new Context {
      val categoryName = "ugauga"
      val requestEntity = HttpEntity(MediaTypes.`application/json`, s"""{"name": "$categoryName"}""")

      Post("/exam_categories", requestEntity) ~> route ~> check {
        response.status should be(Created)
        responseAs[ExamCategoryEntity].name should be(categoryName)
      }
    }

    "update exam categories by id and retrieve it" in new Context {
      val testCategory = testCategories(1)
      val newName = s"アップデートテスト${Random.nextInt()}"
      val requestEntity = HttpEntity(MediaTypes.`application/json`, s"""{"name": "$newName"}""")

      Put(s"/exam_categories/${testCategory.id.get}", requestEntity) ~> route ~> check {
        responseAs[ExamCategoryEntity] should be(testCategory.copy(name = newName))
        whenReady(getExamCategoryById(testCategory.id.get)) { result =>
          result.get.name should be(newName)
        }
      }
    }

    "delete exam categories" in new Context {
      val testCategory = testCategories.head
      Delete(s"/exam_categories/${testCategory.id.get}") ~> route ~> check {
        response.status should be(NoContent)
        whenReady(getExamCategoryById(testCategory.id.get)) { result =>
          result should be(None: Option[ExamCategoryEntity])
        }
      }
    }

  }

}

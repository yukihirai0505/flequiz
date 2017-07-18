package services

import models.ExamCategoryEntity
import models.db.ExamCategoryEntityTable
import utils.DatabaseService

import scala.concurrent.{ExecutionContext, Future}

class ExamCategoriesService(val databaseService: DatabaseService)(implicit executionContext: ExecutionContext) extends ExamCategoryEntityTable {

  import databaseService._
  import databaseService.driver.api._

  def getExamCategories: Future[Seq[ExamCategoryEntity]] = db.run(examCategories.result)

  def getExamCategoryById(id: Long): Future[Option[ExamCategoryEntity]] = db.run(examCategories.filter(_.id === id).result.headOption)

  def createExamCategory(entity: ExamCategoryEntity): Future[ExamCategoryEntity] = db.run(
    examCategories returning examCategories.map(_.id) into ((examCategory, id) => examCategory.copy(id = Some(id))) += entity
  )

  def updateExamCategory(id: Long, entity: ExamCategoryEntity): Future[Option[ExamCategoryEntity]] = getExamCategoryById(id).flatMap {
    case Some(examCategory) =>
      val updateEntity = entity.copy(id = examCategory.id)
      db.run(examCategories.filter(_.id === id).update(updateEntity)).map(_ => Some(updateEntity))
    case None => Future.successful(None)
  }

  def deleteExamCategory(id: Long): Future[Int] = db.run(examCategories.filter(_.id === id).delete)

}
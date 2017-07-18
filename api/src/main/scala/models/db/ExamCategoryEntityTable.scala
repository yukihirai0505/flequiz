package models.db

import models.ExamCategoryEntity
import utils.DatabaseService

trait ExamCategoryEntityTable {

  protected val databaseService: DatabaseService

  import databaseService.driver.api._
  import slick.jdbc.{GetResult => GR}

  implicit def GetResultExamCategoriesRow(implicit e0: GR[String], e1: GR[Option[Long]]): GR[ExamCategoryEntity] = GR{
    prs => import prs._
      val r = (<<?[Long], <<[String])
      import r._
      ExamCategoryEntity.tupled((_2, _1)) // putting AutoInc last
  }

  class ExamCategories(_tableTag: Tag) extends Table[ExamCategoryEntity](_tableTag, "exam_categories") {
    def * = (name, Rep.Some(id)) <> (ExamCategoryEntity.tupled, ExamCategoryEntity.unapply)
    def ? = (Rep.Some(name), Rep.Some(id)).shaped.<>({r=>import r._; _1.map(_=> ExamCategoryEntity.tupled((_1.get, _2)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    val name: Rep[String] = column[String]("name", O.Length(100,varying=true))
    val id: Rep[Long] = column[Long]("id", O.AutoInc, O.PrimaryKey)
  }
  lazy val examCategories = new TableQuery(tag => new ExamCategories(tag))
}

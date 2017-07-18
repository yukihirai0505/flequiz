package models.db

import models.ExamEntity
import utils.DatabaseService

trait ExamsEntityTable {

  protected val databaseService: DatabaseService

  import databaseService.driver.api._
  import slick.jdbc.{GetResult => GR}

  implicit def GetResultExamEntity(implicit e0: GR[Long], e1: GR[String], e2: GR[Int], e3: GR[Option[Long]]): GR[ExamEntity] = GR{
    prs => import prs._
      val r = (<<?[Long], <<[Long], <<[String], <<[Int], <<[String], <<[String])
      import r._
      ExamEntity.tupled((_2, _3, _4, _5, _6, _1)) // putting AutoInc last
  }
  /** Table description of table exams. Objects of this class serve as prototypes for rows in queries. */
  class Exams(_tableTag: Tag) extends Table[ExamEntity](_tableTag, "exams") {
    def * = (examCategoryId, name, limitTime, updateUsername, updateDate, Rep.Some(id)) <> (ExamEntity.tupled, ExamEntity.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(examCategoryId), Rep.Some(name), Rep.Some(limitTime), Rep.Some(updateUsername), Rep.Some(updateDate), Rep.Some(id)).shaped.<>({r=>import r._; _1.map(_=> ExamEntity.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column exam_category_id SqlType(BIGINT) */
    val examCategoryId: Rep[Long] = column[Long]("exam_category_id")
    /** Database column name SqlType(VARCHAR), Length(100,true) */
    val name: Rep[String] = column[String]("name", O.Length(100,varying=true))
    /** Database column limit_time SqlType(INT) */
    val limitTime: Rep[Int] = column[Int]("limit_time")
    /** Database column update_username SqlType(VARCHAR), Length(500,true) */
    val updateUsername: Rep[String] = column[String]("update_username", O.Length(500,varying=true))
    /** Database column updae_date SqlType(VARCHAR), Length(45,true) */
    val updateDate: Rep[String] = column[String]("update_date", O.Length(45,varying=true))
    /** Database column id SqlType(BIGINT), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("id", O.AutoInc, O.PrimaryKey)
  }

  lazy val exams = new TableQuery(tag => new Exams(tag))
}

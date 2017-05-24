package models
// AUTO-GENERATED Slick data model
/** Stand-alone Slick data model for immediate use */
object Tables extends {
  val profile = slick.driver.PostgresDriver
} with Tables

/** Slick data model trait for extension, choice of backend or usage in the cake pattern. (Make sure to initialize this late.) */
trait Tables {
  val profile: slick.driver.JdbcProfile
  import profile.api._
  import com.github.tototoshi.slick.MySQLJodaSupport._
  import org.joda.time.DateTime
  import slick.model.ForeignKeyAction
  // NOTE: GetResult mappers for plain SQL are only generated for tables where Slick knows how to map the types of all columns.
  import slick.jdbc.{GetResult => GR}

  /** DDL for all tables. Call .create to execute. */
  lazy val schema: profile.SchemaDescription = AnswerCategories.schema ++ Answers.schema ++ Questions.schema
  @deprecated("Use .schema instead of .ddl", "3.0")
  def ddl = schema

  /** Entity class storing rows of table AnswerCategories
   *  @param category Database column category SqlType(varchar), Length(100,true)
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey */
  case class AnswerCategoriesRow(category: String, id: Option[Int] = None)
  /** GetResult implicit for fetching AnswerCategoriesRow objects using plain SQL queries */
  implicit def GetResultAnswerCategoriesRow(implicit e0: GR[String], e1: GR[Option[Int]]): GR[AnswerCategoriesRow] = GR{
    prs => import prs._
    val r = (<<?[Int], <<[String])
    import r._
    AnswerCategoriesRow.tupled((_2, _1)) // putting AutoInc last
  }
  /** Table description of table answer_categories. Objects of this class serve as prototypes for rows in queries. */
  class AnswerCategories(_tableTag: Tag) extends Table[AnswerCategoriesRow](_tableTag, "answer_categories") {
    def * = (category, Rep.Some(id)) <> (AnswerCategoriesRow.tupled, AnswerCategoriesRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(category), Rep.Some(id)).shaped.<>({r=>import r._; _1.map(_=> AnswerCategoriesRow.tupled((_1.get, _2)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column category SqlType(varchar), Length(100,true) */
    val category: Rep[String] = column[String]("category", O.Length(100,varying=true))
    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
  }
  /** Collection-like TableQuery object for table AnswerCategories */
  lazy val AnswerCategories = new TableQuery(tag => new AnswerCategories(tag))

  /** Entity class storing rows of table Answers
   *  @param category Database column category SqlType(int4)
   *  @param answer Database column answer SqlType(varchar), Length(100,true)
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey */
  case class AnswersRow(category: Int, answer: String, id: Option[Int] = None)
  /** GetResult implicit for fetching AnswersRow objects using plain SQL queries */
  implicit def GetResultAnswersRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Option[Int]]): GR[AnswersRow] = GR{
    prs => import prs._
    val r = (<<?[Int], <<[Int], <<[String])
    import r._
    AnswersRow.tupled((_2, _3, _1)) // putting AutoInc last
  }
  /** Table description of table answers. Objects of this class serve as prototypes for rows in queries. */
  class Answers(_tableTag: Tag) extends Table[AnswersRow](_tableTag, "answers") {
    def * = (category, answer, Rep.Some(id)) <> (AnswersRow.tupled, AnswersRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(category), Rep.Some(answer), Rep.Some(id)).shaped.<>({r=>import r._; _1.map(_=> AnswersRow.tupled((_1.get, _2.get, _3)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column category SqlType(int4) */
    val category: Rep[Int] = column[Int]("category")
    /** Database column answer SqlType(varchar), Length(100,true) */
    val answer: Rep[String] = column[String]("answer", O.Length(100,varying=true))
    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
  }
  /** Collection-like TableQuery object for table Answers */
  lazy val Answers = new TableQuery(tag => new Answers(tag))

  /** Entity class storing rows of table Questions
   *  @param question Database column question SqlType(varchar), Length(1024,true)
   *  @param correctAnswerId Database column correct_answer_id SqlType(int8)
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey */
  case class QuestionsRow(question: String, correctAnswerId: Long, id: Option[Int] = None)
  /** GetResult implicit for fetching QuestionsRow objects using plain SQL queries */
  implicit def GetResultQuestionsRow(implicit e0: GR[String], e1: GR[Long], e2: GR[Option[Int]]): GR[QuestionsRow] = GR{
    prs => import prs._
    val r = (<<?[Int], <<[String], <<[Long])
    import r._
    QuestionsRow.tupled((_2, _3, _1)) // putting AutoInc last
  }
  /** Table description of table questions. Objects of this class serve as prototypes for rows in queries. */
  class Questions(_tableTag: Tag) extends Table[QuestionsRow](_tableTag, "questions") {
    def * = (question, correctAnswerId, Rep.Some(id)) <> (QuestionsRow.tupled, QuestionsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(question), Rep.Some(correctAnswerId), Rep.Some(id)).shaped.<>({r=>import r._; _1.map(_=> QuestionsRow.tupled((_1.get, _2.get, _3)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column question SqlType(varchar), Length(1024,true) */
    val question: Rep[String] = column[String]("question", O.Length(1024,varying=true))
    /** Database column correct_answer_id SqlType(int8) */
    val correctAnswerId: Rep[Long] = column[Long]("correct_answer_id")
    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
  }
  /** Collection-like TableQuery object for table Questions */
  lazy val Questions = new TableQuery(tag => new Questions(tag))
}

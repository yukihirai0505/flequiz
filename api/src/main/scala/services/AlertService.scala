package services

import models.db.{ExamTakeUserTable, ExamsEntityTable, UserEntityTable}
import utils.DatabaseService

import scala.concurrent.{ExecutionContext, Future}
import scala.language.postfixOps

class AlertService(val databaseService: DatabaseService)(implicit executionContext: ExecutionContext)
  extends ExamsEntityTable with UserEntityTable with ExamTakeUserTable {

  import databaseService._
  import databaseService.driver.api._

  def sendAlertMail: Future[Seq[Boolean]] = {
    val tesAction = for {
      totalExamCount <- exams.map(_.id).length.result
      allUsers <- users.result
      takeUsers <- examTakeUser.result
    } yield {
      (totalExamCount, (allUsers, takeUsers))
    }
    db.run(tesAction).flatMap { r =>
      val totalExamCount = r._1
      val allUsers = r._2._1
      val allTakeUsers = r._2._2
      Future successful allUsers.map { user =>
        val takeUsers = allTakeUsers.filter(_.userId == user.id.get)
        val takeCounts = takeUsers.length
        // 未受験のテストや100点をとれていないテストがあればメール送信対象
        val diffCount = totalExamCount - takeCounts
        val scores = takeUsers.filter(_.score != 100)
        val message = (diffCount, scores) match {
          case (x, _) if x > 0 => Some(s"${diffCount}")
          case (_, y) if y.nonEmpty => Some(s"${y.length}")
          case _ => None
        }
        message match {
          case Some(value) =>
            import utils.Mail._
            // TODO
            send a Mail(
              from = ("from mail address", "Flequiz"),
              to = user.email,
              cc = "cc mail address",
              subject = value,
              message = "message"
            )
            true
          case None => false
        }
      }
    }
  }
}
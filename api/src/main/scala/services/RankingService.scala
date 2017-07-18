package services

import models._
import models.db.{ExamTakeUserTable, ExamsEntityTable, UserEntityTable}
import utils.DatabaseService

import scala.concurrent.{ExecutionContext, Future}
import scala.language.postfixOps

class RankingService(val databaseService: DatabaseService)(implicit executionContext: ExecutionContext)
  extends ExamsEntityTable with UserEntityTable with ExamTakeUserTable {

  import databaseService._
  import databaseService.driver.api._

  def getRanking: Future[Seq[RankingEntity]] = {
    val tesAction = for {
      totalExamCount <- exams.map(_.id).length.result
      allUsers <- users.result
      takeUsers <- examTakeUser.result
    } yield {
      (totalExamCount*totalExamCount*100, (allUsers, takeUsers))
    }
    db.run(tesAction).flatMap { r =>
      val maxScore = r._1
      val allUsers = r._2._1
      val allTakeUsers = r._2._2
      Future successful allUsers.map{ user =>
        val scores = allTakeUsers.filter(_.userId == user.id.get).map { takeUser =>
          (takeUser.score, takeUser.takeSeconds)
        }
        val totalScore = math.ceil((scores.length * scores.map(_._1).sum - scores.map(_._2).sum).toDouble/maxScore* 100).toInt
        RankingEntity(username = user.username, profilePicUrl = user.profilePicUrl, score = totalScore)
      }
    }
  }
}
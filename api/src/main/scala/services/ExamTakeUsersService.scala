package services

import models._
import models.db.ExamTakeUserTable
import utils.DatabaseService

import scala.concurrent.{ExecutionContext, Future}
import scala.language.postfixOps

class ExamTakeUsersService(val databaseService: DatabaseService)(implicit executionContext: ExecutionContext)
  extends ExamTakeUserTable {

  import databaseService._
  import databaseService.driver.api._

  def getByExamTakeUserId(id: Long): Future[Option[ExamTakeUserEntity]] = {
    db.run(examTakeUser.filter(_.id === id).result.headOption)
  }

  def getByUserId(userId: Long): Future[Seq[ExamTakeUserEntity]] = {
    db.run(examTakeUser.filter(_.userId === userId).result)
  }

  def createExamTakeUser(entity: ExamTakeUserEntity): Future[ExamTakeUserEntity] = {
    val action = for {
      etu <- examTakeUser.filter(_.examId === entity.examId).filter(_.userId === entity.userId).result
      newEtu <- etu.headOption match {
        case Some(e) =>
          val updateEtu = entity.copy(id = e.id)
          examTakeUser.filter(_.id === e.id).update(updateEtu).map(_ => updateEtu)
        case None => examTakeUser returning examTakeUser.map(_.id) into ((examTakeUser, id) => examTakeUser.copy(id = Some(id))) += entity
      }
    } yield newEtu
    db.run(action)
  }

}
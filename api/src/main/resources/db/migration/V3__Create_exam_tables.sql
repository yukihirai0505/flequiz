CREATE TABLE IF NOT EXISTS `flequiz`.`exam_categories` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL COMMENT 'カテゴリー名',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
COMMENT = '試験カテゴリー';

CREATE TABLE IF NOT EXISTS `flequiz`.`exams` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `exam_category_id` BIGINT(20) NOT NULL COMMENT '試験カテゴリーID',
  `name` VARCHAR(100) NOT NULL COMMENT '試験名',
  `limit_time` INT(11) NOT NULL COMMENT '制限時間',
  `update_username` VARCHAR(500) NOT NULL COMMENT '更新ユーザー名',
  `update_date` VARCHAR(45) NOT NULL COMMENT '更新日',
  PRIMARY KEY (`id`),
  INDEX `fk_exam_exam_category_idx` (`exam_category_id` ASC),
  CONSTRAINT `fk_exam_exam_category`
    FOREIGN KEY (`exam_category_id`)
    REFERENCES `flequiz`.`exam_categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '試験';

CREATE TABLE IF NOT EXISTS `flequiz`.`exam_questions` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `exam_id` BIGINT(20) NOT NULL COMMENT '試験ID',
  `content` TEXT NOT NULL COMMENT 'テスト内容',
  PRIMARY KEY (`id`),
  INDEX `fk_exam_questions_exams1_idx` (`exam_id` ASC),
  CONSTRAINT `fk_exam_questions_exams1`
    FOREIGN KEY (`exam_id`)
    REFERENCES `flequiz`.`exams` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `flequiz`.`exam_question_answers` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `exam_question_id` BIGINT(20) NOT NULL COMMENT '問題ID',
  `content` VARCHAR(500) NOT NULL COMMENT '設問',
  `is_correct_answer` BIT(1) NOT NULL COMMENT '正解フラグ',
  PRIMARY KEY (`id`),
  INDEX `fk_exam_question_answers_exam_questions1_idx` (`exam_question_id` ASC),
  CONSTRAINT `fk_exam_question_answers_exam_questions1`
    FOREIGN KEY (`exam_question_id`)
    REFERENCES `flequiz`.`exam_questions` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `flequiz`.`exam_take_users` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `exam_id` BIGINT(20) NOT NULL COMMENT '試験ID',
  `user_id` BIGINT(20) NOT NULL COMMENT 'ユーザーID',
  `score` INT(11) NOT NULL COMMENT 'スコア',
  `take_seconds` INT(11) NOT NULL COMMENT 'かかった時間',
  PRIMARY KEY (`id`),
  INDEX `fk_exam_take_users_users1_idx` (`user_id` ASC),
  CONSTRAINT `fk_exam_take_users_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `flequiz`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
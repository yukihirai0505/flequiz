CREATE TABLE IF NOT EXISTS `flequiz`.`users` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `ga_user_id` VARCHAR(100) NOT NULL COMMENT 'GoogleアカウントID',
  `username` VARCHAR(500) NOT NULL COMMENT 'ユーザー名',
  `email` VARCHAR(500) NOT NULL COMMENT 'メールアドレス',
  `profile_pic_url` VARCHAR(500) NULL COMMENT 'プロフィール写真用URL',
  `is_admin` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '管理者フラグ',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
COMMENT = 'ユーザー';
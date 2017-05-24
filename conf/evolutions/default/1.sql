# --- !Ups

CREATE TABLE "questions" (
  id                SERIAL
    PRIMARY KEY,
  question          VARCHAR(1024) NOT NULL,
  correct_answer_id BIGINT        NOT NULL

);

CREATE TABLE "answers"
(
  id       SERIAL       NOT NULL
    PRIMARY KEY,
  category INTEGER      NOT NULL,
  answer   VARCHAR(100) NOT NULL
);


CREATE TABLE "answer_categories"
(
  id       SERIAL       NOT NULL
    PRIMARY KEY,
  category VARCHAR(100) NOT NULL
);


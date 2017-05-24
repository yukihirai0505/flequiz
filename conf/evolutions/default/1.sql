# --- !Ups

CREATE TABLE "questions" (
  id        SERIAL
    PRIMARY KEY,
  question  VARCHAR(1024) NOT NULL,
  answer_id BIGINT        NOT NULL

);

CREATE TABLE "answers"
(
  id                 SERIAL       NOT NULL
    PRIMARY KEY,
  answer_category_id INTEGER      NOT NULL,
  answer             VARCHAR(100) NOT NULL
);


CREATE TABLE "answer_categories"
(
  id       SERIAL       NOT NULL
    PRIMARY KEY,
  category VARCHAR(100) NOT NULL
);


TRUNCATE TABLE answer_categories;
INSERT INTO "answer_categories" ("id", "category") VALUES
  (1, 'デジタルマーケティング一般用語'),
  (2, 'Webマーケティング効果指標'),
  (3, 'アドテクに関係する用語'),
  (4, 'リスティング広告に関係する用語'),
  (5, 'アクセス解析に関係する用語');

TRUNCATE TABLE "answers";
INSERT INTO "answers" ("answer_category_id", "answer") VALUES
  (1, 'インフィード広告');

TRUNCATE TABLE "questions";
INSERT INTO "questions" ("question", "answer_id") VALUES
  ('Webサイトやアプリ（画面の上から下に読み進めていくデザイン）のコンテンツとコンテンツの間に表示される体裁の広告のことで、FacebookやTwitterなどのSNSや、キュレーションメディア、ニュースアプリなどでよく利用されています。最近では、テキストやバナーだけでなく、動画などのコンテンツも配信できるメディアも珍しくありません。', 1);



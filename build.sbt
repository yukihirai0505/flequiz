name := """flequiz"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.7"

libraryDependencies ++= {
  val slickJodaMapperV = "2.2.0"
  val jodaTimeV = "2.9.3"
  val jodaConvertV = "1.8.1"
  Seq(
    //jdbc,
    cache,
    ws,
    // DB
    "com.typesafe.play" %% "play-slick" % "2.0.0",
    "com.typesafe.play" %% "play-slick-evolutions" % "2.0.0",
    "org.postgresql" % "postgresql" % "9.4-1201-jdbc41",
    "com.github.tototoshi" % "slick-joda-mapper_2.11" % slickJodaMapperV,
    "joda-time" % "joda-time" % jodaTimeV,
    "org.joda" % "joda-convert" % jodaConvertV,
    "org.scalatestplus.play" %% "scalatestplus-play" % "1.5.1" % Test
  )
}

includeFilter in (Assets, LessKeys.less) := "*.less"
LessKeys.compress := true
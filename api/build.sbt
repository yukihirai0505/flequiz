name := "api"
version := "1.0.0"
scalaVersion := "2.12.1"

assemblyOutputPath in assembly := file("./api-standalone.jar")

libraryDependencies ++= {
  val akkaV = "10.0.7"
  val scalaTestV = "3.0.1"
  val slickVersion = "3.2.0-M2"
  val circeV = "0.6.1"
  Seq(

    "commons-codec" % "commons-codec" % "1.10",

    "com.typesafe.akka" %% "akka-http-core" % akkaV,
    "com.typesafe.akka" %% "akka-http" % akkaV,
    "de.heikoseeberger" %% "akka-http-circe" % "1.11.0",

    "com.typesafe.slick" %% "slick" % slickVersion,
    "mysql" % "mysql-connector-java" % "5.1.42",
    "org.flywaydb" % "flyway-core" % "3.2.1",

    "com.zaxxer" % "HikariCP" % "2.4.5",
    "org.slf4j" % "slf4j-nop" % "1.6.4",

    "io.circe" %% "circe-core" % circeV,
    "io.circe" %% "circe-generic" % circeV,
    "io.circe" %% "circe-parser" % circeV,

    "org.apache.commons" % "commons-email" % "1.2",

    "org.scalatest" %% "scalatest" % scalaTestV % "test",
    "com.typesafe.akka" %% "akka-http-testkit" % akkaV % "test"
  )
}

Revolver.settings
enablePlugins(JavaAppPackaging)
package models

case class UserEntity(gaUserId: String, username: String, email: String, profilePicUrl: Option[String] = None, isAdmin: Boolean = false, id: Option[Long] = None) {
  require(!username.isEmpty, "username.empty")
  require(!email.isEmpty, "password.empty")
}

case class UserEntityUpdate(isAdmin: Option[Boolean] = None) {
  def merge(user: UserEntity): UserEntity = {
    UserEntity(
      gaUserId = user.gaUserId,
      username = user.username,
      email = user.email,
      profilePicUrl = user.profilePicUrl,
      isAdmin = isAdmin.getOrElse(user.isAdmin),
      id = user.id
    )
  }
}
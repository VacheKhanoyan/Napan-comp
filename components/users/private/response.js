class UserResponse {
  static generateResponse(data, user) {
    if (!user) {
      return UserResponse.generateRegularResponse(data);
    }
    // TODO:
    // if (user.role === )
  }

  static generateAdminResponse(data) {

  }

  // TODO: what if data is array?
  static generateRegularResponse(data) {
    return {
      id: data._id,
      username: data.username
    };
  }

  static generatePOVResponse(data, user) { // TODO: Point Of View
    return {
      id: data._id,
      is_follow: data.followers.includes(user.id)
    }
  }

  static generateMeResponse(data) {

  }
}

module.exports = UserResponse;

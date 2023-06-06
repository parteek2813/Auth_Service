const { User } = require("../models/index");
const user = require("../models/user");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong at the repository layer");
      throw error;
    }
  }

  async destroy(userId) {
    try {
      await user.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.log("Something went wrong at the repository layer");
      throw error;
    }
  }
}

module.exports = UserRepository;

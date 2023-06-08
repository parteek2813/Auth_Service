const { User, Role } = require("../models/index");
const user = require("../models/user");
const ClientError = require("../utils/client-error");
const ValidationError = require("../utils/validation-error");
const { StatusCodes } = require("http-status-codes");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError(error);
      }
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

  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
      return user;
    } catch (error) {
      console.log("Something went wrong at the repository layer");
      throw error;
    }
  }

  async GetByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });

      //This client error will be then caught in the service
      if (!user) {
        throw new ClientError(
          "AttributesNotFound",
          "Invalid Email Sent in the request",
          "Please check the email, as there is not record of the email",
          StatusCodes.NOT_FOUND
        );
      }

      return user;
    } catch (error) {
      console.log(error);
      console.log("Something went wrong in the repo layer");
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });
      return user.hasRole(adminRole);
    } catch (error) {
      console.log("Something went wrong in the repo layer");
      throw error;
    }
  }
}

module.exports = UserRepository;

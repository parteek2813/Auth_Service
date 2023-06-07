const jwt = require("jsonwebtoken");
const UserRepository = require("../repository/user-repository");
const JWT_KEY = "auth";
const bcrypt = require("bcrypt");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong at the service layers");
      throw error;
    }
  }

  async signIn(email, plainPassword) {
    try {
      //step-1 --> Fetch the user using the email
      const user = await this.userRepository.GetByEmail(email);

      //step-2 --> Comapre incoming plain password with stored encyrpted
      const passwordMatch = this.checkPasswords(plainPassword, user.password);
      if (!passwordMatch) {
        console.log("Password does not match");
        throw { error: "Incorrect Password" };
      }

      //Inside the createtoken(), we should pass plain js object instead of sequelize object

      // Step-3 --> If passwords match, then create a token and send it to the user
      const newJWT = this.createToken({
        email: user.email,
        id: user.id,
      });
      return newJWT;
    } catch (error) {
      console.log("Something went wrong in the SignIn process");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid Token" };
      }

      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "No user with the corresponding token exists" };
      }

      //returning as we can save this user.id in the req object
      return user.id;
    } catch (error) {
      console.log("Something went wrong in the auth process");
      throw error;
    }
  }

  createToken(user) {
    console.log(user);
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "7d" });
      return result;
    } catch (error) {
      console.log("Something went wrong in the token creation");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong in the token verification", error);
      throw error;
    }
  }

  checkPasswords(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in the pass comaparison", error);
      throw error;
    }
  }
}
module.exports = UserService;

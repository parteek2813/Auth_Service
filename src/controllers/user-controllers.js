const { response } = require("express");
const UserService = require("../services/user-services");

const userService = new UserService();

const create = async (req, res) => {
  console.log(req.body);
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      success: true,
      message: "Successfully created a new user",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};

module.exports = {
  create,
};

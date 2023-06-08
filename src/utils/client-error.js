const AppError = require("./error-handler");

const { StatusCodes } = require("http-status-codes");

class ClientError extends AppError {
  constructor(name, message, explanation, StatusCodes) {
    //this explanation will be fetching from the sequelize error object

    super(name, message, explanation, StatusCodes);
  }
}

module.exports = ClientError;

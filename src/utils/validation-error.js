const AppError = require("./error-handler");

const { StatusCodes } = require("http-status-codes");

class ValidationError extends AppError {
  constructor(error) {
    //this explanation will be fetching from the sequelize error object

    let errorName = error.name;
    let explanation = [];
    error.errors.forEach((err) => {
      //here pulling from array and pushing into explanataion as array
      explanation.push(err.message);
    });

    super(
      errorName,
      "Not able to validate the data sent in the request",
      explanation,
      StatusCodes.BAD_REQUEST
    );
  }
}

module.exports = ValidationError;

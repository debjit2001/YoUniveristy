//validation method
exports.validateRequest = (title, description) => {
  if (!title || !description) {
    return {
      status: 400,
      error: {
        message: "Invalid Request",
        error: "Missing Field(s)",
      },
    };
  } else {
    if (!title.length || !description.length) {
      return {
        status: 400,
        error: {
          message: "Invalid Request",
          error: "Empty value,Please provide valid input",
        },
      };
    } else if (title.length > 50) {
      return {
        status: 400,
        error: {
          message: "Out of length",
          error: "Too long title field value",
        },
      };
    } else if (description.length < 10) {
      return {
        status: 400,
        error: {
          message: "Description too short ",
          error: "Description length should be between 20 to 1000 characters",
        },
      };
    } else if (description.length > 1000) {
      return {
        status: 400,
        error: {
          message: "Description too long",
          error: "Description length should be between 20 to 1000 characters",
        },
      };
    } else {
      return null;
    }
  }
};

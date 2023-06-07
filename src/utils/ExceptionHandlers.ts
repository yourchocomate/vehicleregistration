import {
  ADMIN_REMOVE,
  ALREADY_APPROVED,
  ALREADY_REGISTERED,
  NOT_APPROVED_YET,
  NOT_REGISTERED_YET,
  NO_PLATENUMBER_YET,
  OWNER_REMOVE,
} from "../config/errors";

function checkInString(message: string, errors: string[]) {
  let errorMessage = null;
  errors.forEach((error) => {
    if (message.includes(error)) {
      return (errorMessage = error);
    }
  });

  return errorMessage;
}

export const getContractErrorMessage = (error: any) => {
  const check = checkInString(error.message, [
    ALREADY_REGISTERED,
    ALREADY_APPROVED,
    NOT_APPROVED_YET,
    NOT_REGISTERED_YET,
    NO_PLATENUMBER_YET,
  ]);
  if (check) {
    switch (check) {
      case OWNER_REMOVE:
        return "You can't remove the owner";
      case ADMIN_REMOVE:
        return "You can't remove the admin";
      case ALREADY_REGISTERED:
        return "Vehicle already registered";
      case NOT_REGISTERED_YET:
        return "Vehicle not registered yet";
      case ALREADY_APPROVED:
        return "Vehicle already approved";
      case NOT_APPROVED_YET:
        return "Vehicle not approved yet";
      case NO_PLATENUMBER_YET:
        return "Vehicle has no plate number yet";
      default:
        return "Something went wrong";
    }
  } else {
    const message = error?.message?.split("Details:")[1]?.split("Version:")[0];
    return message && message.length > 0 ? message : "Something went wrong";
  }
};

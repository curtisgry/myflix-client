// Variable isReq should be a reassignable boolean value

export const checkNotEmptySetError = ({
  objectData,
  keyName,
  message,
  isReq,
  setStateFunc,
}) => {
  // Check for key in objectData
  if (!objectData[keyName]) {
    // If empty set related error message in state
    setStateFunc((prevErrors) => ({
      ...prevErrors,
      [`${keyName}Err`]: message,
    }));
    return false;
  }
  // Reset error when requirements are met
  setStateFunc((prevErrors) => ({
    ...prevErrors,
    [`${keyName}Err`]: '',
  }));

  // Checks if any validation before has already been false
  if (!isReq) return false;
  // Return true when pass validation
  return true;
};

export const checkValidEmail = ({ value, isReq, setStateFunc }) => {
  const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  const isValid = regex.test(value);
  if (!isValid) {
    setStateFunc((prevErrors) => ({
      ...prevErrors,
      EmailErr: 'Not a valid email',
    }));
  }
  // Check for previous validation faliure
  if (!isReq) return false;
  return isValid;
};

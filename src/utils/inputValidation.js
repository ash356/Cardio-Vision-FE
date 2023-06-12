// Validate First Name
export const validateFirstName = (firstName) => {
  const regex = /^[a-zA-Z0-9]{2,}$/;
  return regex.test(firstName);
};

// Validate Last Name
export const validateLastName = (lastName) => {
  const regex = /^[a-zA-Z0-9]{2,}$/;
  return regex.test(lastName);
};
// Validate Email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|edu)$/;
  return emailRegex.test(email);
};
// Validate Password
export const validatePassword = (password) => {
  const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[a-zA-Z]).{8,}$/;
  return passRegex.test(password);
};

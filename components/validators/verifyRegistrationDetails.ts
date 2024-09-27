type ValidationResult = {
  success: boolean;
  message?: string;
};

export const validateForm = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
): ValidationResult => {
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return { success: false, message: "All fields are required" };
  }

  const nameRegex = /^[A-Za-z]+$/;

  if (!nameRegex.test(firstName)) {
    return {
      success: false,
      message: "First name should contain only letters and spaces",
    };
  }

  if (!nameRegex.test(lastName)) {
    return { success: false, message: "Last name should contain only letters and spaces" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "Invalid email address" };
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)(?=.{6,})/; // Updated regex
  if (!passwordRegex.test(password)) {
    return {
      success: false,
      message: "Password requirements are not met",
    };
  }

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match" };
  }

  return { success: true };
};

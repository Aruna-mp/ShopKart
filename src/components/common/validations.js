export const validateEmail = email => {
    // Regular expression for a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
     return true;
    } else {
      return false;
    }
  };
  export const validatePhoneNumber = phoneNumber => {
    // Regular expression for a generic 10-digit mobile number
    const phoneRegex = /^[0-9]{10}$/;

    if (phoneRegex.test(phoneNumber)) {
     return true;
    } else {
      return false;
    }
  };

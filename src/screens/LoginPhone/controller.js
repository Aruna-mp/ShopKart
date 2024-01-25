export const validatePhone=phone=>{
    if(/[a-zA-Z]/.test(phone)){
        return false;
    }
    else{
        if(/[^\d\-\+]/.test(phone)){
            return false;
        }else{
            return true;
        }
       
    }
}
// export const validatePhone=phone=>{
//     return!/[a-zA-Z]/.test(phone)&& !/[^\d\-+]/.test(phone);
// }
export const validateOTP = otp => {
    // Check if the OTP is a numeric value
    if (!/^\d+$/.test(otp)) {
        return false;
    }

    // Check if the OTP has a specific length (e.g., 6 digits)
    if (otp.length !== 6) {
        return false;
    }

    // If both conditions pass, return true
    return true;
}
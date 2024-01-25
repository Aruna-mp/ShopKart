export const validatePhone=phone=>{
        return!/[a-zA-Z]/.test(phone)&& !/[^\d\-+]/.test(phone);
    }
    export const validateEmail=email=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        // Test the email against the regular expression
        return emailRegex.test(email);
    }
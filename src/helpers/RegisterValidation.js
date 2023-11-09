export function validation(name, email, password){
    //alert("")
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(name === ""){
        throw new Error("Name should not be empty")
    }

    if(email === ""){
        throw new Error("Email should not be empty")
    }
    if(! email_pattern.test(email)){
        throw new Error("Email Didn't match")
    }

    if(password === ""){
        throw new Error("Password should not be empty")
    }
    if(!password_pattern.test(password)){
        throw new Error("Password did't match")
    }

}

module.exports = validation;
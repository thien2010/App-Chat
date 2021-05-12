const EmailValidate = (s) => {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(s)
}
export default EmailValidate
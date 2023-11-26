const validation = require("../helpers/RegisterValidation");

test("RegistrationError", () => {
    expect(() => validation("test", "test", "testtest")).toThrowError("Email Didn't match");
});

test("RegistrationError_2", () => {
    expect(() => validation("test", "test@test.com", "")).toThrowError("Password should not be empty");
});

test("RegistrationError_3", () => {
    expect(() => validation("", "test@test.com", "testtest")).toThrowError("Name should not be empty");
});

test("RegistrationError_4", () => {
    expect(() => validation("test", "", "testtest")).toThrowError("Email should not be empty");
});

test("RegistrationError_5", () => {
    expect(() => validation("test", "test@test.com", "test")).toThrowError("Password did't match");
});
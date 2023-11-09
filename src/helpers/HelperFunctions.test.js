const {neatlyFormatValue, isNullOrEmpty} = require("./HelperFunctions");

test("helperMethods_1", () => {
    expect(neatlyFormatValue("1000")).toBe("1,000");
});

test("helperMethods_2", () => {
    expect(neatlyFormatValue("8000000")).toBe("8,000,000");
});

test("helperMethods_3", () => {
    expect(neatlyFormatValue("800")).toBe("800");
});

test("isNullOrEmpty_1", () => {
    expect(isNullOrEmpty("")).toBe(true);
});

test("isNullOrEmpty_2", () => {
    expect(isNullOrEmpty("test")).toBe(false);
});
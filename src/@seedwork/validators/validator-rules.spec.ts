import ValidationError from "../errors/validation-error";
import ValidatorRules from "./validator-rules";

type Values = {
  value: any,
  property: string,
}

type ExpectedRule = {
  value: any,
  property: string,
  rule: keyof ValidatorRules,
  error: ValidationError,
  params?: any[]
}

function assertIsInvalid({ value, property, rule, error, params = [] }: ExpectedRule) {
  expect(() => {
    const validator = ValidatorRules.values(value, property);
    const method = validator[rule];
    method.apply(validator, params);
  }).toThrow(error);
}

function assertIsValid({ value, property, rule, error, params = [] }: ExpectedRule) {
  expect(() => {
    const validator = ValidatorRules.values(value, property);
    const method = validator[rule];
    method.apply(validator, params);
  }).not.toThrow(error);
}

describe("ValidationRules Unit Tests", () => {
  test("values method", () => {
    const validator = ValidatorRules.values("some value", "field");
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator['value']).toBe("some value");
    expect(validator['property']).toBe("field");
  });

  test("required validation rule", () => {
    //invalid cases
    let arrange: Values[] = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: "", property: "field" },
    ];

    const error = new ValidationError("The field is required");

    arrange.forEach(item => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "required",
        error,
      });
    });

    //valid cases
    arrange = [
      { value: "test", property: "field" },
      { value: 5, property: "field" },
      { value: 0, property: "field" },
      { value: false, property: "field" },
    ];

    arrange.forEach(item => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "required",
        error,
      });
    });
  });

  test("string validation rule", () => {
    //invalid cases
    let arrange: Values[] = [
      { value: 5, property: "field" },
      { value: {}, property: "field" },
      { value: false, property: "field" },
    ];

    const error = new ValidationError("The field must be a string");

      arrange.forEach(item => {
        assertIsInvalid({
          value: item.value,
          property: item.property,
          rule: "string",
          error,
        });
      });

    //valid cases
    arrange = [
      { value: "test", property: "field" },
    ];

    arrange.forEach(item => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "string",
        error,
      });
    });
  });

  test("maxLength validation rule", () => {
    //invalid cases
    let arrange: Values[] = [
      { value: "aaaaaa", property: "field" },
    ];

    const error = new ValidationError("The field must be less or equal than 5 characters");

      arrange.forEach(item => {
        assertIsInvalid({
          value: item.value,
          property: item.property,
          rule: "maxLength",
          error,
          params: [5]
        });
      });

    //valid cases
    arrange = [
      { value: "aaaaa", property: "field" },
    ];

    arrange.forEach(item => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "maxLength",
        error,
        params: [5],
      });
    });
  });
});

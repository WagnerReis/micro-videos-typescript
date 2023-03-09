import ValueObject from "../value-object";

class StubValueObject extends ValueObject { }

describe("ValueObject unit tests", () => {
  it("should set value", () => {
    let vo = new StubValueObject('string value');
    expect(vo.value).toBe('string value');

    vo = new StubValueObject({ prop1: "value1" });
    expect(vo.value).toStrictEqual({ prop1: "value1" });
  });

  it("should convert to a string", () => {
    const date = new Date();
    let arrange = [
      { receved: null, expected: "null" },
      { receved: undefined, expected: "undefined" },
      { receved: "", expected: "" },
      { receved: "fake test", expected: "fake test" },
      { receved: 0, expected: "0" },
      { receved: 1, expected: "1" },
      { receved: 5, expected: "5" },
      { receved: true, expected: "true" },
      { receved: false, expected: "false" },
      { receved: date, expected: date.toString() },
      { receved: { prop1: "value1" }, expected: JSON.stringify({ prop1: "value1" }) },
    ];

    arrange.forEach(value => {
      const vo = new StubValueObject(value.receved);
      expect(vo + "").toBe(value.expected);
    });
  });
});
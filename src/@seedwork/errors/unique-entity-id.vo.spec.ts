import UniqueEntityId from "../domain/unique-entity-id.vo";

describe("UniqueEntityId Unit Test", () => {
  it("should throw error when uuid is invalid", () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    expect(() => {
      new UniqueEntityId("fake id");
    }).toThrow("ID must be a valid UUID");
    expect(validateSpy).toHaveBeenCalled();
  });
});

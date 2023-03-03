import Category from "./category";

describe("Category Unit tests", () => {
  test("contructor of category", () => {
    const category = new Category({name: "Movie"});

    expect(category.name).toBe("Movie");
  });
});

const request = require("supertest");
const todos = require("../src/data/todos-data");

const path = require("path");
const app = require(path.resolve(
  `${process.env.SOLUTION_PATH || ""}`,
  "src/app"
));

describe("App", () => {
  beforeEach(() => {
    todos.splice(0, todos.length);
  });

  it("returns error message for a route that is not defined", async () => {
    const response = await request(app)
      .get("/joel")
      .set("Accept", "application/json");

    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(response.text).toContain("Not found: /joel");
  });

  describe("path /todos/:todoId", async () => {
    it("returns error message for non-existent todo", async () => {
       const response = await request(app)
      .get("/todos/42")
      .set("Accept", "application/json");

    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(response.text).toContain("Todo id not found: 42");
      // Write your solution here
     // expect(1).toEqual(2);
    });
  });

  describe("path /todos", () => {
    describe("GET method", () => {
      it("returns an array of todos", async () => {
        const expected = [
          {
            id: 1,
            title: "Learn JavaScript",
            completed: true
          },
          {
            id: 2,
            title: "Learn Node.js",
            completed: false
          }
        ];

        todos.push(...expected);

        const response = await request(app).get("/todos");

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(expected);
      });
    });

describe("POST method", () => {
      it("creates a new todo and assigns an id", async () => {
        const newTodo = {
          title: "Joel is the greatest of men",
          completed: true,
        };
        const response = await request(app)
          .post("/todos")
          .set("Accept", "application/json")
          .send({ data: newTodo });

        expect(response.status).toBe(201);
        expect(response.body.data).toEqual({
          id: 5,
          ...newTodo,
        });
      });

      it("returns 400 if title is missing", async () => {
        const response = await request(app)
          .post("/todos")
          .set("Accept", "application/json")
          .send({ data: { completed: false } });

        expect(response.status).toBe(400);
      });

      it("returns 400 if title is empty", async () => {
        const response = await request(app)
          .post("/todos")
          .set("Accept", "application/json")
          .send({ data: { title: "" } });

        expect(response.status).toBe(400);
      });
    });

  });
});

describe("path /todos/:todoId", async () => {
    it("returns error message for non-existent todo", async () => {
       const response = await request(app)
      .get("/todos/42")
      .set("Accept", "application/json");

    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(response.text).toContain("Todo id not found: 42");
      // Write your solution here
     // expect(1).toEqual(2);
    });
  });

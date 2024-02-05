// TEST INTERRATION
// ----------------------------------------

const request = require("supertest");
const app = require("../src/app"); // Assuming your Express app is defined in app.js
const router = require("../src/router");

// describe("ROUTER TESTING", () => {}

describe("GET /", () => {
  test('responds 200"', async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    // expect(true).toBe(true);
    // expect(response.text).toBe("Hello, your app run on port 5000");
    // done(); // Call done() to notify Jest that the test is complete
  });
});

describe("GET /users", () => {
  test('responds 200"', async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
  });
});

describe("GET /users/:id", () => {
  test('responds 200"', async () => {
    const response = await request(app).get("/users/64");
    expect(response.status).toBe(200);
  });
  test("responds 404 - user n'existe pas", async () => {
    const response = await request(app).get("/users/6");
    expect(response.status).toBe(404);
  });
});

describe("CRUD Users API", () => {
  // Test d'intégration pour la création d'un utilisateur
  it("should create a new user", async () => {
    const newUser = {
      username: "John Doe",
      email: "john@example.com",
      password: "password123",
      birthday_date: "1990-01-01",
      city: "Paris",
      gender: 1,
      role_id: 1,
      valid: false,
    };

    // Utilisation de supertest pour envoyer une requête POST à votre API
    const response = await request(app).post("/users").send(newUser);

    console.log(response.body, "response");
    // Assurez-vous que la réponse a un code statut 201 (Created)
    expect(response.status).toBe(201);

    // Assurez-vous que la réponse contient les données de l'utilisateur créé
    // expect(response.body).toHaveProperty("id");
    // expect(response.username).toBe(newUser.username);
    // expect(response.email).toBe(newUser.email);
  });
});

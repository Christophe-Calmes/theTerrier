// const validatorUser = require("../src/validators/validatorUser");
// const { sizeFields } = require("../src/validators/validatorFields");
const { sizeFields } = require("../src/validator/validatorFields");

describe("Validator user", () => {
  // Test d'intégration pour la création d'un utilisateur
  it("test validator", () => {
    const newUser = {
      username: "Joh",
      email: "john@example.com",
      password: "password123",
      birthday_date: "1990-01-01",
      city: "Paris",
      gender: 1,
      role_id: 1,
      valid: false,
    };

    const { username } = newUser;

    // Utilisation de supertest pour envoyer une requête POST à votre API
    const result = sizeFields(username, 30, 4);

    console.log(result, "response");
    // Assurez-vous que la réponse a un code statut 201 (Created)
    expect(result).toBe(false);
  });
});

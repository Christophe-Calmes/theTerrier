context("Login User", () => {
  describe("", () => {
    it("Get login page", () => {
      // Visit the signin page
      cy.visit("http://localhost:5173/signin");
      cy.contains("SignIn");

      // Focus on the input field (if necessary)
      //   cy.get('input[name="name"]').focus();

      // Type into the input field
      cy.get('input[name="email"]').type("user@yahoo.com");
      cy.get('input[name="password"]').type("123456");

      // Submit the form
      cy.get("form").submit();

      cy.wait(1000); // Wait for 1 second
      cy.contains("Welcome to the Terrier");
    });
  });
});

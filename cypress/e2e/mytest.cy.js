// context('Assertions', () => {
//     beforeEach(() => {
//       cy.visit('https://example.cypress.io/commands/assertions')
//     })

//     describe('Implicit Assertions', () => {
//       it('.should() - make an assertion about the current subject', () => {
//         // https://on.cypress.io/should
//         cy.get('.assertion-table')
//           .find('tbody tr:last')
//           .should('have.class', 'success')
//           .find('td')
//           .first()
//           // checking the text of the <td> element in various ways
//           .should('have.text', 'Column content')
//           .should('contain', 'Column content')
//           .should('have.html', 'Column content')

context("Testing", () => {
  beforeEach(() => {
    console.log("préparation pour chaque test");
  });

  describe("Implicit Assertions", () => {
    it("Get home page", () => {
      cy.visit("http://localhost:5173/");
      cy.get("span").should("have.text", "Welcome to the Terrier");
      cy.get("[data-testid=register-btn]")
        .should("have.text", "Become a Member")
        .click();
      // .should("have.text", "Register");

      cy.wait(1000); // Wait for 1 second
      cy.contains("Register");
    });
  });
});

describe("Login form", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/login");
  });

  it("signin passes", () => {
    cy.get("[data='username']").type("admin");
    cy.get("[data='password']").type("mdp");
    cy.get("[data='signin']").click();
  });

  it("signup passes", () => {
    cy.get("[data='username']").type("admin");
    cy.get("[data='password']").type("mdp");
    cy.get("[data='signup']").click();
  });

  it("forgotten link passes", () => {
    cy.get("[data='forgotten']").click();
  });

  it("signin with Google passes", () => {
    cy.get("[data='signinGoogle']").click();
  });

  it("remember me passes", () => {
    cy.get("[data='username']").type("admin");
    cy.get("[data='password']").type("mdp");
    cy.get("[data='remember']").click();
    cy.get("[data='signin']").click();
  });
});

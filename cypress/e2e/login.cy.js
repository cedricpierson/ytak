describe('Login form', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/signin');
  });

  it('signin passes', () => {
    cy.get("[data='email']").type('admin');
    cy.get("[data='password']").type('mdp');
    cy.get("[data='signin']").click();
  });

  it('signup passes', () => {
    cy.get("[data='signup']").click();
    cy.request('/signup');
  });

  it('forgotten link passes', () => {
    cy.get("[data='forgotten']").click();
  });

  it('signin with Google passes', () => {
    cy.get("[data='signinGoogle']").click();
  });

  it('remember me passes', () => {
    cy.get("[data='email']").type('admin');
    cy.get("[data='password']").type('mdp');
    cy.get("[data='remember']").click();
    cy.get("[data='signin']").click();
  });
});

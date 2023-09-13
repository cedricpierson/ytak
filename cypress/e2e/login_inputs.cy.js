describe('Login form', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/signin');
  });

  it('empty email input', () => {
    cy.get("[data='email']").type(' ');
    cy.get("[data='password']").type('mdp');
    cy.get("[data='signin']").click();
    cy.get('.Mui-error').should('be.visible');
  });
  it('empty password input', () => {
    cy.get("[data='email']").type('admin');
    cy.get("[data='password']").type(' ');
    cy.get("[data='signin']").click();
    cy.get('.Mui-error').should('be.visible');
  });
  it('all inputs empty', () => {
    cy.get("[data='email']").type(' ');
    cy.get("[data='password']").type(' ');
    cy.get("[data='signin']").click();
    cy.get('.Mui-error').should('be.visible');
  });
  it('wrong email address format', () => {
    cy.get("[data='email']").type('admin');
    cy.get("[data='password']").type('mdp');
    cy.get("[data='signin']").click();
    cy.get('.Mui-error').should('be.visible');
  });
  it('good email format but not registered', () => {
    cy.get("[data='email']").type('admin@admin.fr');
    cy.get("[data='password']").type('mdp');
    cy.get("[data='signin']").click();
    cy.get('.Mui-error').should('be.visible');
  });
  it('right email address but wrong password', () => {
    cy.get("[data='email']").type('admin@admin.com');
    cy.get("[data='password']").type('mdp');
    cy.get("[data='signin']").click();
    cy.get('.Mui-error').should('be.visible');
  });
  it('completed signin', () => {
    cy.get("[data='email']").type('admin@admin.com');
    cy.get("[data='password']").type('admin');
    cy.get("[data='signin']").click();
    cy.request('/regarder');
  });
});

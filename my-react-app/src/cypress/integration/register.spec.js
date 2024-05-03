describe('Регистрация', () => {
    it('регистрирует нового пользователя', () => {
      cy.visit('http://localhost:5173/register');
      cy.get('input[name=username]').type('testuser');
      cy.get('input[name=password]').type('testpassword');
      cy.get('button[type=submit]').click();
      cy.url().should('include', '/login');
    });
  });
  
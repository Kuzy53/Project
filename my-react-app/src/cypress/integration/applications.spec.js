describe('Заявления', () => {
    it('создает новое заявление', () => {
      cy.visit('http://localhost:5173/applications/');
      cy.get('textarea[name=description]').type('Парковка на газоне');
      cy.get('input[name=carNumber]').type('A123BC');
      cy.get('button[type=submit]').click();
      cy.url().should('include', '/applications');
    });
  });
  
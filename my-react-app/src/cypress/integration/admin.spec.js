describe('Панель администратора', () => {
    it('подтверждает заявление', () => {
      cy.visit('http://localhost:5173/admin');
      cy.get('button').contains('Подтвердить').click();
      cy.get('p').should('contain', 'Подтверждено');
    });
  });
  
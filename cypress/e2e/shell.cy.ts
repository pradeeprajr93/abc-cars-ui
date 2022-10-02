describe('shell container check', () => {
    it('header text should be valid', () => {
        cy.visit("/");
        cy.get('h2').contains("Welcome to ABC Cars!");
    });
});
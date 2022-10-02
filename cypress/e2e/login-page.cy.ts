describe('login page check', () => {

    before(() => {
        cy.visit("/");
    });

    after(() => { });

    it('should navigate to login page on application load', () => {
        cy.url()
            .then(url => {
                expect(url).to.eq('http://localhost:4200/login');
            });
    });

    it('submit button should be disabled if any input field is empty', () => {
        cy.get('#submit-btn').should('be.disabled');
    });

    it('submit button should be enabled only if all fields are filled', () => {
        cy.get('#inputemail').clear().type('abc@testmail.com');
        cy.get('#inputpassword').clear().type('testpassword');
        cy.get('#submit-btn').should('be.enabled');
    });

    it('should take user to home page on clicking submit', () => {
        cy.get('#submit-btn').click();
        cy.url()
            .then(url => {
                expect(url).to.eq("http://localhost:4200/home")
            })
    });

});
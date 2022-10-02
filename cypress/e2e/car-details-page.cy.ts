describe('Car Details landing page check - no stub - no seed', () => {

    before(() => {
    });
    after(() => {
    });

    it('should hit the car details endpoint on app load', () => {
        cy.intercept(
            'GET',
            'http://localhost:3000/v1/car-details/'
        ).as('getCarDetails');
        cy.visit('/home');
        cy.wait('@getCarDetails');
    });

});

describe('Car Details landing page check - with stub', () => {

    before(() => {
    });
    after(() => {
    });

    it('should show appropriate message to user when empty response received', () => {
        cy.intercept(
            'GET',
            'http://localhost:3000/v1/car-details/',
            {results: []}
        ).as('getEmptyCarDetails');
        cy.visit('/home');
        cy.wait('@getEmptyCarDetails');
        cy.get('h3').contains("No cars found");
    });

    it('should populate from fixture', () => {
        cy.intercept(
            'GET',
            'http://localhost:3000/v1/car-details/',
            {fixture: 'car-details.json'}
        ).as('getStubbedCarDetails');
        cy.visit('/home');
        cy.wait('@getStubbedCarDetails');
        cy.get('.car-card')
            .then(el => {
                expect(el.length).to.eq(2);
            });
    });

});

describe('Car Details landing page check - with seed', () => {
    const randomProductId = `P${Math.floor(Math.random()*100000000)}`;
    before(() => {
        cy.request({
            method: "POST",
            url: 'http://localhost:3000/v1/car-details',
            body: {
                "name": "Random Car",
                "make": "Seed",
                "exShowRoomPrice": "Rs.14,50,000",
                "description": "Electric car. Made in India.",
                "productId": randomProductId,
                "imageLink": "https://imgd.aeplcdn.com/1280x720/n/cw/ec/42611/tata-nexon-ev-right-front-three-quarter6.jpeg"
            }
        });
    });

    after(() => {
        cy.request({
            url: `http://localhost:3000/v1/car-details/${randomProductId}`,
            method: "DELETE"
        });
    })

    it('should populate seeded car details from db', () => {
        cy.intercept(
            'GET',
            'http://localhost:3000/v1/car-details/'
        ).as('getSeededCarDetails');
        cy.visit('/home');
        cy.wait('@getSeededCarDetails');
        cy.get('.cars-container').contains('Random Car');
        cy.get('.cars-container').contains('Seed');
    });


});
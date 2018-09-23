// https://docs.cypress.io/api/introduction/api.html

describe('What\'s for lunch view', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'What\'s For Lunch')
    cy.get('.card').should('have.length', 0);

    cy.get('.lunch_recipes-button').click(); 
    cy.get(".card").should('not.be.empty');
  })
})

describe('My First Test', function() {
  it('Does not do much!', function() {
    expect(true).to.equal(true)
  })
})

describe('My First Test', function() {
  it('Does not do much!', function() {
    expect(true).to.equal(false)
  })
})

describe('My First Test', function() {
  it('Visits the Kitchen Sink', function() {
    cy.visit('http://localhost:3000')
    cy.contains('UniConfig').click()	  
    cy.url().should('include', '/devices')	  
    cy.contains('Mount Device').click()	  

    cy.get('#mountcliInput-node-id')
      .clear()
      .type('XR01')
      .should('have.value', 'XR01')
	  
    cy.get('#mountcliInput-host')
      .clear()
      .type('sample-topology')
      .should('have.value', 'sample-topology')

    cy.get('#mountcliInput-port')
      .clear()
      .type('10001')
      .should('have.value', '10001')

    cy.get('label[for="mountcliInput-transport-type"] ~ div[class="Dropdown-root"] > div[class="Dropdown-control"] > div[class="Dropdown-arrow-wrapper"] > span')
      .click()
    cy.get('div[class^="Dropdown-option"]').contains('ssh')
      .click()

    //second click to toggle back to ssh
    cy.get('label[for="mountcliInput-transport-type"] ~ div[class="Dropdown-root"] > div[class="Dropdown-control"] > div[class="Dropdown-arrow-wrapper"] > span')
      .click()
    cy.get('div[class^="Dropdown-option"]').contains('ssh')
      .click()


    cy.get('label[for="mountcliInput-transport-type"] ~ div[class="Dropdown-root"] > div[class="Dropdown-control"] > div[class="Dropdown-placeholder is-selected"]')
      .contains('ssh')

    cy.get('label[for="mountcliInput-device-type"] ~ div[class="Dropdown-root"] > div[class="Dropdown-control"] > div[class="Dropdown-arrow-wrapper"] > span')
      .click()
    cy.get('div[class^="Dropdown-option"]').contains('ios xr')
      .click()

    cy.get('label[for="mountcliInput-device-version"] ~ div[class="Dropdown-root"] > div[class="Dropdown-control"] > div[class="Dropdown-arrow-wrapper"] > span')
      .click()
    cy.get('div[class^="Dropdown-option"]').contains('6.*')
      .click()

    cy.get('#mountcliInput-username')
      .clear()
      .type('cisco')
      .should('have.value', 'cisco')

    cy.get('#mountcliInput-password')
      .clear()
      .type('cisco')
      .should('have.value', 'cisco')

    cy.get('button[class="btn btn-primary"]').contains('Mount Device')
      .then(($button) => {
	      $button.click()
      })

    cy.get('button[class="btn btn-primary"]').should('not.to.exist')
    //cy.get('button[class="btn btn-success"]').should('exist')
/*
    cy.get('button[class="btn btn-success"]').contains('Connected')
      .then(($button) => {
	      $button.should('exist')
      })
    
  */    
    cy.get('button[class="btn btn-secondary"]').contains('Close')
      .then(($button) => {
	      $button.click()
      })

    cy.contains('XR01').click()	  
    cy.get('button[class="btn btn-secondary"]').contains('Close')
      .then(($button) => {
	      $button.click()
      })
    cy.get('#chb-0').click()
    cy.contains('Unmount Devices').click()	  
  })
})


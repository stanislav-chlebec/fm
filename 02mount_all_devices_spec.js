describe('Mount all devices from inventory', function() { 
  beforeEach(function() {
    cy.login()

    cy.unmount_all_devices()
  })
	
  it('mounts all devices from inventory', function() { 
    cy.visit('/') 

    cy.contains('UniConfig').click()	  
    cy.get('table tbody tr').should('not.to.exist')

    cy.get('.navbar-brand').click()	  
    cy.contains('Workflows').click()	  

    cy.url().should('include', '/workflows/defs')	  
    cy.get ('input[placeholder="Search by keyword."').type('Mount_all_from_inventory')	  
    cy.contains('Mount_all_from_inventory').click()	  
    cy.contains('Input').click()	  
    cy.get('div.modal-content').contains('Execute').click()	  
    cy.get('div.modal-content').contains('Execute').should('not.to.exist')
    cy.get('div.modal-content').contains('OK')
    cy.wait(5000)
    cy.get('div.modal-footer a:first-child').click()

    cy.url().should('include', '/workflows/exec')	  
    cy.wait(5000)
    cy.contains('Children').click()
    cy.contains('Details of Mount_all_from_inventory')
    //cy.get('div.modal-content table tbody tr').should('have.length',2)
    //cy.get('#detailTabs-tabpane-taskDetails').get('tbody tr td:last').should('have.length',2)  ///.contains('COMPLETED',{timeout:300000})
    cy.get('div.headerInfo').contains('COMPLETED',{timeout:300000})
    //cy.get('#detailTabs-tabpane-taskDetails').get('tbody tr td:last').should('have.length',2)  ///.contains('COMPLETED',{timeout:300000})


    cy.contains('Input/Output').click()
    cy.wait(5000)
    cy.contains('Task Details').click()
    cy.wait(5000)
    cy.contains('JSON').click()
    cy.wait(5000)
    cy.contains('Task Details').click()
    cy.wait(5000)
    cy.contains('Edit & Rerun').click()
    cy.wait(5000)
    cy.contains('Task Details').click()
    cy.wait(5000)
    cy.contains('Execution Flow').click()
    cy.wait(5000)
    cy.contains('Task Details').click()
    cy.wait(5000)

    cy.contains('Close').click()
    cy.get('span.navbar-brand a').click()

    cy.contains('UniConfig').click()	  
    cy.get('table tbody tr').should('have.length',2)
  })
})

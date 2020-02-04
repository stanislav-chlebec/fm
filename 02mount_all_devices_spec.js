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

    cy.server({
      method: 'POST',
    })
    cy.route('/api/conductor/workflow').as('getWorkflowId')
    cy.get('div.modal-content').contains('Execute').click()
    cy.wait('@getWorkflowId')
    cy.get('div.modal-content').contains('Execute').should('not.to.exist')
    cy.get('div.modal-content').contains('OK')

    cy.server({
      method: 'GET',
    })
    cy.route('/api/conductor/id/*').as('getWorkflowDetail')
    cy.get('div.modal-footer a:first-child').click()
    cy.url().should('include', '/workflows/exec')	  

    cy.wait('@getWorkflowDetail', {timeout:10000})
    cy.contains('Details of Mount_all_from_inventory')
    cy.get('div.headerInfo').contains('COMPLETED',{timeout:30000})
    cy.contains('Children').click()


    cy.contains('Input/Output').click()
    cy.contains('Task Details').click()
    cy.contains('JSON').click()
    cy.contains('Task Details').click()
    cy.contains('Edit & Rerun').click()
    cy.contains('Task Details').click()
    cy.contains('Execution Flow').click()
    cy.contains('Task Details').click()

    cy.contains('Close').click()
    cy.get('span.navbar-brand a').click()

    cy.server()
    cy.route('/api/odl/oper/all/status/cli').as('getAllStatusCli')
    cy.route('/api/odl/oper/all/status//topology-netconf').as('getAllStatusNetconf')

    cy.contains('UniConfig').click()	  
	  
    //wait a second for finishing of loading of the list of connected devices
    //there is two xhr we will wait for and after then 3 times bunch of xhrs
    cy.wait(['@getAllStatusCli', '@getAllStatusNetconf']).then((xhrs) => {
      const cliDev = xhrs[0].responseBody.topology[0].node
      const netconfDev = xhrs[1].responseBody.topology[0].node
      cy.get('table tbody tr td:first-child', {timeout:5000}).should('have.length', cliDev.length + netconfDev.length)
    })
  })
})

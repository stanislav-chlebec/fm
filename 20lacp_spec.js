//https://docs.frinx.io/frinx-machine/use-cases/lacp/lacp.html
//This workflow is using uniconfig to create LAG interface on two nodes and assigns the bundle id to given interfaces on both nodes.
describe('LACP workflows', function() {
  beforeEach(function() {
    cy.login()
  })
	
  it('checks if ios-xr devices are mounted', function() {
    cy.visit('/')
    cy.contains('UniConfig').click()
    cy.url().should('include', '/devices')
    //cy.get('table tbody tr').first().find('td').eq(1).val().should('contain','XR02')
    cy.get('table tbody tr').first().should('contain','ios xr')
    cy.get('table tbody tr').eq(1).should('contain','ios xr') //the second row
  })

  it('creating a link aggregation between two nodes', function() {
    cy.get('.navbar-brand').click()	  
    cy.url().should('include', '/')
    cy.contains('Workflows').click()	  
    cy.url().should('include', '/workflows/defs')
    cy.contains('Definitions').click() //there are three tabs: Definitions Executed and Scheduled
    cy.get('input[placeholder="Search by keyword."').type('Link_aggregation')	  
    cy.contains('Link_aggregation').click()	  
    cy.contains('Input').click()	  

    cy.contains('node1').next().click() //label node1
    //cy.contains('node1').next().type('sss').clear() //label node1 // I tried to clear div element - not possible
    cy.contains('node1').next().type('{selectall}{backspace}')
    cy.contains('XR01').click()

    cy.contains('bundle_ether_id').next().as('bundle_ether_id') //label bundle_ether_id become alias of next input
    cy.get('@bundle_ether_id').type('{selectall}{backspace}')
    cy.get('@bundle_ether_id').type('3')

    cy.contains('bundle_ether_enabled').next().as('bundle_ether_enabled') //label bundle_ether_enabled become alias of next input
    cy.get('@bundle_ether_enabled').type('{selectall}{backspace}')
    cy.get('@bundle_ether_enabled').type('true')

    cy.contains('node2').next().as('node2') //label node2 become alias for next input
    cy.get('@node2').type('{selectall}{backspace}')
    cy.contains('XR02').click() //choose from autocomplete combo box by clicking

    cy.contains('node1_ifaces').next().as('node1_ifaces') //label node1_ifaces become alias of next input
    cy.get('@node1_ifaces').type('{selectall}{backspace}')
    cy.get('@node1_ifaces').type('GigabitEthernet0/0/0/0, GigabitEthernet0/0/0/1')

    cy.contains('node2_ifaces').next().as('node2_ifaces') //label node2_ifaces become alias of next input
    cy.get('@node2_ifaces').type('{selectall}{backspace}')
    cy.get('@node2_ifaces').type('GigabitEthernet0/0/0/1, GigabitEthernet0/0/0/2, GigabitEthernet0/0/0/3')

    cy.server({
      method: 'POST',
    })
    cy.route('/api/conductor/workflow').as('getWorkflowId')
    cy.get('div.modal-content').contains('Execute').click()
    cy.wait('@getWorkflowId')
    cy.get('div.modal-content').contains('Execute').should('not.to.exist')
    cy.get('div.modal-content').contains('OK')
    //click the ID of the previously executed workflow to see the progress of the workflow
    cy.get('div.modal-footer a:first-child').click() //click generated workflow id

    cy.url().should('include', '/workflows/exec')	  
    cy.contains('Details of Link_aggregation')

    //cy.contains('Task Details').click()
    //cy.contains('Input/Output').click()
    //The journal information can be found in the output of the workflow
    //cy.contains('Workflow Output').parent().contains('Unescape').click()
    //cy.scrollTo('bottom') // this does not work failed because this element is not scrollable <window>
    //search for interface Loopback700929
    //cy.contains('Workflow Output').parent().find('code').invoke('show').should('contain','interface Loopback700929') //problem element code is not visible
    //Workflow Output  parent() is h4 ... > button with text Escape 
    //cy.contains('Workflow Output').parent().contains('Escape').click()
    //cy.contains('JSON').click()
    //cy.contains('Edit & Rerun').click()

    cy.contains('Execution Flow').click()
    cy.contains('Close').scrollIntoView()
    cy.get('div.headerInfo').contains('COMPLETED')

    //cy.get('#detailTabs-tabpane-execFlow').scrollIntoView()
    //cy.contains('final').scrollIntoView()
    cy.get('div[role="dialog"]').scrollTo('center', { duration: 5000 })
    cy.get('div[role="dialog"]').scrollTo('bottom', { duration: 5000 })
    cy.get('#detailTabs-tabpane-execFlow > div').scrollTo('bottomRight', { duration: 5000 })
    cy.get('#detailTabs-tabpane-execFlow > div').scrollTo('bottomLeft', { duration: 5000 })
    //cy.get('#detailTabs-tabpane-execFlow > div').scrollTo('75%', '25%')
    //does not work cy.get('div.overflow.scroll').scrollTo('bottom', { duration: 5000 })

    cy.contains('Close').click()
  })
})

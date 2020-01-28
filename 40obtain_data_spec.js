//https://docs.frinx.io/frinx-machine/use-cases/obtain-platform-inventory-data/obtain-platform-inventory-data.html
//Obtain platform inventory data
//Collect platform information from the device and store in the inventory
describe('Collect platform information from the device and store in the inventory', function() {
  beforeEach(function() {
    cy.login()
  })
	

  it('go', function() {
    cy.visit('/')
    cy.contains('UniConfig').click()
    cy.url().should('include', '/devices')

    cy.get('.navbar-brand').click()	  
    cy.url().should('include', '/')
    cy.contains('Workflows').click()	  
    cy.url().should('include', '/workflows/defs')
    cy.contains('Definitions').click() //there are three tabs: Definitions Executed and Scheduled
    cy.get('input[placeholder="Search by keyword."').type('Read_components_all_from_unified_update_inventory')	  
    cy.contains('Read_components_all_from_unified_update_inventory').click()	  
    //cy.contains('Read_components_update_inventory').click()	  

    cy.contains('Input').click()	  

    cy.get('div.modal-content').contains('Execute').click()	  
    cy.get('div.modal-content').contains('Execute').should('not.to.exist')
    cy.get('div.modal-content').contains('OK')
    cy.wait(5000) //wait for propagating to server and back
    //click the ID of the previously executed workflow to see the progress of the workflow
    cy.get('div.modal-footer a:first-child').click() //click generated workflow id

    cy.url().should('include', '/workflows/exec')	  
    cy.contains('Details of Read_components_all_from_unified_update_inventory')

    cy.contains('Execution Flow').click()
    cy.contains('Close').scrollIntoView()
    cy.screenshot() 
    cy.wait(10000)
    cy.get('div.headerInfo').contains('COMPLETED')
    cy.screenshot() 
    cy.contains('Close').click()
  })

  it('goes to inventory', function() {
    //After the workflow has completed, go to Kibana and look for an entry called “lldp”. 
    cy.visit(':5601/')
    cy.wait(5000)
    cy.contains('Discover').click()	  
    //cy.get('div.ui-select-match > span > i.caret.pull-right').click({force:true})
    cy.get('i.caret.pull-right').click({force:true})
    cy.contains('inventory-device*').click({force:true})
    cy.wait(5000)
    cy.contains('Discover').click()	  
    //cy.get('button.kbnDocTableOpen__button').click({multiple:true})
    //cy.get('td[ng-click="toggleRow()"]').click({multiple:true})
    cy.get('td').click({force:true,multiple:true})
    //cy.get('div.row').scrollTo('bottom', { easing: 'linear',force:true })
    //cy.scrollTo('top', { easing: 'linear' })
    //cy.get('input[type="search"]').type('inventory-device*',{force:true})
    //cy.get('div.kbnGlobalNavLink__title').click()
    //cy.get('div.iframes-container').click()
    //  doc.find('div.kbnGlobalNav__links > div > app-switcher > div.kbnGlobalNavLink > a').click(() => {
    cy.get("dd span").contains('XR01').scrollIntoView()
  })

})

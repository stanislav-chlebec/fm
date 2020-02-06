//https://docs.frinx.io/frinx-machine/use-cases/obtain-platform-inventory-data/obtain-platform-inventory-data.html
//Obtain platform inventory data
//Collect platform information from the device and store in the inventory
describe('Collect platform information from the device and store in the inventory', function() {
  it('goes to inventory', function() {
    //After the workflow has completed, go to Kibana and look for an entry called “inventory-device”. 
    let inventory = Cypress.env('inventory')
    cy.visit(inventory)
    cy.url({timeout:5000}).should('include', '/app/')
    cy.contains('Discover',{timeout:10000}).click()
	  
    //cy.get('div.ui-select-match > span > i.caret.pull-right').click({force:true})
    cy.get('i.caret.pull-right').click({force:true})
    //cy.contains('inventory-device*').click({force:true})
    cy.contains('inventory-device').click({force:true})
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
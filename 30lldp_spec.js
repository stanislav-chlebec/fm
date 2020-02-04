//https://docs.frinx.io/frinx-machine/use-cases/lldp-topology/lldp-topology.html
//Obtain LLDP topology data
//Collect LLDP Information from Devices and Build Topology
describe('Collect LLDP Information from Devices and Build Topology', function() {
  context('avoid of executing beforeEach with kibana', () => {

  beforeEach(function() {
    cy.login()
  })
	

  it('collects LLDP Information from Devices', function() {
    //In the following step we will start a workflow that goes to each mounted device, collects LLDP information, reconciles that information and finally stores that information in the inventory.
    cy.visit('/')
    cy.contains('UniConfig').click()
    cy.url().should('include', '/devices')

    cy.get('.navbar-brand').click()	  
    cy.url().should('include', '/')
    cy.contains('Workflows').click()	  
    cy.url().should('include', '/workflows/defs')
    cy.contains('Definitions').click() //there are three tabs: Definitions Executed and Scheduled
    cy.get('input[placeholder="Search by keyword."').type('Build_read_store_LLDP_topology')	  
    cy.contains('Build_read_store_LLDP_topology').click()	  
    cy.contains('Input').click()	  

    /*
    //	  
    cy.contains('').next().as('') //label  become alias of next input
    cy.get('@').type('{selectall}{backspace}')
    cy.get('@').type('')
    */

    //	  
    cy.contains('node_aggregation').next().as('node_aggregation') //label node_aggregation become alias of next input
    cy.get('@node_aggregation').type('{selectall}{backspace}')
    cy.get('@node_aggregation').type('system-name')

    //	  
    cy.contains('link_aggregation').next().as('link_aggregation') //label link_aggregation become alias of next input
    cy.get('@link_aggregation').type('{selectall}{backspace}')
    cy.get('@link_aggregation').type('bidirectional-abbreviations')

    //	  
    cy.contains('per_node_read_timeout').next().as('per_node_read_timeout') //label per_node_read_timeout become alias of next input
    cy.get('@per_node_read_timeout').type('{selectall}{backspace}')
    cy.get('@per_node_read_timeout').type('30')

    //	  
    cy.contains('concurrent_read_nodes').next().as('concurrent_read_nodes') //label concurrent_read_nodes become alias of next input
    cy.get('@concurrent_read_nodes').type('{selectall}{backspace}')
    cy.get('@concurrent_read_nodes').type('8')

    //	  
    cy.contains('destination_topology').next().as('destination_topology') //label destination_topology become alias of next input
    cy.get('@destination_topology').type('{selectall}{backspace}')
    cy.get('@destination_topology').type('lldp')

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
    cy.contains('Details of Build_read_store_LLDP_topology')

    cy.wait(10000)
    cy.get('div.headerInfo').contains('COMPLETED')

    cy.contains('Close').click()
  })
  })

  context('executing kibana', () => {
  it.skip('goes to inventory (via iframe)', function() {
    //After the workflow has completed, go to Kibana and look for an entry called “lldp”. 
    cy.get('.navbar-brand').click()	  
    cy.url().should('include', '/')
    cy.contains('Inventory & Logs').click()	  
    cy.url().should('include', '/inventory')

    cy.wait(5000)
    //https://github.com/cypress-io/cypress/issues/136#issuecomment-328100955
    //cy.contains('Discover').click()	  
    //cy.get('div.kbnGlobalNavLink__title').click()
    //cy.get('div.iframes-container').click()
    cy.get('iframe').then(($iframe) => {
      const doc = $iframe.contents()
      //doc.contains('Discover').click(() => {
      doc.find('div.kbnGlobalNav__links > div > app-switcher > div.kbnGlobalNavLink > a').click(() => {
        console.log('clicked!!!!!!')
      })
      //cy.wrap(doc.contains('Discover')).click({force:true})
      //cy.wrap(doc.find('div.kbnGlobalNav__links > div > app-switcher > div.kbnGlobalNavLink > a')).click({force:true})
    })
  })

  it('goes to inventory', function() {
    //After the workflow has completed, go to Kibana and look for an entry called “lldp”. 
    let inventory = Cypress.env('inventory')
    cy.visit(inventory)
    cy.url({timeout:5000}).should('include', '/app/')
    //cy.wait(5000)
    cy.contains('Discover',{timeout:10000}).click()
    cy.get('div.ui-select-match > span > i.caret.pull-right').click({force:true})
    //cy.contains('*lldp').click({force:true})
    cy.contains('inventory-lldp').click({force:true})
    //cy.get('input[type="search"]').type('*lldp',{force:true})
    //cy.get('div.kbnGlobalNavLink__title').click()
    //cy.get('div.iframes-container').click()
    //  doc.find('div.kbnGlobalNav__links > div > app-switcher > div.kbnGlobalNavLink > a').click(() => {
    cy.wait(5000)
  })
  })

  context('avoid of executing beforeEach with kibana', () => {

  beforeEach(function() {
    cy.login()
  })
	
  var txt
  it('exports the IETF topology information in graphviz format', function() {
    //Exporting the IETF topology information in graphviz format
    cy.visit('/')
    cy.contains('Workflows').click()	  
    cy.url().should('include', '/workflows/defs')
    cy.contains('Definitions').click() //there are three tabs: Definitions Executed and Scheduled
    cy.get('input[placeholder="Search by keyword."').type('Export_LLDP_topology')	  
    cy.contains('Export_LLDP_topology').click()	  
    cy.contains('Input').click()	  

    cy.get('div.modal-content').contains('Execute').click()	  
    cy.get('div.modal-content').contains('Execute').should('not.to.exist')
    cy.get('div.modal-content').contains('OK')
    cy.wait(1000) //wait for propagating to server and back
    //click the ID of the previously executed workflow to see the progress of the workflow
    cy.get('div.modal-footer a:first-child').click() //click generated workflow id

    cy.url().should('include', '/workflows/exec')	  
    cy.contains('Details of Export_LLDP_topology')

    cy.get('div.headerInfo').contains('COMPLETED')

    cy.contains('Input/Output').click()
    //The journal information can be found in the output of the workflow
    //cy.contains('Workflow Output').parent().contains('Unescape').click()
    cy.contains('Workflow Output').parent().find('code > pre#wfoutput').invoke('show').type('{selectall}{ctrl}c')
    cy.contains('Workflow Output').parent().find('code > pre#wfoutput').then(($code) => {
      txt = $code.text() 
      console.log(txt)
      cy.writeFile('cypress/fixtures/lldp_export.json', txt)
    })
    //cy.contains('Workflow Output').parent().contains('Escape').click()

    cy.contains('Execution Flow').click()
    //click on the green box with the CLI_get_cli_journal text.
    cy.wait(5000) //wait for finishing xhrs
    cy.get('#detailTabs-tabpane-execFlow').scrollIntoView()
    //cy.contains('CLI_get_cli_journal').click() //this would work only with force:true because This element '<tspan>' is not visible because it has CSS property: 'position: fixed' and its being covered by another element:
    cy.get('g > rect').click()
    cy.contains('LLDP_export_topology (COMPLETED)')
    //cy.get('code').invoke('show').type('{selectall}{ctrl}c')
    cy.get('button.close').click()
    cy.wait(2000)

    cy.contains('Close').click()
  })
  })

  context('executing GraphvizOnline', () => {
  it('goes to 3rd party visualization tool', function() {
    //Finally you can use any 3rd party visualization tool that can support the graphviz format like https://dreampuf.github.io/GraphvizOnline.
    cy.visit('https://dreampuf.github.io/GraphvizOnline')
    cy.wait(1000)
    cy.readFile('cypress/fixtures/lldp_export.json').then((json) => {
      expect(json).to.be.an('object')
      cy.get('textarea.ace_text-input').clear({force:true})
      //cy.get('textarea.ace_text-input').invoke('show').type('{selectall}{backspace}',{force:true})
      cy.get('textarea.ace_text-input').invoke('show').type('{selectall}{del}',{force:true})
      console.log(json.export.output.export)
      cy.get('textarea.ace_text-input').invoke('show').type(json.export.output.export.replace(/\\n/g, ''),{force:true})
    })
  })
  })
})

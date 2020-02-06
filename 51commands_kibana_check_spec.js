//https://docs.frinx.io/frinx-machine/use-cases/save-and-run-command/save-and-run-command.html
//Save and execute commands on devices
describe('Save and execute commands on devices', function() {
  context('avoid of executing beforeEach with kibana', () => {
  beforeEach(function() {
    cy.login()
  })
	
  it('Save a command to inventory', function() {
    cy.visit('/')
    cy.contains('Workflows').click()	  
    cy.url().should('include', '/workflows/defs')
    cy.contains('Definitions').click() //there are three tabs: Definitions Executed and Scheduled
    cy.get('input[placeholder="Search by keyword."').type('Add_cli_command_template_to_inventory')	  
    cy.contains('Add_cli_command_template_to_inventory').click()	  

    cy.contains('Input').click()	  

    cy.contains('template_id').next().as('template_id') //label bundle_ether_id become alias of next input
    cy.get('@template_id').type('{selectall}{backspace}')
    cy.get('@template_id').type('sh_run')

    cy.get('div.form-group > textarea').as('command') //label bundle_ether_id become alias of next input
    //cy.get('@command').type('{selectall}{backspace}',{force:true})
    cy.get('@command').type('show running-config')

    cy.get('div.modal-content').contains('Execute').click()	  
    cy.get('div.modal-content').contains('Execute').should('not.to.exist')
    cy.get('div.modal-content').contains('OK')
    cy.wait(5000) //wait for propagating to server and back
    //click the ID of the previously executed workflow to see the progress of the workflow
    cy.get('div.modal-footer a:first-child').click() //click generated workflow id

    cy.url().should('include', '/workflows/exec')	  
    cy.contains('Details of Add_cli_command_template_to_inventory')

    cy.contains('Execution Flow').click()
    cy.get('g > rect').click()
    cy.get('div.modal-body').last().scrollTo('center', { duration: 5000 })
    cy.get('div.modal-body').last().scrollTo('bottom', { duration: 5000 })
    cy.get('button.close').click()
    cy.get('div.headerInfo').contains('COMPLETED')
    cy.contains('Close').click()

  })
  })

  context('executing kibana', () => {
  it('goes to inventory', function() {
    //After the workflow has completed, go to Kibana and look for an entry called “lldp”. 
    let inventory = Cypress.env('inventory')
    cy.visit(inventory)
    cy.url({timeout:5000}).should('include', '/app/')
    //cy.wait(5000)
    cy.contains('Discover',{timeout:10000}).click()
    //cy.get('div.ui-select-match > span > i.caret.pull-right').click({force:true})
    cy.get('i.caret.pull-right').click({force:true})
    cy.contains('inventory-show_cmd').click({force:true})
    cy.wait(5000)
    cy.contains('Discover').click()	  
    cy.get('td').click({force:true,multiple:true})
    cy.get("dd span").contains('show_command').scrollIntoView()
  })
  })

  context('avoid of executing beforeEach with kibana', () => {
  beforeEach(function() {
    cy.login()
  })
	
  it('Execute saved command on mounted devices', function() {
    //In our example we will use Execute_and_read_rpc_cli_device_from_inventory which will execute a command from inventory on one device without saving the output of this command to inventory.
    cy.visit('/')
    cy.contains('Workflows').click()	  
    cy.url().should('include', '/workflows/defs')
    cy.contains('Definitions').click() //there are three tabs: Definitions Executed and Scheduled
    cy.get('input[placeholder="Search by keyword."').type('Execute_and_read_rpc_cli_device_from_inventory')	  
    cy.contains('Execute_and_read_rpc_cli_device_from_inventory').click()	  

    cy.contains('Input').click()	  

    cy.contains('template_id').next().as('template_id') //label bundle_ether_id become alias of next input
    cy.get('@template_id').type('{selectall}{backspace}')
    cy.get('@template_id').type('sh_run')

    cy.contains('device_id').next().as('device_id') //label bundle_ether_id become alias of next input
    cy.get('@device_id').type('{selectall}{backspace}')
    cy.get('@device_id').type('IOS01')

    cy.contains('params').next().as('params') //label bundle_ether_id become alias of next input
    cy.get('@params').type('{selectall}{backspace}')
    //cy.get('@params').type('')


    cy.get('div.modal-content > div.modal-footer').contains('Execute').click()	  
    cy.get('div.modal-content > div.modal-footer').contains('Execute').should('not.to.exist')
    cy.get('div.modal-content > div.modal-footer').contains('OK')
    cy.wait(8000) //wait for propagating to server and back
    //click the ID of the previously executed workflow to see the progress of the workflow
    cy.get('div.modal-footer a:first-child').click() //click generated workflow id

    cy.url().should('include', '/workflows/exec')	  
    cy.contains('Details of Execute_and_read_rpc_cli_device_from_inventory')

    cy.contains('Execution Flow').click()
    cy.get('g > rect').click()
    cy.get('div.modal-body').last().scrollTo('center', { duration: 5000 })
    cy.get('div.modal-body').last().scrollTo('bottom', { duration: 5000 })
    cy.get('button.close').click()
    cy.get('div.headerInfo').contains('COMPLETED')
    cy.contains('Close').click()

  })
  })
})

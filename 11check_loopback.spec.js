//https://docs.frinx.io/frinx-machine/use-cases/create-loopback-and-read-journal/create-loopback-and-read-journal.html#running-the-workflow-for-retrieving-the-journal-of-a-device
//Running the workflow for retrieving the journal of a device
describe('Retrieve journal of a device', function() {
  it('retrieves journal for XR02', function() {
//http://localhost:3000/
    cy.visit('http://localhost:3000/')
    cy.contains('UniConfig').click()
    cy.url().should('include', '/devices')
    //cy.get('table tbody tr').first().find('td').eq(1).val().should('contain','XR02')
    cy.get('table tbody tr').first().find('td').eq(1).should('contain','XR02')
    cy.get('td#node_id-0').contains('XR02')
    //TODO how to put it into variable?
    cy.get('.navbar-brand').click()	  
    cy.url().should('include', '/')
    cy.contains('Workflows').click()	  
    cy.url().should('include', '/workflows/defs')
    cy.contains('Definitions').click() //there are three tabs: Definitions Executed and Scheduled
    cy.get('input[placeholder="Search by keyword."').type('Read_journal_cli_device')	  
    cy.contains('Read_journal_cli_device').click()	  
    cy.contains('Input').click()	  
    //label device_id
    //this is input with autocompletion	  
    //at first try to click it to see the list of devices
    //then try to choose one e.g. the first like user would do
    //cy.contains('device_id').parent().find('input').type('XR02').clear() //this does not work because there are two inputs - one for autocompletion...
    cy.get('input[placeholder="Enter the node id"').click() //this is input with autocompletion	  
    cy.wait(1000)
    cy.get('input[placeholder="Enter the node id"').clear().type('XR07') //this is input with autocompletion	  
    cy.wait(100)
    cy.contains('No matches found')
    //TODO Execute
    //negative test abrakadabra -> No matches found .... try to execute - this will break page
    cy.wait(100)
    cy.get('input[placeholder="Enter the node id"').clear().type('XR02') //this is input with autocompletion	  
    cy.wait(100)
    cy.get('input[placeholder="Enter the node id"').clear().click() //this is input with autocompletion	  
    cy.wait(1000)
    cy.contains('XR02').click()
    cy.wait(100)

    cy.get('div.modal-content').contains('Execute').click()	  
    cy.get('div.modal-content').contains('Execute').should('not.to.exist')
    cy.get('div.modal-content').contains('OK')
    cy.wait(5000) //wait for propagating to server and back
    //click the ID of the previously executed workflow to see the progress of the workflow
    cy.get('div.modal-footer a:first-child').click() //click generated workflow id
    //TODO skusit dat do premennej
    //click the ID of the previously executed workflow to see the progress of the workflow
    //http://localhost:3000/workflows/exec/bdc20041-0aec-44da-bf69-672d492f1210
    cy.url().should('include', '/workflows/exec')	  
    cy.wait(5000) //wait for finishing xhrs
    cy.contains('Details of Read_journal_cli_device')
    cy.get('div.headerInfo').contains('COMPLETED')
    cy.contains('Task Details').click()
    cy.contains('Input/Output').click()
    //The journal information can be found in the output of the workflow
    cy.contains('Workflow Output').parent().contains('Unescape').click()
    //cy.scrollTo('bottom') // this does not work failed because this element is not scrollable <window>
    //search for interface Loopback700929
    cy.contains('Workflow Output').parent().find('code').invoke('show').should('contain','interface Loopback700929') //problem element code is not visible
    //Workflow Output  parent() is h4 ... > button with text Escape 
    cy.contains('Workflow Output').parent().contains('Escape').click()
    cy.contains('JSON').click()
    cy.contains('Edit & Rerun').click()
    cy.contains('Execution Flow').click()
    //click on the green box with the CLI_get_cli_journal text.
    cy.wait(5000) //wait for finishing xhrs
    cy.get('#detailTabs-tabpane-execFlow').scrollIntoView()
    //cy.contains('CLI_get_cli_journal').click() //this would work only with force:true because This element '<tspan>' is not visible because it has CSS property: 'position: fixed' and its being covered by another element:
    cy.get('g > rect').click()
    cy.contains('CLI_get_cli_journal (COMPLETED)')
    cy.contains('Summary').click()
    //cy.contains('JSON').click() //this does not work - even in case of force true it finds lower one JSON link which was at previous modal window
    //cy.get('div.modal-body > nav > a').eq(1).click()
    cy.contains('Logs').click()
    cy.contains('Summary').click()

    //The journal information can be found in the output of the workflow
    cy.get('div.container > div.row').eq(5).contains('Unescape').click() // obviously there are counted also elements in previous modal window because if I count what I see in above modal window it is on 3rd position
    //search for interface Loopback700929
    cy.get('code').invoke('show').should('contain','interface Loopback700929') //problem element code is not visible // not sure which one I located here It is difficult to craft good path
    //TODO scrooll to bottom
    cy.get('button.close').click()
    cy.contains('Task Details').click()
    cy.contains('Close').click()
//
//div.modal-footer button text = Close
//under tab Executed is one job ...
//
//
//Close
    })



  it('retrieves journal for IOS01', function() {
//http://localhost:3000/
    cy.visit('http://localhost:3000/')
    cy.contains('UniConfig').click()
    cy.url().should('include', '/devices')
    //cy.get('table tbody tr').first().find('td').eq(1).val().should('contain','XR02')
    //cy.get('table tbody tr').first().find('td').eq(1).should('contain','IOS01') //not valid assertion for IOS
    //cy.get('td#node_id-0').contains('IOS01') //not valid assertion for IOS
    //TODO how to put it into variable?
    cy.get('.navbar-brand').click()	  
    cy.url().should('include', '/')
    cy.contains('Workflows').click()	  
    cy.url().should('include', '/workflows/defs')
    cy.contains('Definitions').click() //there are three tabs: Definitions Executed and Scheduled
    cy.get('input[placeholder="Search by keyword."').type('Read_journal_cli_device')	  
    cy.contains('Read_journal_cli_device').click()	  
    cy.contains('Input').click()	  
    //label device_id
    //this is input with autocompletion	  
    //at first try to click it to see the list of devices
    //then try to choose one e.g. the first like user would do
    //cy.contains('device_id').parent().find('input').type('XR02').clear() //this does not work because there are two inputs - one for autocompletion...
    cy.get('input[placeholder="Enter the node id"').click() //this is input with autocompletion	  
    cy.wait(1000)
    cy.get('input[placeholder="Enter the node id"').clear().type('XR07') //this is input with autocompletion	  
    cy.wait(100)
    cy.contains('No matches found')
    //TODO Execute
    //negative test abrakadabra -> No matches found .... try to execute - this will break page
    cy.wait(100)
    cy.get('input[placeholder="Enter the node id"').clear().type('IOS01') //this is input with autocompletion	  
    cy.wait(100)
    cy.get('input[placeholder="Enter the node id"').clear().click() //this is input with autocompletion	  
    cy.wait(1000)
    cy.contains('IOS01').click()
    cy.wait(100)

    cy.get('div.modal-content').contains('Execute').click()	  
    cy.get('div.modal-content').contains('Execute').should('not.to.exist')
    cy.get('div.modal-content').contains('OK')
    cy.wait(5000) //wait for propagating to server and back
    //click the ID of the previously executed workflow to see the progress of the workflow
    cy.get('div.modal-footer a:first-child').click() //click generated workflow id
    //TODO skusit dat do premennej
    //click the ID of the previously executed workflow to see the progress of the workflow
    //http://localhost:3000/workflows/exec/bdc20041-0aec-44da-bf69-672d492f1210
    cy.url().should('include', '/workflows/exec')	  
    cy.wait(5000) //wait for finishing xhrs
    cy.contains('Details of Read_journal_cli_device')
    cy.get('div.headerInfo').contains('COMPLETED')
    cy.contains('Task Details').click()
    cy.contains('Input/Output').click()
    //The journal information can be found in the output of the workflow
    cy.contains('Workflow Output').parent().contains('Unescape').click()
    //cy.scrollTo('bottom') // this does not work failed because this element is not scrollable <window>
    //search for interface Loopback700929
    cy.contains('Workflow Output').parent().find('code').invoke('show').should('contain','interface Loopback700929') //problem element code is not visible
    //Workflow Output  parent() is h4 ... > button with text Escape 
    cy.contains('Workflow Output').parent().contains('Escape').click()
    cy.contains('JSON').click()
    cy.contains('Edit & Rerun').click()
    cy.contains('Execution Flow').click()
    //click on the green box with the CLI_get_cli_journal text.
    cy.wait(5000) //wait for finishing xhrs
    cy.get('#detailTabs-tabpane-execFlow').scrollIntoView()
    //cy.contains('CLI_get_cli_journal').click() //this would work only with force:true because This element '<tspan>' is not visible because it has CSS property: 'position: fixed' and its being covered by another element:
    cy.get('g > rect').click()
    cy.contains('CLI_get_cli_journal (COMPLETED)')
    cy.contains('Summary').click()
    //cy.contains('JSON').click() //this does not work - even in case of force true it finds lower one JSON link which was at previous modal window
    //cy.get('div.modal-body > nav > a').eq(1).click()
    cy.contains('Logs').click()
    cy.contains('Summary').click()

    //The journal information can be found in the output of the workflow
    cy.get('div.container > div.row').eq(5).contains('Unescape').click() // obviously there are counted also elements in previous modal window because if I count what I see in above modal window it is on 3rd position
    //search for interface Loopback700929
    cy.get('code').invoke('show').should('contain','interface Loopback700929') //problem element code is not visible // not sure which one I located here It is difficult to craft good path
    //TODO scrooll to bottom
    cy.get('button.close').click()
    cy.contains('Task Details').click()
    cy.contains('Close').click()
//
//div.modal-footer button text = Close
//under tab Executed is one job ...
//
//
//Close
    })



})

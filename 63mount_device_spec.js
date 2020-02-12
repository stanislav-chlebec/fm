//Note: this test is using virtual device accessible via VPN
//https://docs.frinx.io/frinx-machine/use-cases/add-to-inventory-and-mount/add-to-inventory-and-mount.html
//Mount the new device from Inventory
describe('Mount the new device from Inventory', function() {
  beforeEach(function() {
    cy.login()
  })
	

  it('mount newly added cli device from the inventory', function() {
    cy.server()
    cy.route('POST', '/api/conductor/workflow').as('getWorkflowId')

    cy.visit('/')

    cy.contains('Workflows').click()	  

    cy.url().should('include', '/workflows/defs')
    cy.contains('Definitions').click() //there are three tabs: Definitions Executed and Scheduled
    cy.get('input[placeholder="Search by keyword."').type('Mount_from_inventory')	  
    cy.contains('Mount_from_inventory').click()	  
    cy.contains('Input').click()	  

    var device_id='BIG_ONE_ROUTER' //: any unique identifier
    cy.get('label').contains('device_id').next().as('device_id') //label  become alias of next input
    cy.get('@device_id').type('{selectall}{backspace}')
    cy.get('@device_id').type(device_id)

    cy.get('div.modal-content').contains('Execute').click()
    cy.wait('@getWorkflowId')
    cy.get('div.modal-content').contains('Execute').should('not.to.exist')
    cy.get('div.modal-content').contains('OK')
    //this explicit wait is needed to wait for completing of procesing on chain ConductorServer<->ElasticSearch<->Dyn
    cy.wait(1000)
    //hopufully now we are ready to go - let us click the workflow id link
    cy.get('div.modal-footer a:first-child').click() //click the ID of the previously executed workflow to see the progress of the workflow

    cy.url().should('include', '/workflows/exec')	  
    cy.get('div.modal-header').contains('Details of Mount_from_inventory',{timeout:3000})
    cy.contains('Execution Flow').click()
    cy.contains('Close').scrollIntoView()
    cy.contains('Task Details').click()
    cy.contains('Close').scrollIntoView()
    cy.contains('Execution Flow').click()
    cy.contains('Close').scrollIntoView()
    cy.contains('Input/Output').click()
    cy.contains('Close').scrollIntoView()
    cy.contains('Execution Flow').click()
    cy.contains('Close').scrollIntoView()
    cy.contains('JSON').click()
    cy.contains('Close').scrollIntoView()
    //cy.get('div.headerInfo').contains('COMPLETED',{timeout:80000})

    cy.contains('Close').click()

    cy.get('.navbar-brand').click()	  
    cy.contains('UniConfig').click()	  
  })

  it.skip('Create a new netconf device in the inventory', function() {
    cy.server()
    cy.route('POST', '/api/conductor/workflow').as('getWorkflowId')

    cy.visit('/')

    cy.contains('Workflows').click()	  

    cy.url().should('include', '/workflows/defs')
    cy.contains('Definitions').click() //there are three tabs: Definitions Executed and Scheduled
    cy.get('input[placeholder="Search by keyword."').type('Add_netconf_device_to_inventory')	  
    cy.contains('Add_netconf_device_to_inventory').click()	  
    cy.contains('Input').click()	  

    var device_id='GREATER_ONE_ROUTER' //: any unique identifier
    var port='1783' //: port to connect to
    var host='192.168.1.212' //: host ip address
    var keepalivedelay='50000' //: value of keepalive delay
    var tcponly='true' //: set type of communication
    var username='cisco' //: credentials to use
    var password='cisco' //: credentials to use
    var labels='TEST ADDED_THROUGH_WORKHLOW GREATER_ONE_ROUTER XR612-212' //: label of device (optional)
    var uniconfignative='true' //: enable uniconfig-native
    var blacklist='openconfig-interfaces:interfaces' //: List of blacklisted root paths

    cy.get('label').contains('device_id').next().as('device_id') //label  become alias of next input
    cy.get('@device_id').type('{selectall}{backspace}')
    cy.get('@device_id').type(device_id)

    cy.get('label').contains('port').next().as('port') //label  become alias of next input
    cy.get('@port').type('{selectall}{backspace}')
    cy.get('@port').type(port)

    cy.get('label').contains('host').next().as('host') //label  become alias of next input
    cy.get('@host').type('{selectall}{backspace}')
    cy.get('@host').type(host)

    cy.get('label').contains('keepalivedelay').next().as('keepalivedelay') //label  become alias of next input
    cy.get('@keepalivedelay').type('{selectall}{backspace}')
    cy.get('@keepalivedelay').type(keepalivedelay)

    cy.get('label').contains('tcponly').next().as('tcponly') //label  become alias of next input
    cy.get('@tcponly').type('{selectall}{backspace}')
    cy.get('@tcponly').type(tcponly)

    cy.get('label').contains('username').next().as('username') //label  become alias of next input
    cy.get('@username').type('{selectall}{backspace}')
    cy.get('@username').type(username)

    cy.get('label').contains('password').next().as('password') //label  become alias of next input
    cy.get('@password').type('{selectall}{backspace}')
    cy.get('@password').type(password)

    cy.get('label').contains('labels').next().as('labels') //label  become alias of next input
    cy.get('@labels').type('{selectall}{backspace}')
    cy.get('@labels').type(labels)

    cy.get('label').contains('uniconfignative').next().as('uniconfignative') //label  become alias of next input
    cy.get('@uniconfignative').type('{selectall}{backspace}')
    cy.get('@uniconfignative').type(uniconfignative)

    cy.get('label').contains('blacklist').next().as('blacklist') //label  become alias of next input
    cy.get('@blacklist').type('{selectall}{backspace}')
    cy.get('@blacklist').type(blacklist)

    /*
    //	  
    cy.contains('').next().as('') //label  become alias of next input
    cy.get('@').type('{selectall}{backspace}')
    cy.get('@').type('')
    */

    cy.get('div.modal-content').contains('Execute').click()
    cy.wait('@getWorkflowId')
    cy.get('div.modal-content').contains('Execute').should('not.to.exist')
    cy.get('div.modal-content').contains('OK')
    //this explicit wait is needed to wait for completing of procesing on chain ConductorServer<->ElasticSearch<->Dyn
    cy.wait(1000)
    //hopufully now we are ready to go - let us click the workflow id link
    cy.get('div.modal-footer a:first-child').click() //click the ID of the previously executed workflow to see the progress of the workflow

    cy.url().should('include', '/workflows/exec')	  
    cy.get('div.modal-header').contains('Details of Add_netconf_device_to_inventory',{timeout:3000})
    cy.contains('Close').scrollIntoView()
    cy.get('div.headerInfo').contains('COMPLETED',{timeout:40000})

    cy.contains('Execution Flow').click()
    //click on the green box with the CLI_get_cli_journal text.
    cy.get('#detailTabs-tabpane-execFlow').scrollIntoView()
    cy.wait(500) //wait - this element is detached from the DOM. - wait until attached 
    cy.get('g > rect').click()
    cy.get('div[role="document"].modal-lg > div.modal-content > div.modal-body').scrollTo('bottom',{duration:500})
    cy.get('div[role="document"].modal-lg > div.modal-content > div.modal-body > div > div > div > div.row').eq(4).scrollIntoView()
    cy.contains('INVENTORY_add_netconf_device (COMPLETED)')

    cy.get('button.close').click()

    cy.contains('Close').click()
  })
})
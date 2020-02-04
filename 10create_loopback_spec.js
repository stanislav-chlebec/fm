describe('Create loopback address on devices stored in the inventory', function() { 
  beforeEach(function() {
    cy.login()

    //Make sure you didn’t skip mounting all devices in inventory, otherwise this workflow might not work correctly.
    //
    //This use case does not work with VRP01 and netconf-testtool devices. 
	  
    cy.visit('/') 
    cy.contains('UniConfig').click()	  
    cy.contains('VRP01').parent().find('td').eq(0).click()
    cy.contains('netconf-testtool').parent().find('td').eq(0).click()
    cy.contains('Unmount Devices').click()	  
    cy.contains('VRP01').should('not.to.exist')
    cy.contains('netconf-testtool').should('not.to.exist')
  
  })

	
  it('creates loopback700929 on all mounted devices', function() { 
    cy.visit('/') 

    cy.contains('UniConfig').click() //look list of mounted devices  

    cy.get('.navbar-brand').click()	  
    cy.contains('Workflows').click()	  

    cy.url().should('include', '/workflows/defs')	  
    cy.get('input[placeholder="Search by keyword."').type('Create_loopback_all_in_uniconfig')	  
    cy.contains('Create_loopback_all_in_uniconfig').click()	  
    cy.contains('Input').click()	  
    cy.contains('loopback_id').parent().find('input').type('700929') //it should be random generated maybe

    cy.server({
      method: 'POST',
    })
    cy.route('/api/conductor/workflow').as('getWorkflowId')
    cy.get('div.modal-content').contains('Execute').click()
    cy.wait('@getWorkflowId')
    cy.get('div.modal-content').contains('Execute').should('not.to.exist')
    cy.get('div.modal-content').contains('OK')
    cy.get('div.modal-footer a:first-child').click() //click generated workflow id

    cy.url().should('include', '/workflows/exec')	  
    cy.wait(5000) //wait for finishing xhrs
    cy.contains('Details of Create_loopback_all_in_uniconfig')
    //here there are some problem with visibility of table ...
    //cy.get('div.modal-content table tbody tr').should('have.length',2)
    //cy.get('#detailTabs-tabpane-taskDetails').get('tbody tr td:last').should('have.length',2)  ///.contains('COMPLETED',{timeout:300000})

    //here were again a lot of problems how to achieve clicking of subworkflow .... solutiion - invoke(show) on div which has set display:none:
    cy.contains('Children').click().parent().find('div.dropdown-menu').invoke('show').contains('create_loopback').click()
    //cy.contains('create_loopback').click({force:true}) //this did not work
    //cy.contains('Children').click().get('a') // neither worked

    cy.wait(5000)
    cy.contains('Details of Dynamic_fork')
    cy.get('div.headerInfo').contains('COMPLETED',{timeout:300000})
    cy.get('div.heightWrapper').scrollTo('bottom', { duration: 2000 })

    cy.contains('Input/Output').click()
    cy.contains('Task Details').click()
    cy.contains('JSON').click()
    cy.contains('Task Details').click()
    cy.contains('Edit & Rerun').click()
    cy.contains('Task Details').click()
    cy.contains('Execution Flow').click()
    cy.contains('Task Details').click()


    cy.contains('Parent').click()

    //return to previous
    cy.contains('Details of Create_loopback_all_in_uniconfig')
    cy.contains('Children').click()
	  
    cy.get('div.headerInfo').contains('COMPLETED',{timeout:300000})
    //cy.get('#detailTabs-tabpane-taskDetails').get('tbody tr td:last').should('have.length',2)  ///.contains('COMPLETED',{timeout:300000})


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

    cy.contains('UniConfig').click()	  
    //cy.get('table tbody tr').should('have.length',2)
 /*   cy.wait(5000)
    cy.contains('XR02').parent().find('td').eq(5).click()
    cy.url().should('include', '/devices/edit/XR02')	  
	cy.get('div.operational').scrollIntoView()
        cy.wait(5000)
	cy.get('div.operational div.CodeMirror-vscrollbar').scrollTo('bottom', { duration: 2000 })
	cy.get(':contains(700929)').first().scrollIntoView()
	cy.go(-1)
    //cy.get('button[class~="round"]').click({force:true})
*/

    //	  After the main and sub-workflows have completed successfully the loopback addres was created on the devices. Since we are working with emulated devices, we can check a device journal to see if it was really created.

  })
})

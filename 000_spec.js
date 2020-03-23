describe('Mount devices from UniConfig', function() {
  beforeEach(function() {
    cy.login()
  })
/*
  var cliDev='XR01'
  it.skip('Mount cli device ' + cliDev, function() {
    cy.server({
      method: 'GET',
    })
    cy.route('/api/odl/conf/uniconfig/' + cliDev).as('getConfig')

    cy.visit('/')
    cy.contains('UniConfig').click()

    cy.url().should('include', '/devices')

    //cy.get('table tbody tr').should('not.to.exist')
    cy.contains('Mount Device').click()

    cy.contains('CLI').click()
    cy.contains('Basic').click()

    cy.get('#mountcliInput-node-id')
      .clear()
      .type(cliDev)
      .should('have.value', cliDev)

    cy.get('#mountcliInput-host')
      .clear()
      .type('sample-topology')
      .should('have.value', 'sample-topology')

    cy.get('#mountcliInput-port')
      .clear()
      .type('10001')
      .should('have.value', '10001')

    cy.get('label[for="mountcliInput-transport-type"] ~ div[class="Dropdown-root"] > div[class="Dropdown-control"] > div[class="Dropdown-arrow-wrapper"] > span')
      .click()
    cy.get('div[class^="Dropdown-option"]').contains('ssh')
      .click()

    cy.get('label[for="mountcliInput-transport-type"] ~ div[class="Dropdown-root"] > div[class="Dropdown-control"] > div[class="Dropdown-placeholder is-selected"]')
      .contains('ssh')

    cy.get('label[for="mountcliInput-device-type"] ~ div[class="Dropdown-root"] > div[class="Dropdown-control"] > div[class="Dropdown-arrow-wrapper"] > span')
      .click()
    cy.get('div[class^="Dropdown-option"]').contains('ios xr')
      .click()

    cy.get('label[for="mountcliInput-device-version"] ~ div[class="Dropdown-root"] > div[class="Dropdown-control"] > div[class="Dropdown-arrow-wrapper"] > span')
      .click()
    cy.get('div[class^="Dropdown-option"]').contains('6.*')
      .click()

    cy.get('#mountcliInput-username')
      .clear()
      .type('cisco')
      .should('have.value', 'cisco')

    cy.get('#mountcliInput-password')
      .clear()
      .type('cisco')

    cy.get('button[class="btn btn-primary"]').contains('Mount Device')
      .then(($button) => {
      $button.click()
      })

    cy.get('button[class="btn btn-primary"]').should('not.to.exist')
    cy.get('button.btn.btn-success', { timeout : 30000  } ).should('contain','Connected')
    cy.contains('Close').click()
    cy.get('div.modal-dialog.modal-lg').should('not.to.exist')

    //cy.get('table tbody tr').should('have.length',1)
    cy.get('table tbody tr').should('to.exist')
    cy.contains(cliDev).click()

    cy.get('div.modal-dialog.modal-lg')
    cy.contains('Basic').click()
    cy.get('input[value="connected"]')
    cy.contains('Available capabilities').click()
    cy.contains('Unavailable capabilities').click()
    cy.contains('Commit error patterns').click()
    cy.contains('Error patterns').click()

    cy.contains('Close').click()
    cy.get('div.modal-dialog.modal-lg').should('not.to.exist')
    cy.contains(cliDev).parent().find('td').eq(0).click()
    cy.contains(cliDev).parent().find('td').eq(0).click()
    cy.contains(cliDev).parent().find('td').eq(5).click()
    cy.wait('@getConfig')
    cy.url().should('include', '/devices/edit/' + cliDev)
    cy.get('button[class~="round"]').click({force:true})
    cy.contains('Refresh').click()

    //cy.contains('XR01').parent().find('td').eq(0).click()
    //cy.contains('Unmount Devices').click()
    //cy.get('table tbody tr').should('not.to.exist')
  })
*/
  var netconfDev='netconf-testtool'
  it('Mount netconf device ' + netconfDev, function() {
    cy.server({
      method: 'GET',
    })
    cy.route('/api/odl/conf/uniconfig/' + netconfDev).as('getConfig')

    cy.visit('/')
    cy.contains('UniConfig').click()
    cy.url().should('include', '/devices')

    cy.contains('Mount Device').click()

    cy.contains('Netconf').click()
    // this does not work - why ??? cy.contains('Basic').click()
    //cy.get('div.tab-content').contains('Basic', {force:true}).click()// nefunguje lebo najde prvy Basic na prvom paneli ktory je hidden
    cy.get('#mountTabs-tabpane-Netconf').contains('Basic').click()

    cy.get('#mountnetconfInput-node-id')
      .clear()
      .type(netconfDev)
      .should('have.value', netconfDev)

    cy.get('#mountnetconfInput-host')
      .clear()
      .type('sample-topology')
      .should('have.value', 'sample-topology')

    cy.get('#mountnetconfInput-port')
      .clear()
      .type('1783')
      .should('have.value', '1783')

    cy.get('#mountnetconfInput-username')
      .clear()
      .type('cisco')
      .should('have.value', 'cisco')

    cy.get('#mountnetconfInput-password')
      .clear()
      .type('cisco')

    cy.get('#mountTabs-tabpane-Netconf').contains('Advanced').click()
    cy.contains('UniConfig Native').click()
    cy.contains('Blacklist').parent().find(':checkbox').click()




    cy.get('button[class="btn btn-primary"]').contains('Mount Device')
      .then(($button) => {
      $button.click()
      })

    cy.get('button[class="btn btn-primary"]').should('not.to.exist')
    cy.get('button.btn.btn-success', { timeout : 30000  } ).should('contain','Connected')
    cy.contains('Close').click()
    cy.get('div.modal-dialog.modal-lg').should('not.to.exist')

    //cy.get('table tbody tr').should('have.length',2)
    cy.get('table tbody tr').should('to.exist')
    cy.contains(netconfDev).click()

    cy.get('div.modal-dialog.modal-lg')
    cy.contains('Basic').click()
    cy.get('input[value="connected"]')
    cy.contains('Available capabilities').click()
    cy.contains('Unavailable capabilities').click()
    //cy.contains('Commit error patterns').click()
    //cy.contains('Error patterns').click()
    cy.contains('Basic').click()

    cy.contains('Close').click()
    cy.get('div.modal-dialog.modal-lg').should('not.to.exist')
    cy.contains(netconfDev).parent().find('td').eq(0).click()
    cy.contains(netconfDev).parent().find('td').eq(0).click()
    cy.contains(netconfDev).parent().find('td').eq(5).click()
    cy.wait('@getConfig')
    cy.url().should('include', '/devices/edit/' + netconfDev)

    //cy.contains('Sync from network').click()
    //cy.get('div.role["alert"]').contains('SYNC-FROM-NETWORK :')
    //cy.get('div.role["alert"]').contains('Node-status: complete')

    cy.get('button[class~="round"]').click({force:true})
    cy.contains('Refresh').click()

    //cy.contains(netconfDev).parent().find('td').eq(0).click()
    //cy.contains('Unmount Devices').click()
    //cy.get('table tbody tr').should('not.to.exist')
  })

  var cliDev='netconf-testtool'
  it.skip('Configure ' + cliDev, function() {
    cy.server({
      method: 'GET',
    })
    cy.route('/api/odl/conf/uniconfig/' + cliDev).as('getConfig')
    cy.route('/api/odl/oper/uniconfig/' + cliDev).as('getConfig')
    cy.server({
      method: 'POST',
    })
    cy.route('/api/odl/operations/sync-from-network').as('getConfigFromNetwork')
    cy.route('/api/odl/operations/replace-config-with-operational').as('getConfigFromOperational')
    cy.route('/api/odl/operations/create-snapshot').as('postCreateSnapshot')

    cy.visit('/')
    cy.contains('UniConfig').click()

    cy.url().should('include', '/devices')

    cy.contains(cliDev).parent().find('td').eq(5).click()
    cy.wait('@getConfig')
    cy.url().should('include', '/devices/edit/' + cliDev)

    //******************
    //Display console
    cy.get('span#consoleButton').click()
    cy.contains('Console output of')
    cy.contains('{}')
    cy.contains('Close').click()

    //Sync from network (refresh actual configuration window)
    cy.contains('Sync from network').click()
    cy.wait('@getConfigFromNetwork')
    cy.wait('@getConfig')

    cy.get('.options ~ div[role="alert"]').contains('SYNC-FROM-NETWORK :')
    cy.get('.options ~ div[role="alert"]').contains('Node-status: complete')
    cy.get('.options ~ div[role="alert"] > i').click()

    cy.get('span#consoleButton').click()
    cy.contains('Console output of Sync-from-network')
    cy.contains('Close').click()

    //Save Intended Configuration (after change)
    cy.contains('Save').click()

    cy.get('span#consoleButton').click()
    cy.contains('Close').click()

    //Refresh (refresh intended configuration window)
    cy.contains('Refresh').click()
    cy.wait('@getConfig')

    cy.get('span#consoleButton').click()
    cy.contains('Close').click()

    //Refresh/Replace with Operational
    cy.contains('Refresh').next().click()
    cy.contains('Replace with Operational').click()
    cy.wait('@getConfigFromOperational')
    cy.wait('@getConfig')

    cy.get('.options ~ div[role="alert"]').contains('REPLACE-CONFIG-WITH-OPERATIONAL:')
    cy.get('.options ~ div[role="alert"]').contains('Node-status: complete')
    cy.get('.options ~ div[role="alert"] > i').click()

    cy.get('span#consoleButton').click()
    cy.contains('Console output of Replace-config-with-operational')
    cy.contains('Close').click()

    //Create snapshot
    var Idx='_002'
    cy.contains('Create snapshot').click()
    cy.get('#snapshotNameInput').clear().type(cliDev + Idx).should('have.value', cliDev + Idx)
    cy.contains('Save Snapshot').click()
    cy.wait('@postCreateSnapshot')
    cy.contains('Close').click()

    //Load snapshot
    cy.contains('Load Snapshot').click()
    cy.contains(cliDev + Idx).click()

    cy.get('.options ~ div[role="alert"]').contains('REPLACE-CONFIG-WITH-SNAPSHOT:')
    cy.get('.options ~ div[role="alert"]').contains('Node-status: complete')
    cy.get('.options ~ div[role="alert"] > i').click()

    cy.get('span#consoleButton').click()
    cy.contains('Console output of Replace-Config-With-Snapshot')
    cy.contains('Close').click()

    // TODO Toggle deleting

    //
    cy.contains('Show Diff').click()
    cy.contains('Hide Diff').click()
    cy.contains('Show Diff').next().click()
    cy.contains('Get calculated diff').click()

    cy.get('span#consoleButton').click()
    cy.contains('Console output of Calculated Diff')
    cy.contains('Close').click()

    cy.contains('Dry run').click()

    cy.get('.options ~ div[role="alert"]').contains('DRY-RUN FAIL')
    cy.get('.options ~ div[role="alert"]').contains('Node does not support dry-run')
    cy.get('.options ~ div[role="alert"] > i').click()

    cy.contains('Commit to network').click()

    cy.get('.options ~ div[role="alert"]').contains('COMMIT-TO-NETWORK')
    cy.get('.options ~ div[role="alert"]').contains('Node-status: complete')
    cy.get('.options ~ div[role="alert"] > i').click()

    cy.get('span#consoleButton').click()
    cy.contains('Console output of Commit to Network')
    cy.contains('Close').click()

    cy.get('div.operational > div > div > div.ReactCodeMirror > textarea').contains(': "192.168.1.213",')
    cy.get('div.config > div > div > div.ReactCodeMirror > textarea').contains(': "192.168.1.213",')
    //cy.get('div.operational').find('pre.CodeMirror-line span span').contains('192.168.1.213')

    //******************
    //Leave devices/edit page
    cy.get('button[class~="round"]').click()
    cy.url().should('include', '/devices')
  })

  var cliDev='netconf-testtool'
  it('Configure ' + cliDev, function() {
    cy.server({
      method: 'GET',
    })
    cy.route('/api/odl/conf/uniconfig/' + cliDev).as('getConfig')
    cy.route('/api/odl/oper/uniconfig/' + cliDev).as('getConfig')
    cy.server({
      method: 'POST',
    })
    cy.route('/api/odl/operations/sync-from-network').as('getConfigFromNetwork')
    cy.route('/api/odl/operations/replace-config-with-operational').as('getConfigFromOperational')
    cy.route('/api/odl/operations/create-snapshot').as('postCreateSnapshot')

    cy.visit('/')
    cy.contains('UniConfig').click()

    cy.url().should('include', '/devices')

    cy.contains(cliDev).parent().find('td').eq(5).click()
    cy.wait('@getConfig')
    cy.url().should('include', '/devices/edit/' + cliDev)

    //******************
    //Display console
    cy.get('span#consoleButton').click()
    cy.contains('Console output of')
    cy.contains('{}')
    cy.contains('Close').click()

    //Sync from network (refresh actual configuration window)
    cy.contains('Sync from network').click()
    cy.wait('@getConfigFromNetwork')
    cy.wait('@getConfig')

    cy.get('.options ~ div[role="alert"]').contains('SYNC-FROM-NETWORK :')
    cy.get('.options ~ div[role="alert"]').contains('Node-status: complete')
    cy.get('.options ~ div[role="alert"] > i').click()

    cy.get('span#consoleButton').click()
    cy.contains('Console output of Sync-from-network')
    cy.contains('Close').click()

    //Save Intended Configuration (after change)
    cy.contains('Save').click()

    cy.get('span#consoleButton').click()
    cy.contains('Close').click()

    //Refresh (refresh intended configuration window)
    cy.contains('Refresh').click()
    cy.wait('@getConfig')

    cy.get('span#consoleButton').click()
    cy.contains('Close').click()

    //Refresh/Replace with Operational
    cy.contains('Refresh').next().click()
    cy.contains('Replace with Operational').click()
    cy.wait('@getConfigFromOperational')
    cy.wait('@getConfig')

    cy.get('.options ~ div[role="alert"]').contains('REPLACE-CONFIG-WITH-OPERATIONAL:')
    cy.get('.options ~ div[role="alert"]').contains('Node-status: complete')
    cy.get('.options ~ div[role="alert"] > i').click()

    cy.get('span#consoleButton').click()
    cy.contains('Console output of Replace-config-with-operational')
    cy.contains('Close').click()

    //Create snapshot
    var Idx='_002'
    cy.contains('Create snapshot').click()
    cy.get('#snapshotNameInput').clear().type(cliDev + Idx).should('have.value', cliDev + Idx)
    cy.contains('Save Snapshot').click()
    cy.wait('@postCreateSnapshot')
    cy.contains('Close').click()

    //Load snapshot
    cy.contains('Load Snapshot').click()
    cy.contains(cliDev + Idx).click()

    cy.get('.options ~ div[role="alert"]').contains('REPLACE-CONFIG-WITH-SNAPSHOT:')
    cy.get('.options ~ div[role="alert"]').contains('Node-status: complete')
    cy.get('.options ~ div[role="alert"] > i').click()

    cy.get('span#consoleButton').click()
    cy.contains('Console output of Replace-Config-With-Snapshot')
    cy.contains('Close').click()

    // TODO Toggle deleting

    //
    cy.contains('Show Diff').click()
    cy.contains('Hide Diff').click()
    cy.contains('Show Diff').next().click()
    cy.contains('Get calculated diff').click()

    cy.get('span#consoleButton').click()
    cy.contains('Console output of Calculated Diff')
    cy.contains('Close').click()

    cy.contains('Dry run').click()

    cy.get('.options ~ div[role="alert"]').contains('DRY-RUN FAIL')
    cy.get('.options ~ div[role="alert"]').contains('Node does not support dry-run')
    cy.get('.options ~ div[role="alert"] > i').click()

    cy.contains('Commit to network').click()

    cy.get('.options ~ div[role="alert"]').contains('COMMIT-TO-NETWORK')
    cy.get('.options ~ div[role="alert"]').contains('Node-status: complete')
    cy.get('.options ~ div[role="alert"] > i').click()

    cy.get('span#consoleButton').click()
    cy.contains('Console output of Commit to Network')
    cy.contains('Close').click()

    cy.get('div.operational > div > div > div.ReactCodeMirror > textarea').contains(': "192.168.1.213",')
    cy.get('div.config > div > div > div.ReactCodeMirror > textarea').contains(': "192.168.1.213",')
    //cy.get('div.operational').find('pre.CodeMirror-line span span').contains('192.168.1.213')

    //******************
    //Leave devices/edit page
    cy.get('button[class~="round"]').click()
    cy.url().should('include', '/devices')
  })
})

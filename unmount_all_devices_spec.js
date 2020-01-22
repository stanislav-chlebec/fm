describe('Unmount all mounted devices', function() { 
  it('unmounts all devices', function() { 
    cy.visit('http://localhost:3000') 
    cy.contains('UniConfig').click()	  
    //cy.contains('Refresh').click()
    //cy.get('table tbody tr td:first-child',{timeout:"10000"}).click({multiple:true})
    cy.contains('connected').parent().find('td').eq(0).click()
    cy.contains('connected').parent().find('td').eq(0).click()
    cy.get('table tbody tr td:first-child').click({multiple:true})
    cy.contains('Unmount Devices').click()	  
    cy.get('table tbody tr').should('not.to.exist')
  })
})

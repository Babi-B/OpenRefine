describe(__filename, function () {
  it('List an existing project tag, ensure a newly created project tag is created and displayed', function () {
    const projectName = Date.now();
    cy.loadProject('food.mini', projectName, 'TestTag');
    cy.visitOpenRefine();
    cy.navigateTo('Open project');
    cy.get('#projects-list table').contains(projectName);
    cy.get('#projects-list table').contains('TestTag');
  });
  it('Ensure all project tags are created and displayed as filter', function () {
    const project1 = 'Project A';
    const project2 = 'Project B';
    cy.loadProject('food.mini', project1, 'TestTagOne');
    cy.loadProject('food.mini', project2, 'TestTagTwo');
    cy.visitOpenRefine();
    cy.navigateTo('Open project');
    cy.get('#projects-list table').contains(project1);
    cy.get('#projects-list table').contains('TestTagOne');
    cy.get('#projectTags ul').children().should('contain', 'TestTagOne');
    cy.get('#projectTags ul').children().should('contain', 'TestTagTwo');
  });

  it('Ensure projects are being filtered through tags', function () {
    const project1 = 'Project A';
    const project2 = 'Project B';
    cy.loadProject('food.mini', project1, 'TestTagOne');
    cy.loadProject('food.mini', project2, 'TestTagTwo');
    cy.visitOpenRefine();
    cy.navigateTo('Open project');
    cy.get('#projects-list table').contains(project1);
    cy.get('#projects-list table').contains('TestTagOne');
    cy.get('#projectTags ul').children().contains('TestTagOne').click();
    cy.get('#projects-list table').contains(project2).should('not.be.visible');
    cy.get('#projects-list table').contains(project1).should('be.visible');
    cy.get('#projectTags ul').children().contains('TestTagTwo').click();
    cy.get('#projects-list table').contains(project2).should('be.visible');
    cy.get('#projects-list table').contains(project1).should('not.be.visible');
  });

  it('Ensure projects are being filtered through search', function () {
    const project1 = 'Project A';
    const project2 = 'Project B';
    cy.loadProject('food.mini', project1);
    cy.loadProject('food.mini', project2);
    cy.visitOpenRefine();
    cy.navigateTo('Open project');
    cy.get('#projects-list table').contains(project1);
    cy.get('#searchIcon').click();

    cy.get('#searchInProjects').type('Project B');
    cy.wait(1500); // typing timeout is 1000 msec
    cy.get('#projects-list table').contains(project1).should('not.be.visible');
    cy.get('#projects-list table').contains(project2).should('be.visible');

    cy.get('#searchInProjects').type('{backspace}{backspace}');
    cy.wait(1500); // typing timeout is 1000 msec
    cy.get('#projects-list table').contains(project1).should('be.visible');
    cy.get('#projects-list table').contains(project2).should('be.visible');

    cy.get('#searchInProjects').type(' A');
    cy.wait(1500); // typing timeout is 1000 msec
    cy.get('#projects-list table').contains(project1).should('be.visible');
    cy.get('#projects-list table').contains(project2).should('not.be.visible');
  });
});

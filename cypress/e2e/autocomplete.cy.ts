describe('AutoComplete', () => {
  // beforeEach("AutoComplete", function () {
  //   cy.visit("localhost:3000")
  // })
  it('Home page', () => {
    cy.visit("/")
  })
  it("filters source of the textbox correctly", () => {
    cy.get("input").type("obi");
    cy.get("li").should("have.length", 1)
    cy.get('li:first-of-type').should('contain', 'obi')
  });

  it("set textbox input when click into the list item", function () {
    cy.get("input").type("obi");
    cy.get("li:first-of-type").click();
    cy.get('input').should($input => {
      expect($input[0].value).to.be.equal('obi-wan kenobi')
    })
  })

  it("filter source of the textbox input incorrectly", function () {
    cy.get("input").clear()

    cy.get("input").type("mungo  park");
    cy.get("li").should("have.length", 0)

    cy.get('[class=no-match]').should("have.text", "No result match your query")
  })
})
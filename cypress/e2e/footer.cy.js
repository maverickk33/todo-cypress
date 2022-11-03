describe("this is Footer Test", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  it("Check Footer", () => {
    cy.get("footer").should("have.class", "footer text-center");
    cy.get("span.text-muted").should("have.text", "sany.baust@gmail.com");
  });
});

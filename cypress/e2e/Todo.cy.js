describe("Checks the Todo  App", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });
  context("Visits the app", () => {
    it("loads the url", () => {
      // cy.visit("http://localhost:3000");
      cy.get(".container div.card").should("have.length.at.least", 1);
    });
  });
});

describe("Navbar ", () => {
  it("checks navbar", () => {
    cy.visit("http://localhost:3000");
    cy.get(".navbar.navbar-dark.bg-primary > a:nth-child(1)").should(
      "have.text",
      "Book Reading List"
    );
    cy.get(".navbar.navbar-dark.bg-primary > a:nth-child(1)").click();
    cy.get(".navbar.navbar-dark.bg-primary > a:nth-child(2)").should(
      "have.text",
      "Add Book"
    );
  });
});

describe("Add Book ", () => {
  specify("Check the add book", () => {
    // Clicking Add Button in Navbar
    cy.get(".navbar.navbar-dark.bg-primary > a:nth-child(2)").click();
    // Checks Form Exists
    cy.get("form.form-group").should("exist");

    cy.get("input[type=text]:nth-child(1)").should(
      "have.attr",
      "placeholder",
      "Enter Book Name"
    );
    cy.get("input[type=text]:nth-child(1)")
      .should("have.attr", "placeholder", "Enter Book Name")
      .type("Rich Dad Poor Dad");

    cy.get("[name='author']").should(
      "have.attr",
      "placeholder",
      "Enter Author Name"
    );
    cy.get("[name='author']")
      .should("have.attr", "placeholder", "Enter Author Name")
      .type("Ryan Kazanski");
    //  Check Book Name field have the value
    cy.get("input[type=text]:nth-child(1)")
      .should("have.attr", "placeholder", "Enter Book Name")
      .should("have.value", "Rich Dad Poor Dad");
    //  Check Author field have the value
    cy.get("[name='author']")
      .should("have.attr", "placeholder", "Enter Author Name")
      .should("have.value", "Ryan Kazanski");

    //  Submit Button
    cy.get("button[type=submit]").should("have.text", "Submit").click();

    cy.get("h5.card-header").should("have.length", 2);
    cy.get("h5.card-header > div").should("have.class", "btn btn-primary");
    cy.get("h5.card-header").contains("Delete");
    cy.get("h5.card-header").contains("Edit");
    cy.get("div.card-body").should("have.length", 2);
  });
});

describe("Check For Edit", () => {
  specify("Edit Button", () => {
    cy.get(":nth-child(1) > .card-header").contains("Edit").click();
    cy.get("input[name=title]")
      .should("have.value", "The Road to learn React")
      .focus()
      .clear();
    cy.get("input[name=title]").type("Edited Book Name");
    cy.get("button[type=submit]").should("have.text", "Update").click();

    cy.get(":nth-child(1) > .card-body > .card-title").should(
      "have.text",
      "Edited Book Name"
    );
    cy.get(":nth-child(1) > .card-body > .blockquote-footer").contains(
      "Robin Wieruch"
    );
    cy.get(":nth-child(2) > .card-header > .ml-5").click();
    cy.get("input[name=title]")
      .should("have.value", "Rich Dad Poor Dad")
      .focus()
      .clear();
    cy.get("input[name=title]").type("Another Edit {enter}");
  });
});

describe("Check for Delete", () => {
  it("On Delete ", () => {
    cy.get(":nth-child(1) > .card-header > :nth-child(1)")
      .contains("Delete")
      .click();
    cy.get(".card-title").should("have.length", 1);
    cy.get(".blockquote-footer").should("have.length", 1);
    cy.get(":nth-child(2) > .card-header > :nth-child(1)").should("not.exist");
    // cy.go("back");
    cy.get(".card-header > :nth-child(1)")
      .contains("Delete")
      .should("have.text", "Delete")
      .click();
    cy.get(".card-title")
      .should("have.length", 1)
      .should("have.text", "Currently No Listing");
    cy.get("p")
      .should("have.class", "card-text")
      .should("have.text", "Add Your Reading List.");
    cy.get(":nth-child(2) > .card-header > :nth-child(1)").should("not.exist");
  });
});

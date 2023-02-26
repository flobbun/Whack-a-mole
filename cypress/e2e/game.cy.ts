describe("Game", () => {
  it("shows the menu", () => {
    // Visits the menu page
    cy.visit("/");

    // User should see the title
    cy.get("h1").should("contain", "Whack a mole");

    // User should see the start button
    cy.get("button").should("contain", "Start");

    // User should see the leaderboard button
    cy.get("button").should("contain", "Leaderboard");

    // User should start a new game by clicking on the button
    cy.get('[data-testid="start"]').click();

    // The game should end after 2 minutes
    cy.wait(120000);

    // User should see the score
    cy.url().should("include", "/leaderboard");
    cy.get('[data-testid="leaderboard"]');
  });
});

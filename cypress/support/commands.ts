Cypress.Commands.add("getByCy", (selector, ...args) => cy.get(`[data-cy="${selector}"]`, ...args));

Cypress.Commands.add("getByCyLike", (selector, ...args) => cy.get(`[data-cy*=${selector}]`, ...args));

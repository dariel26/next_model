import "./commands";

import { mount } from "cypress/react";

//Ensure global styles are loaded
import "../../src/app/globals.css";

declare global {
    namespace Cypress {
        interface Chainable {
            mount: typeof mount;
        }
    }
}

Cypress.Commands.add("mount", mount);

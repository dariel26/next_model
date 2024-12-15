import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        experimentalRunAllSpecs: true,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: "http://localhost:3000",
    },
});

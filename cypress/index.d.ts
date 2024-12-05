export {};
declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            getByCy(qaSelector: string, args?: any): Chainable<JQuery<HTMLElement>>;
            getByCyLike(partialQaSelector: string, args?: any): Chainable<JQuery<HTMLElement>>;
        }
    }
}

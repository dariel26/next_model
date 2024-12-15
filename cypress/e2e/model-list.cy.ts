import routesUtils from "../../src/lib/utils/routes";

describe("Listagem de Modelos", () => {
    const TITLE_MODEL_1 = "Vendas CRM";
    const DESCRIPTION_MODEL_1 = "Estas são vendas realizadas através da nossa ferramenta de CRM.";

    const TITLE_MODEL_2 = "Clientes";

    const TEXT_BTN_ADD_NEW_MODEL = "Novo";

    it("deveria listar todos os modelos", () => {
        cy.visit(routesUtils.modelList);

        cy.contains(TITLE_MODEL_1).should("be.visible");
        cy.contains(DESCRIPTION_MODEL_1).should("be.visible");

        cy.contains(TITLE_MODEL_2).should("be.visible");

        cy.contains(TEXT_BTN_ADD_NEW_MODEL).click();
        cy.contains("Encontre um modelo...").type(TITLE_MODEL_1);
    });
});

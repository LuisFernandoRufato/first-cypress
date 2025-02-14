/// <reference types="Cypress"/>

describe('Teste E2E - Realizando a compra de produtos', () => {
    it('Fluxo da compra de produtos', () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get('[data-test="username"]').type("standard_user")
        cy.get('[data-test="password"]').type("secret_sauce")
        cy.get('[data-test="login-button"]').click()

        // Ordenação de produtos de menor para maior valor:
        cy.get('[data-test="product-sort-container"]').select('Price (low to high)')

        // Validação da ordenação desses produtos:
        cy.get(':nth-child(1) > [data-test="inventory-item-description"]').should('contain','Sauce Labs Onesie')
        cy.get(':nth-child(2) > [data-test="inventory-item-description"]').should('contain','Sauce Labs Bike Light')
        cy.get(':nth-child(3) > [data-test="inventory-item-description"]').should('contain','Sauce Labs Bolt T-Shirt')

        // Adicionando produtos ao carrinho:
        cy.contains('Sauce Labs Onesie').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        cy.contains('Sauce Labs Bike Ligh').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        cy.contains('Sauce Labs Bolt T-Shirt').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        // Checagem de produtos adicionados ao carrinho:
        cy.get('[data-test="shopping-cart-link"]').should('have.text','3')

        // Check no carrinho:
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="cart-list"] > :nth-child(3)').should('contain','Sauce Labs Onesie')
        cy.get('[data-test="cart-list"] > :nth-child(4)').should('contain','Sauce Labs Bike Light')
        cy.get('[data-test="cart-list"] > :nth-child(5)').should('contain','Sauce Labs Bolt T-Shirt')

        // Checkout:
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Teste Primeiro Nome')
        cy.get('[data-test="lastName"]').type('Teste Sobrenome')
        cy.get('[data-test="postalCode"]').type('123456789')
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="finish"]').click()        
    });
});
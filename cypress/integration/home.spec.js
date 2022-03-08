/// <reference types="Cypress" />
import {URL_TEST} from '../fixtures/constants'

describe('Products', () => {
    it('Fetch all products', () => {
        cy.visit("/")
        cy.request('GET', URL_TEST + 'products', {})
            .then((r) => {
                cy.get('[data-test-id="product"]').should("have.length", r.body.length)
            })
    })
    it('Fetch all categories', () => {
        cy.request('GET', URL_TEST +'categories', {})
            .then((r) => {
                cy.get('[data-test-id="category"]').should("have.length", r.body.length)
            })
    })
})
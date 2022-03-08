/// <reference types="Cypress" />

const { URL_TEST } = require("../fixtures/constants")

describe('register', () => {
    beforeEach(() => {
        cy.request('POST',URL_TEST + 'users/deletetestuser', {email: 'userTestRegister@test.com'})
            .then((r) => {
                expect(r.status).to.eq(200)
            })
    })
    it('Register user', () => {
        cy.visit('/auth/register')
        cy.get('#nombre').type('userTestRegister')
        cy.get('#documento').type('1234567')
        cy.get('#email').type('userTestRegister@test.com')
        cy.get('#cp').type('1234')
        cy.get('#password').type('test1234')
        cy.get('#localidad').type('userTestRegister')
        cy.get('#telefono').type('1234567')
        cy.get('#direccion').type('userTestRegister')
        cy.get('button[type="submit"]').contains('Registrarse').click()
        cy.contains('¡Registro exitoso!')
    })
})
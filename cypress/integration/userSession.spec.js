/// <reference types="Cypress" />

describe('User session', () => {
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('refreshToken')
    })
    it('Login', () => {
        cy.visit('/auth/login');
        cy.get('input[type="email"]').type('test@test.com')
        cy.get('input[type="password"]').type('test123')
        cy.get('button[type="submit"]').click()
        cy.location('pathname').should('eq', '/');
    })

    it('My favorites', () => {
        cy.wait(2000)
        cy.get('[alt="Add to favorites"]').click()
        cy.contains('Mi cuenta').click()
        cy.contains('Mis Favoritos').click()
        cy.contains('test1')
        cy.contains('+').click()
    })
    
    it('Mis datos', () => {
        cy.visit('/')
        cy.contains('Mi cuenta').click()
        cy.contains('Mis datos').click()
        cy.contains('Nombre y Apellido:')
        cy.contains('test@test.com')
        cy.contains('Modificar datos').click()
        cy.get('input[name="phone"]').clear().type('123456789')
        cy.contains('Guardar datos').click()
        cy.contains('123456789')
    })
    it('Cambiar contraseña', () => {
        cy.contains('Cambiar contraseña').click()
        cy.get('input[name="actualPassword"]').type('test123')
        cy.get('input[name="newPassword"]').type('test12345')
        cy.get('input[name="repeatNewPassword"]').type('test12345')
        cy.contains('Guardar nueva contraseña').click()
        cy.visit('/')
        cy.contains('Mi cuenta').click()
        cy.contains('Cerrar sesión').click()
    })
    it('Login con nueva contraseña', () => {
        cy.visit('/auth/login');
        cy.get('input[type="email"]').type('test@test.com')
        cy.get('input[type="password"]').type('test12345')
        cy.get('button[type="submit"]').click()
        cy.visit('/')
        cy.wait(2000)
        cy.contains('Mi cuenta').click()
        cy.contains('Mis datos').click()
        cy.contains('Cambiar contraseña').click()
        cy.get('input[name="actualPassword"]').type('test12345')
        cy.get('input[name="newPassword"]').type('test123')
        cy.get('input[name="repeatNewPassword"]').type('test123')
        cy.contains('Guardar nueva contraseña').click()
    })
    it('Mi carrito', () => {
        cy.visit('/')
        cy.get('.image').click()
        cy.contains('Agregar al carrito').click()
        cy.visit('/')
        cy.get('[alt="Cart"]').click()
        cy.contains('+').click()
    })
    it('Cerrar sessión', () => {
        cy.visit('/')
        cy.contains('Mi cuenta').click()
        cy.contains('Cerrar sesión').click()
        cy.contains('Registro')
    })
})
/// <reference types="Cypress" />
import {URL_TEST} from '../fixtures/constants'

Cypress.Commands.add('loginByFacebook', (
    status = 'connected'
  ) => {
    return cy.window().then((win) => {
      const callbackResult = {
        ...status === 'connected' && {
          status: 'connected',
          authResponse: {
            accessToken: 'test_fbAccessToken',
          },
        },
        ...status === 'not_authorized' && {
          status: 'not_authorized',
        },
        ...status === 'unknown' && {
          status: 'unknown',
        },
      };
  
      if (!win.FB) {
        return;
      }
  
      win.FB = {
        ...win.FB,
        login: (callback) => {
          callback(callbackResult);
        },
      }
    });
  });

describe('fb social login', () => {
    it('should be able to login with fb', () => {
      cy.visit('/auth/login');
      cy.intercept(URL_TEST + 'users/login/facebookAuth',{
          favorites: [],
          cart: [],
          token: 'testToken',
          isAdmin: false
      })
      return cy.loginByFacebook().then(() => {
        cy.get('.kep-login-facebook')
          .should('be.enabled')
          .click();
        cy.location('pathname').should('eq', '/');
      });
    });
  
    it('should fail to login with fb', () => {
        cy.visit('/auth/login');
  
      return cy.loginByFacebook('not_authorized').then(() => {
        cy.get('.kep-login-facebook')
          .should('be.enabled')
          .click();
        cy.location('pathname').should('eq', '/auth/login');
      });
    });
  });
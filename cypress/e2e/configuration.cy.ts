import { Configuration } from '../../src/app/models/configuration';

const mockConfig: Pick<
  Configuration,
  'name' | 'mac_destination' | 'mac_source'
> = {
  name: 'Test name',
  mac_source: ['11:22:33:44:55:66'],
  mac_destination: ['66:55:44:33:22:11'],
};

describe('Configuration Page', () => {
  beforeEach(() => {
    cy.visit('/configuration');
  });

  describe('View mode', () => {
    it('should load the configuration page', () => {
      cy.contains('div', 'Analyzer configuration').should('exist');
    });

    it('should enable choosing configuration profile', () => {
      cy.get('mat-form-field').should('exist');
      cy.get('mat-label').contains('Configuration').should('exist');
      cy.get('mat-select').should('exist');
    });

    it('should display configuration data', () => {
      cy.get('.configuration-section').should('be.visible').and('not.be.empty');
    });

    it('should display specific configuration properties', () => {
      cy.contains('.configuration-section__title', 'MAC address').should(
        'be.visible'
      );
      cy.contains('.configuration-section__title', 'Frame sizes').should(
        'be.visible'
      );
      cy.contains('.configuration-section__title', 'Protocols').should(
        'be.visible'
      );
    });

    it('should show button for creating new configuration', () => {
      cy.contains('button', 'New profile').should('exist');
    });
  });

  describe('Create profile', () => {
    beforeEach(() => {
      cy.get('button').contains('New profile').should('be.visible').click();
    });

    it('should hide create button', () => {
      cy.contains('button', 'New profile').should('not.exist');
    });

    it('should show action buttons', () => {
      cy.get('button').contains('Cancel').should('be.visible');
      cy.get('button').contains('Save').should('be.visible');
    });

    it('should create profile', () => {
      cy.get('mat-form-field')
        .contains('Configuration name')
        .click()
        .type(mockConfig.name);

      for (const mac of mockConfig.mac_source) {
        cy.get('mat-form-field')
          .contains('Source')
          .click()
          .type(mac)
          .type('{enter}');
      }

      for (const mac of mockConfig.mac_destination) {
        cy.get('mat-form-field')
          .contains('Destination')
          .click()
          .type(mac)
          .type('{enter}');
      }

      cy.get('mat-form-field')
        .contains('Add size range')
        .scrollIntoView()
        .parent()
        .click();
      cy.get('body').type('{downArrow}{downArrow}{enter}');

      cy.get('mat-form-field')
        .contains('Add protocol')
        .scrollIntoView()
        .parent()
        .click({ force: true });

      cy.get('body').type('{downArrow}{enter}');

      cy.get('button').contains('Save').click().wait(500);

      cy.contains('mat-select', mockConfig.name).should('exist');
      cy.get('button').contains('Delete').should('be.visible');
      cy.get('button').contains('Apply').should('be.visible');
      cy.get('button').contains('Edit').should('be.visible');
    });
  });

  describe('Action buttons', () => {
    beforeEach(() => {
      // Select not applied profile
      cy.wait(500);
      cy.get('mat-select').should('exist').click();
      cy.get('body').type('{downArrow}{downArrow}{enter}');
    });

    it('should display action buttons', () => {
      cy.get('button').contains('Delete').should('be.visible');
      cy.get('button').contains('Apply').should('be.visible');
      cy.get('button').contains('Edit').should('be.visible');
    });

    it('should delete configuration', () => {
      cy.get('button').contains('Delete').click();
      cy.wait(500);

      // should enable default config
      cy.get('button').contains('Delete').should('not.exist');
      cy.get('button').contains('Apply').should('not.exist');
      cy.get('button').contains('Edit').should('be.visible');
    });

    it('should show filled form in edit mode', () => {
      cy.get('button').contains('Edit').click();

      cy.get('.configuration-form__header input')
        .invoke('val')
        .then(val => {
          expect(val).to.equal(mockConfig.name);
        });

      cy.get('.configuration-section').should(
        'not.contain.text',
        'All addresses'
      );

      cy.get('.configuration-section').should('not.contain.text', 'All sizes');

      cy.get('.configuration-section').should('not.contain.text', 'None');
    });
  });
});

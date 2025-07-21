// https://on.cypress.io/api
const newEventName = 'Test ' + Date.now()
const updatedEventName = 'Updated ' + Date.now()

describe('Home View - Events Management', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the home view and show events list or empty state', () => {
    cy.get('#home-view').should('exist')
    cy.contains('Events')
  })

  it('should open and close the create event modal', () => {
    cy.get('#events-add-new-event').click()

    cy.contains('New Event').should('exist') // Modal header
    cy.get('#modal-cancel-button').should('exist')
    cy.get('#modal-cancel-button').click()
    cy.contains('New Event').should('not.exist')
  })

  it('should create a new event', () => {
    cy.intercept('POST', '**/v1/api/events').as('createEvent')

    cy.get('#events-add-new-event').click()
    cy.get('#name').type(newEventName)
    cy.get('#description').type('Test Description')
    cy.get('#priority').clear()
    cy.get('#priority').type('3')
    cy.get('#type').select('app')

    cy.get('#modal-save-button').click()
    cy.wait('@createEvent')

    cy.contains('New Event').should('not.exist')

    // check that the event was created
    cy.contains(newEventName).should('exist')
  })

  it('should select and open an existing event', () => {
    cy.get('tbody tr').last().contains(newEventName).should('exist')
    cy.get('tbody tr').last().click()

    cy.contains('Edit Event').should('exist')
  })

  it('should update an event', () => {
    cy.intercept('PATCH', '**/v1/api/events/*').as('updateEvent')
    debugger

    cy.get('tbody tr').last().contains(newEventName).should('exist')
    cy.get('tbody tr').last().click()
    cy.get('#name').clear()
    cy.get('#name').type(updatedEventName)
    cy.get('#modal-save-button').click()

    cy.wait('@updateEvent')
    cy.contains('Edit Event').should('not.exist')

    // check that the event was updated
    cy.contains(updatedEventName).should('exist')
    cy.contains(newEventName).should('not.exist')
  })

  it('should delete an event with confirmation', () => {
    cy.intercept('DELETE', '**/v1/api/events/*').as('deleteEvent')

    // Stub confirm dialog
    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(true)
    })

    // get tbody tr where we have created and updated event

    cy.get('tbody tr').last().contains(updatedEventName).should('exist')
    cy.get('tbody tr').last().click()
    cy.get('#modal-delete-button').click()

    cy.wait('@deleteEvent')
    cy.contains('Edit Event').should('not.exist')
  })
})

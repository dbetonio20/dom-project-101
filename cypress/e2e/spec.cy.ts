describe('Search functionality', () => {
  beforeEach(() => {
    // Assuming your application is hosted on localhost:3000
    cy.visit('http://localhost:4200');
  });

  // it('should search for words', () => {
  //   const searchTerm = 'example';

  //   // Type into the search input
  //   cy.get('input[type="search"]').type(searchTerm);

  //   // Click the Search button
  //   cy.get('button:contains("Search")').click();

  //   // You can add assertions here to check the result of the search
  //   // For example, assert that the search results are displayed correctly
  //   cy.get('.search-results').should('contain', searchTerm);
  // });

  it('should click the Random button', () => {
    // Click the Random button
    cy.get('button:contains("Random")').click();
    cy.wait(1000);
    cy.contains('Hear It:')
    cy.get('button:contains("Hello")').click();
    // You can add assertions here to check the behavior after clicking the Random button
    // For example, assert that the loading spinner is displayed
  });

  it('should search for words', () => {
    const searchTerm = 'example,car,war,art,far';

    // Type into the search input
    cy.get('input[type="search"]').type(searchTerm);
    cy.get('button:contains("Search")').click();
    cy.wait(1000);
    cy.contains('Hear It:')
    cy.get('button:contains("Hello")').click();

    cy.get('button:contains("Hello")').click();

    // Access the global window object
    cy.window().then((win) => {
      // Check if SpeechSynthesis is available in the browser
      if ('speechSynthesis' in win) {
        // Check if there are voices available
        const voices = win.speechSynthesis.getVoices();
        if (voices.length > 0) {
          // SpeechSynthesis is working
          cy.log('SpeechSynthesis is working.');
        } else {
          // No voices available, SpeechSynthesis might not be fully supported
          cy.log('SpeechSynthesis is not fully supported.');
        }
      } else {
        // SpeechSynthesis is not supported
        cy.log('SpeechSynthesis is not supported.');
      }
    });

  })

});

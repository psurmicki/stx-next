/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */
describe('Integration tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  });

  it('has a book title input', () => {
    cy.get('#FindBookForm-Form')
      .find('input#FindBookForm-Input-BookTitle')
      .should('have.attr', 'placeholder', 'Enter a book title...');
  });

  it('has subject input', () => {
    cy.get('#FindBookForm-Form')
      .find('input#FindBookForm-Input-Subject')
      .should('have.attr', 'placeholder', 'Enter subject...');
  });

  it('has author name input', () => {
    cy.get('#FindBookForm-Form')
      .find('input#FindBookForm-Input-AuthorName')
      .should('have.attr', 'placeholder', 'Enter author name...');
  });

  it('has select language select', () => {
    cy.get('#FindBookForm-Select-Language')
      .should('have.length', 1);
  });

  it('should get data from API via book title', () => {
    cy.request('https://www.googleapis.com/books/v1/volumes?q=Potop&maxResults=10&startIndex=0&key=AIzaSyCpVyXQfzzvrymmeAp2vcxD3GRVyZLXeok')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.items).to.have.length(10);
        expect(response.body.items[0].volumeInfo.title).to.contain('Potop');
        expect(response.body.items[3].volumeInfo.title).to.contain('Potop');
        expect(response.body.items[5].volumeInfo.title).to.contain('Potop');
        expect(response.body.items[8].volumeInfo.title).to.contain('Potop');
      })
  });

  it('should get data from API via subject', () => {
    cy.request('https://www.googleapis.com/books/v1/volumes?q="Medicine"&maxResults=10&startIndex=0&key=AIzaSyCpVyXQfzzvrymmeAp2vcxD3GRVyZLXeok')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.items).to.have.length(10);
        expect(response.body.items[0].volumeInfo.categories).to.contain('Medical');
        expect(response.body.items[4].volumeInfo.categories).to.contain('Medical');
        expect(response.body.items[8].volumeInfo.categories).to.contain('Medical');
      })
  });

  it('should get data from API via language', () => {
    cy.request('https://www.googleapis.com/books/v1/volumes?q=%22pl%22&maxResults=10&startIndex=0&key=AIzaSyCpVyXQfzzvrymmeAp2vcxD3GRVyZLXeok')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.items).to.have.length(10);
        expect(response.body.items[1].volumeInfo.language).to.contain('pl');
        expect(response.body.items[4].volumeInfo.language).to.contain('pl');
        expect(response.body.items[5].volumeInfo.language).to.contain('pl');
        expect(response.body.items[9].volumeInfo.language).to.contain('pl');
      })
  });

  it('should get data from API with all parameters', () => {
    cy.request('https://www.googleapis.com/books/v1/volumes?q=intitle:%22DNA%22+subject:%22Medical%22+%24inauthor:%22McCabe%22+en&key=AIzaSyCpVyXQfzzvrymmeAp2vcxD3GRVyZLXeok')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.items).to.have.length(1);
        expect(response.body.items[0].volumeInfo.title).to.contain('DNA');
        expect(response.body.items[0].volumeInfo.categories).to.contain('Medical');
        expect(response.body.items[0].volumeInfo.authors[0]).to.contain('McCabe');
        expect(response.body.items[0].volumeInfo.language).to.contain('en');
      })
  });

  it('should get data by book title via title input', () => {
    cy.get('#FindBookForm-Form')
      .find('#FindBookForm-Input-BookTitle')
      .type('Stary człowiek i morze');
    cy.get('#FindBookForm-Submit-Button').click();
    cy.get('#BookCard-Container').should('have.length', 1);
    cy.get('#BookCard-Container')
      .eq(0)
      .find('.BookCard-Row > .BookCard-Header > div > h2 > i > b').contains("Stary człowiek i morze");
  });

  it('should get data by subject via subject input', () => {
    cy.get('#FindBookForm-Form')
      .find('#FindBookForm-Input-Subject')
      .type('Medicine');
    cy.get('#FindBookForm-Submit-Button').click();
    cy.get('.BookContainer-Column')
      .eq(2)
      .find('div > #BookCard-Container')
      .should('have.length', 10);
    cy.get('#BookCard-Container')
      .eq(0)
      .find('.BookCard-Row > .BookCard-Header > div > h2 > i > b').contains("Gross Anatomy");
  });

  it('should get data by author via author name input', () => {
    cy.get('#FindBookForm-Form')
      .find('#FindBookForm-Input-AuthorName')
      .type('Joseph Conrad');
    cy.get('#FindBookForm-Submit-Button').click();
    cy.get('.BookContainer-Column')
      .eq(2)
      .find('div > #BookCard-Container')
      .should('have.length', 10);
    cy.get('#BookCard-Container')
      .eq(0)
      .find('.BookCard-Row > .BookCard-Header > div > h2 > i > b').contains("Placówka postępu");
  });

  it('should get data by language via language select', () => {
    cy.get('#FindBookForm-Form')
      .find('#FindBookForm-Select-Language')
      .click();
    cy.get('#react-select-FindBookForm-Select-Language-option-13')
      .click();
    cy.get('#FindBookForm-Submit-Button').click();
    cy.get('.BookContainer-Column')
      .eq(2)
      .find('div > #BookCard-Container')
      .should('have.length', 10);
    cy.get('#col-d1-9 > .BookCard-Container > .BookCard-Row > .BookCard-Header > div > h2 > i > b').contains("Web.de");
  });

  it('should get data with all parameters', () => {
    cy.get('#FindBookForm-Input-BookTitle')
      .type('DNA');
    cy.get('#FindBookForm-Input-AuthorName')
      .type('McCabe');
    cy.get('#FindBookForm-Input-Subject')
      .type('Medical');
    cy.get('#FindBookForm-Select-Language')
      .click();
    cy.get('#react-select-FindBookForm-Select-Language-option-10')
      .click();
    cy.get('#FindBookForm-Submit-Button').click();
    cy.get('.BookContainer-Column')
      .eq(2)
      .find('div > #BookCard-Container')
      .should('have.length', 1);
    cy.get('#BookCard-Container')
      .eq(0)
      .find('.BookCard-Row > .BookCard-Header > div > h2 > i > b').contains("DNA");
    cy.get('#BookCard-Container')
      .eq(0)
      .find('.BookCard-Row > .BookCard-Header > h3').contains("Medical");
  });

  it('should show noData component with wrong data', () => {
    cy.get('#FindBookForm-Form')
      .find('#FindBookForm-Input-Subject')
      .type('bladasadnad');
    cy.get('#FindBookForm-Submit-Button').click();
    cy.get('img').should('have.class', 'NoData-Image');
  });

  it('should check new search after searching with wrong data', () => {
    cy.get('#FindBookForm-Form')
      .find('#FindBookForm-Input-Subject')
      .type('bladasadnad');
    cy.get('#FindBookForm-Submit-Button').click();
    cy.get('#NoData-Button-NewSearch').click();
    cy.get('#FindBookForm-Input-BookTitle')
      .type('DNA');
    cy.get('#FindBookForm-Input-AuthorName')
      .type('McCabe');
    cy.get('#FindBookForm-Input-Subject')
      .type('Medical');
    cy.get('#FindBookForm-Select-Language')
      .click();
    cy.get('#react-select-FindBookForm-Select-Language-option-10')
      .click();
    cy.get('#FindBookForm-Submit-Button').click();
    cy.get('.BookContainer-Column')
      .eq(2)
      .find('div > #BookCard-Container')
      .should('have.length', 1);
    cy.get('#BookCard-Container')
      .eq(0)
      .find('.BookCard-Row > .BookCard-Header > div > h2 > i > b').contains("DNA");
    cy.get('#BookCard-Container')
      .eq(0)
      .find('.BookCard-Row > .BookCard-Header > h3').contains("Medical");
  });

  it('should find new data', () => {
    cy.get('#FindBookForm-Form')
      .find('#FindBookForm-Input-Subject')
      .type('Medicine');
    cy.get('#FindBookForm-Submit-Button').click();
    cy.get('.BookContainer-Column')
      .eq(2)
      .find('div > #BookCard-Container')
      .should('have.length', 10);
    cy.get('#BookCard-Container')
      .eq(0)
      .find('.BookCard-Row > .BookCard-Header > div > h2 > i > b').contains("Gross Anatomy");
    cy.get('#BookContainer-Button-NewSearch').click();
    cy.get('#FindBookForm-Input-BookTitle')
      .type('Stary człowiek i morze');
    cy.get('#FindBookForm-Submit-Button').click();
    cy.get('#BookCard-Container').should('have.length', 1);
    cy.get('#BookCard-Container')
      .eq(0)
      .find('.BookCard-Row > .BookCard-Header > div > h2 > i > b').contains("Stary człowiek i morze");
  });



})
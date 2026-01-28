/*
    PublicationsModel.js:
    ...tbd
*/

export class PublicationsModel {
  constructor() {
    this.publications = [];
  }

  async load() {
    const response = await fetch('/assets/db/publications.json');
    if(!response.ok) {
      throw new Error('There was an error reading the file!');
    }
    const json_publications = await response.json();
    // const raw_publications = json_publications[0]['scientific-articles']; -> Alternative for testing
    const raw_publications = json_publications['scientific-articles'];
    this.publications = Object.values(raw_publications);
  }

  getAll() {
    return this.publications;
  }
}

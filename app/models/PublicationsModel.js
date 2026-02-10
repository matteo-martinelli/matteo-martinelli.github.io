/*
    PublicationsModel.js:
    ...tbd
*/

export class PublicationsModel {
  constructor() {
    this.scientific_publications = [];
    this.university_thesis = [];
  }

  async load() {
    const response = await fetch('/data/db/publications.json');
    if(!response.ok) {
      throw new Error('There was an error reading the file!');
    }
    const json_publications = await response.json();
    const raw_publications = json_publications['scientific-articles'];
    const raw_thesis = json_publications['university-thesis'];
    this.scientific_publications = Object.values(raw_publications);
    this.university_thesis = Object.values(raw_thesis);
  }

  getAll() {
    return this.publications;
  }
}

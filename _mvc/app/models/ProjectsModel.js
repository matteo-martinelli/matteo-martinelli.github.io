export class ProjectsModel {
  constructor() {
    this.projects = [];
  }

  async load() {
    const response = await fetch('/_mvc/data/db/industrial-projects.json');
    console.log(response);
    if (!response.ok) {
      throw new Error('There was an error reading the file!');
    }
    const json_projects = await response.json();
    const raw_projects = json_projects[0];
    this.projects.push(raw_projects);
  }

  getAll() {
    return this.projects;
  }
}

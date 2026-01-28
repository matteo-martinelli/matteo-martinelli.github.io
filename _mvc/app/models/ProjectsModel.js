export class ProjectsModel {
  constructor() {
    this.projects = [];
  }

  async load() {
    const res = await fetch('/data/projects.json');
    this.projects = await res.json();
  }

  getAll() {
    return this.projects;
  }
}

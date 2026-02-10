export class ProjectsModel {
  constructor() {
    this.industrialProjects = [];
    this.scientificProjects = [];
  }

  async load() {
    this.loadIndustrialProjects();
    this.loadScientificProjects();
  }

  async loadIndustrialProjects(path='/data/db/industrial-projects.json') {
    const response = await fetch(path);
    console.log('Fetched response:', response);
    if (!response.ok) {
      throw new Error('There was an error reading the file!');
    }
    const json_projects = await response.json();
    console.log('Extracted response:', json_projects);
    const raw_projects = json_projects['industrial-projects'];
    // console.log('Industrial projects:', raw_projects);
    for (var elem in raw_projects) {
      this.industrialProjects.push(raw_projects[elem]);
    }
    // console.log(this.industrialProjects);
  }

  async loadScientificProjects(path='/data/db/scientific-projects.json') {
    const response = await fetch(path);
    console.log('Fetched response:', response);
    if (!response.ok) {
      throw new Error('There was an error reading the file!');
    }
    const json_projects = await response.json();
    console.log('Extracted response:', json_projects);
    const raw_projects = json_projects['scientific-projects'];
    // console.log('Scientific projects:', raw_projects);
    for (var elem in raw_projects) {
      this.scientificProjects.push(raw_projects[elem]);
    }
    // console.log(this.scientificProjects);
  }

  getAll() {
    return this.projects;
  }
}

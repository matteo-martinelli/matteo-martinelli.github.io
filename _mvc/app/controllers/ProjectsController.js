import { ProjectsModel } from '../models/ProjectsModel.js';
import { ProjectsView } from '../views/ProjectsView.js';

export class ProjectsController {
  constructor() {
    this.model = new ProjectsModel();
    this.view = new ProjectsView('#projects-list');
  }

  async init() {
    await this.model.load();
    this.view.renderList(this.model.getAll());
  }
}

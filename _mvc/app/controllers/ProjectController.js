import { ProjectModel } from '../models/projectModel.js';
import { ProjectView } from '../views/projectView.js';

export class ProjectController {
  constructor() {
    this.model = new ProjectModel();
    this.view = new ProjectView('#projects-list');
  }

  async init() {
    await this.model.load();
    this.view.renderList(this.model.getAll());
  }
}

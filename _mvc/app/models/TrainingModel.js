export class TrainingModel {
  constructor() {
    this.trainingProjects = [];
    this.totalHoursTaught = null;
    this.totalStudentsTaught = null;
  }

  async load() {
    await this.loadTrainingProjects();
    this.getTotalTaughtHours();
  }

// TODO: move DB links at the top of the page as constants
  async loadTrainingProjects(path='/_mvc/data/db/course-projects.json') {
    const response = await fetch(path);
    console.log('Fetched response:', response);
    if (!response.ok) {
      throw new Error('There was an error reading the file!');
    }
    const json_projects = await response.json();
    // console.log('Extracted response:', json_projects);
    const raw_projects = json_projects['course-projects'];
    // console.log('Training projects:', raw_projects);
    for (var elem in raw_projects) {
        // console.log('Adding elem', raw_projects[elem], 'to the array ...');
        this.trainingProjects.push(raw_projects[elem]);
        // console.log('Elem', raw_projects[elem], 'added!');
    }
    // console.log('Populated field:', this.trainingProjects);
  }

  getTotalTaughtHours() {
    var cumulated_hours = 0;
    for (var course in this.trainingProjects) {
        cumulated_hours = cumulated_hours + Number(this.trainingProjects[course].total_taught_hours.value);
    }
    return cumulated_hours;
  }

  getAllTrainingProjects() {
    return this.trainingProjects;
  }
}

export class TrainingModel {
  constructor() {
    this.trainingProjects = [];
    this.totalHoursTaught = null;
    this.totalStudentsTaught = null;
  }

  async load() {
    await this.loadTrainingProjects();
    this.totalHoursTaught = this.getTotalTaughtHours();
    this.totalStudentsTaught = this.getTotalTaughtStudents();
  }

  // TODO: move DB links at the top of the page as constants
  async loadTrainingProjects(path='/data/db/course-projects.json') {
    const response = await fetch(path);
    console.log('Fetched response:', response);
    if (!response.ok) {
      throw new Error('There was an error reading the file!');
    }
    const json_projects = await response.json();
    const raw_projects = json_projects['course-projects'];
    for (var elem in raw_projects) {
        this.trainingProjects.push(raw_projects[elem]);
    }
  }

  getTotalTaughtHours() {
    var cumulated_hours = 0;
    for (var course in this.trainingProjects) {
      cumulated_hours = cumulated_hours + Number(this.trainingProjects[course].total_taught_hours.value);
    }
    return cumulated_hours;
  }

  getTotalTaughtStudents() {
    var cumulated_students = 0;
    for (var course in this.trainingProjects) {
      for (var edition in this.trainingProjects[course]['editions']){
        cumulated_students = cumulated_students + Number(this.trainingProjects[course]['editions'][edition].participants_count);
      }
    }
    return cumulated_students;
  }

  getAllTrainingProjects() {
    return this.trainingProjects;
  }
}

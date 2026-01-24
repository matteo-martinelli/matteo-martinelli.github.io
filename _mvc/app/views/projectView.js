export class ProjectView {
  constructor(rootSelector) {
    this.root = document.querySelector(rootSelector);
  }

  renderList(projects) {
    this.root.innerHTML = projects
      .map(p => `<li>${p.title}</li>`)
      .join('');
  }
}

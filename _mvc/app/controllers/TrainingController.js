import { TrainingModel } from '../models/TrainingModel.js';
import { TrainingViewView } from '../views/TrainingView.js';

export class TrainingController {
  constructor(rootSelector, router) {
    // this.root = rootSelector;
    this.root = document.querySelector(rootSelector);
    this.view = new ProjectsView('#projects-list');
    this.model = new ProjectsModel();
    this.router = router;
    this.styleElement = null;
    console.log('Into Training Controller');
  }

  async init() {
    console.log('Training Controller init triggered');

    // Loading the page CSS
    this.styleElement = document.createElement('link');
    this.styleElement.rel = 'stylesheet';
    this.styleElement.href = '/_mvc/css/pages/training/training-style.css';
    document.head.appendChild(this.styleElement);

    // Loading page information
    // await this.model.load();
    
    // Injecting page content
    // this.root.innerHTML = this.view.getHtmlStructure();

    const headerContainer = document.querySelector('header');
    if (headerContainer) {
        console.log('Loading header ...');
        headerContainer.innerHTML = await this.view.getHtml('/_mvc/templates/pic-title-header.html');
        console.log('Header loaded.')
    }

    // Loading projects
    // this.view.renderIndustrialProjects(this.model.industrialProjects);
    // this.view.renderUniversityProjects(this.model.scientificProjects);

    const sec_separator = document.querySelector('#sections-separator-2');
    if (sec_separator) {
        console.log('Appending the footer ...');
        // footer_container.innerHTML = await this.view.getHtml('/_mvc/templates/low-page-call-to-action.html');
        sec_separator.insertAdjacentHTML('afterend', await this.view.getHtml('/_mvc/templates/low-page-call-to-action.html'));
        console.log('Footer appended.');
    }

    // Check if the navbar is disappeard during navigation
    const navbarContainer = document.querySelector('#landing-page-menu');
    if (navbarContainer && navbarContainer.getHTML() === "") {
        console.log('Navbar is empty, loading it ...');
        navbarContainer.innerHTML = await this.view.getHtml('/_mvc/templates/low-navbar.html');
        console.log('Navbar loaded.');
    }
  }

  destroyHeader() {
        const headerContainer = document.querySelector('header');

        if (headerContainer) {
            headerContainer.innerHTML = '';
        }
    }

    destroyFooter() {
        const footerContainer = document.querySelector('#layout-footer');
        
        if (footerContainer) {
            footerContainer.innerHTML = '';
        }
    }

    destroyStyle() {
        if (this.styleElement) {
            this.styleElement.remove();
            this.styleElement = null;
        }
    }

    destroy() {
        this.destroyHeader();
        this.destroyFooter();
        this.destroyStyle();
    }
}

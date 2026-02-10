/* 
PublicationsController.js: 
It acts as the orchestrator. 
In its init() method, it:
    - Asks the View for the HTML content.
    - Places that content into the main application root (#app).
    - Takes responsibility for updating any other parts of the page, like the header.
*/


import { PublicationsView } from "../views/PublicationsView.js";
import { PublicationsModel } from "../models/PublicationsModel.js";


export class PublicationsController {
    constructor(rootSelector, router) {
        // this.root = rootSelector;
        this.root = document.querySelector(rootSelector);
        this.view = new PublicationsView(rootSelector);
        this.model = new PublicationsModel();
        this.router = router;
        this.styleElement = null;
        console.log('Into Publications Controller');
    }
    
    async init() {
        console.log('Publications Controller init triggered');

        // Loading the page CSS
        this.styleElement = document.createElement('link');
        this.styleElement.rel = 'stylesheet';
        this.styleElement.href = '/css/pages/publications/publications-style.css';
        document.head.appendChild(this.styleElement);

        // Loading page information
        this.model.load();

        // Injecting page content
        this.root.innerHTML = this.view.getHtmlStructure();

        const headerContainer = document.querySelector('header');
        if (headerContainer) {
            console.log('Loading header ...');
            headerContainer.innerHTML = await this.view.getHtml('/templates/pic-title-header.html');
            console.log('Header loaded.')
        }

        // Loading publications
        this.view.renderScientificPublications(this.model.scientific_publications);
        this.view.renderUniversityPubsHtml(this.model.university_thesis);
        
        const sec_separator = document.querySelector('#sections-separator-2');
        // const footer_container = document.querySelector('#layout-footer');
        if (sec_separator) {
            console.log('Appending the footer ...');
            // footer_container.innerHTML = await this.view.getHtml('/templates/low-page-call-to-action.html');
            sec_separator.insertAdjacentHTML('afterend', await this.view.getHtml('/templates/low-page-call-to-action.html'));
            console.log('Footer appended.');
        }
        
        // Check if the navbar is disappeard during navigation
        const navbarContainer = document.querySelector('#landing-page-menu');
        if (navbarContainer && navbarContainer.getHTML() === "") {
            console.log('Navbar is empty, loading it ...');
            navbarContainer.innerHTML = await this.view.getHtml('/templates/low-navbar.html');
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

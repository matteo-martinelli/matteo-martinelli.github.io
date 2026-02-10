/* 
BiographyController.js: 
It acts as the orchestrator. 
In its init() method, it:
    - Asks the View for the HTML content.
    - Places that content into the main application root (#app).
    - Takes responsibility for updating any other parts of the page, like the header.
*/


import { BiographyView } from "../views/BiographyView.js";

export class BiographyController {
    constructor(rootSelector, router) {
        // this.root = rootSelector;
        this.root = document.querySelector(rootSelector);
        this.view = new BiographyView(rootSelector);
        this.router = router;
        this.styleElement = null; 
        // console.log('Into Bio Controller');
    }
    
    async init() {
        // TODO: add on top of the content a brief summary with some numbers in it.
        console.log('Bio Controller init triggered');
        
        // Loading the page CSS
        this.styleElement = document.createElement('link');
        this.styleElement.rel = 'stylesheet';
        this.styleElement.href = '/css/pages/biography/biography-style.css';
        document.head.appendChild(this.styleElement);

        // Injecting page content
        this.root.innerHTML = this.view.getHtmlParagraph();
        
        const headerContainer = document.querySelector('header');
        if (headerContainer) {
            headerContainer.innerHTML = await this.view.getHtml('/templates/pic-title-header.html');
        }

        // Check if the navbar is disappeard during navigation
        const navbarContainer = document.querySelector('#landing-page-menu');
        if (navbarContainer && navbarContainer.getHTML() === "") {
            // console.log('Navbar is empty, loading partial ...');
            navbarContainer.innerHTML = await this.view.getHtml('/templates/low-navbar.html')
            // console.log('Navbar after html insertion: ', navbarContainer);
        }
    }
    
    // TODO: call this method in init()
    async injectHtmlContent(selector, url) {
        const container = document.querySelector(selector);
        if (!container) return;

        const res = await fetch(url);
        const html = await res.text();
        container.innerHTML = html;
    }

    destroyStyle() {
        if (this.styleElement) {
            this.styleElement.remove();
            this.styleElement = null;
        }
    }

    destroyHeader() {
        const headerContainer = document.querySelector('header');

        if (headerContainer) {
            headerContainer.innerHTML = '';
        }
    }

    destroy() {
        this.destroyStyle();
        this.destroyHeader();
    }
}

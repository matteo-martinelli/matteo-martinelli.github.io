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
        this.model = new PublicationsModel()
        this.router = router;
        this.styleElement = null;
        console.log('Into Publications Controller');
    }
    
    async init() {
        console.log('Bio Controller init triggered');

        // Loading the page CSS
        this.styleElement = document.createElement('link');
        this.styleElement.rel = 'stylesheet';
        this.styleElement.href = '/assets/css/pages/publications/publications-style.css';
        document.head.appendChild(this.styleElement);

        const styles = document.head.getElementsByTagName('href');
        console.log('styles href: ', styles);

        // Loading page information
        this.model.load();
        console.log(this.model.publications);

        // Injecting page content
        this.root.innerHTML = this.view.getHtml();

        // const headerContainer = document.getElementById('header');
        // if (headerContainer) {
        //     const res = await fetch('/_mvc/templates/pic-title-header.html');
        //     const html = await res.text();
        //     headerContainer.innerHTML = html;
        // }

        const bodyContainer = document.getElementsByTagName('body');
        if (bodyContainer) {
            const res = await fetch('/_mvc/templates/pic-title-header.html');
            const html = await res.text();
            bodyContainer.innerHTML = html;
        }

        this.view.getPopulatedHtml(this.model.publications);

        // Check if the navbar is disappeard during navigation
        const navbarContainer = document.getElementById('layout-navbar');
        if (navbarContainer && navbarContainer.getHTML() === "") {
            console.log('Navbar is empty, loading partial ...');
            const res = await fetch('/_mvc/templates/low-navbar.html');
            const navbarHTML = await res.text();
            navbarContainer.innerHTML = navbarHTML;
            console.log('Navbar after html insertion: ', navbarContainer);
        }
    }



    destroy() {
        // Destroy style
        if (this.styleElement) {
            this.styleElement.remove();
            this.styleElement = null;
        }

        const headerContainer = document.getElementById('header');

        if (headerContainer) {
            headerContainer.innerHTML = '';
        }
    }
}

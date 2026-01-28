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
        console.log('Bio Controller init triggered');
        
        // Loading the page CSS
        this.styleElement = document.createElement('link');
        this.styleElement.rel = 'stylesheet';
        this.styleElement.href = '/assets/css/pages/biography/biography-style.css';
        document.head.appendChild(this.styleElement);

        // Injecting page content
        this.root.innerHTML = this.view.getHtml();

        const headerContainer = document.querySelector('header');
        if (headerContainer) {
            const res = await fetch('/_mvc/templates/pic-title-header.html');
            const html = await res.text();
            headerContainer.innerHTML = html;
        }

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
    
    // handleHomeMouseClick(event) {
    //     // TODO: call here the router in the next iteration
    //     alert("Ciao!");
    //     console.log(event);
    //     console.log('A click occured!');
    //     event.preventDefault();
    // }

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

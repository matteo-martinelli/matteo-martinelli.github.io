/* (BiographyController.js): 
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
        this.router = router;
        this.styleElement = null; 
        this.view = new BiographyView(rootSelector);
        console.log('Into Bio Controller');
    }
    
    async init() {
        // Loading the page CSS
        this.styleElement = document.createElement('link');
        this.styleElement.rel = 'stylesheet';
        this.styleElement.href = '/assets/css/pages/biography/biography-style.css';
        document.head.appendChild(this.styleElement);

        // Injecting page content
        this.root.innerHTML = this.view.getHtml();

        const headerContainer = document.getElementById('header');
        if (headerContainer) {
            const res = await fetch('/_mvc/templates/pic-title-header.html');
            const html = await res.text();
            headerContainer.innerHTML = html;
        }
    }
    
    handleHomeMouseClick(event) {
        // TODO: call here the router in the next iteration
        alert("Ciao!");
        console.log(event);
        console.log('A click occured!');
        event.preventDefault();
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

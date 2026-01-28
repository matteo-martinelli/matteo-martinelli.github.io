import { HomeView } from "../views/HomeView.js";

export class HomeController {
    constructor(rootSelector, router) {
        this.view = new HomeView(rootSelector);
        this.router = router;
        this.styleElement = null;
        console.log('Into Home Controller')
    }
    
    async init() {
        await Promise.all([
            // this.view.renderWelcome();
            this.view.render(),
            this.view.includePartial('#layout-navbar', '/_mvc/templates/low-navbar.html'),
        ]);

        // Loading the page CSS
        this.styleElement = document.createElement('link');
        this.styleElement.rel = 'stylesheet';
        this.styleElement.href = '/assets/css/pages/index-style.css';
        document.head.appendChild(this.styleElement);
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

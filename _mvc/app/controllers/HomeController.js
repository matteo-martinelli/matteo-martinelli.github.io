import { HomeView } from "../views/HomeView.js";

export class HomeController {
    constructor(rootSelector, router) {
        this.view = new HomeView(rootSelector);
        this.router = router;
        this.styleElement = null;
        console.log('Into Home Controller')
    }
    
    async init() {
        // Loading the page CSS
        this.styleElement = document.createElement('link');
        this.styleElement.rel = 'stylesheet';
        this.styleElement.href = '/_mvc/css/pages/index-style.css';
        document.head.appendChild(this.styleElement);
        
        // Getting the content and injecting it
        const appContainer = document.querySelector('#app');
        if (appContainer) {
            appContainer.innerHTML = await this.view.getHtml('/_mvc/templates/home-top-content.html');  
            appContainer.insertAdjacentHTML('afterend', await this.view.getHtml('/_mvc/templates/spacer.html'));  
        }
        
        // const layoutNavbarContainer = document.querySelector('#layout-navbar');
        const layoutNavbarContainer = document.querySelector('#landing-page-menu');
        if (layoutNavbarContainer) {
            layoutNavbarContainer.innerHTML = await this.view.getHtml('/_mvc/templates/low-navbar.html');
        }
    }

    destroyHeader() {
        const headerContainer = document.getElementById('header');

        if (headerContainer) {
            headerContainer.innerHTML = '';
        }
    }

    destroySpacer() {
        const spacerContainer = document.getElementsByClassName('spacer');
        
        if (spacerContainer) {
            spacerContainer[0].remove();
        }
    }

    destroyStyle() {
        if (this.styleElement) {
            this.styleElement.remove();
            this.styleElement = null;
        }
    }

    destroy() {
        this.destroyStyle();
        this.destroyHeader();
        this.destroySpacer();
    }
}

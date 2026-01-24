import { routes } from './routes.js';

export class Router {
    constructor(rootSelector) {
        this.root = document.querySelector(rootSelector);
        this.rootSelector = rootSelector;
        this.currentController = null;
    }

    init() {
        console.log('Into Router init');
        // Initilize the route based on the current URL
        // this.handleRoute(window.location.pathname);

        // back/forward in the browser
        window.addEventListener('popstate', () => {
            this.handleRoute(window.location.pathname, {push: false});
        });

        // delegation of clicks on links <a data-link>...</a>
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a[data-link]');
            if (!link) return; 

            event.preventDefault();
            const href = link.getAttribute('href');
            this.navigate(href);
        });
    }

    navigate(path) {
        history.pushState({}, '', path);
        this.handleRoute(path);
    }

    handleRoute(path) {
        // this.currentController = new Controller(this.root, this);
        // this.currentController.init();
        if (window.location.pathname === path && this.currentController) {
            console.log('Already in ', path);
            return;
        }

        console.log('Looking for Route match from path ', path);
        const match = routes.find(r => r.path === path) || routes[0]; // fallback to home
        console.log('Found match as ', match);
        
        const Controller = match.controller;

        // Deconstruct eventual previous controller
        if (this.currentController?.destroy) {
            this.currentController.destroy();
        }

        // Clean the content
        this.root.innerHTML = '';

        // Instantiate and initialize the new controller
        console.log('Instantiating new Controller from Router');
        this.currentController = new Controller(this.rootSelector, this);
        console.log('Controller ', this.currentController, 'instantiated from Router');
    
    }
}
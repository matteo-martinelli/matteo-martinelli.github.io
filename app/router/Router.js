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
        // this.handleRoute(window.location.pathname); // Gets the current URL and calls handleRoute
        this.handleRoute(window.location.hash.slice(1) || '/index'); // Gets the current URL and calls handleRoute

        // back/forward in the browser: when the forward/backward browser commands are pushed, the
        // popstate event is fired. In this case, the Router navigates in the page got from the 
        // event.
        // window.addEventListener('popstate', (event) => {
        //     console.log('popstate fired');
        //     console.log('event.state:', event.state); // The state object from pushState
        //     console.log('window.location.pathname:', window.location.pathname)
               // If event.state is given, then the associated path is used for navigation; 
               // Otherwise, the actual path stored and popped by the browser is used
        //     const path = event.state?.path || window.location.pathname;
        //     this.handleRoute(path);
        // });

        // Listen for hash changes (browser back/forward)
        window.addEventListener('hashchange', () => {
            const path = window.location.hash.slice(1);
            this.handleRoute(path);
        })

        // TODO: move the click-listeners to specific pages, expection made for the global website navigation
        // Delegation of clicks on links <a data-link>...</a> and others: here is added a listener to all clicks performed
        // in the page. It listens to click for navigation. It is possible to move this centralized approach to 
        // single Controllers in case of more granular-custom behaviour.
        document.addEventListener('click', (event) => {
            // Handling the contact button click globally
            const contactButton = event.target.closest('#contacts-page');
            if (contactButton) {
                event.preventDefault();
                alert('Write me at mmartinelli@ik.me!');
                return;
            }

            // Getting the link element
            const link = event.target.closest('a[data-link]');
            // Checking its content; handled only if the event comes from a nav-bar button
            if (!link) return;
            if (link.getAttribute('class') === 'menu-button') {
                event.preventDefault();
                const href = link.getAttribute('href');
                console.log('Handling the click event. Navigating to ', href);
                this.navigate(href);
            } 
            else {
                console.log('Click event from an element from a menu-button; handling skipped.')
            }
        });
    }

    navigate(path) {
        // When navigating from a link in the webpage, a new entry is added in the browser history
        // history.pushState({ path }, '', path);
        // this.handleRoute(path);
        // setting the hash automatically triggers the 'hashchange' event defined in the init()
        window.location.hash = path;
    }

    handleRoute(path) {
        // Given the path, looks for the route in the routing table; 
        // when found, instantiates the correct Controller; if not, fallbacks to home. 
        console.log('Looking for Route match from path ', path);
        const match = routes.find(r => r.path === path) || routes[0]; // fallback to home
        const Controller = match.controller;
        console.log('Found match as ', match);
        
        // Deconstructs the eventual actual controller
        if (this.currentController?.destroy) {
            this.currentController.destroy();
            console.log('Destroyed style of ', this.currentController);
        }

        // Cleans the content
        this.root.innerHTML = '';

        // Instantiate and initialize the new Controller given the current location
        console.log('Instantiating new Controller from Router');
        this.currentController = new Controller('#app', this);
        if (this.currentController) {       // Controller initialization
            this.currentController.init();
        }
        console.log('Controller ', this.currentController, 'instantiated from Router');
    }
}
import { HomeView } from "../views/HomeView.js";

export class HomeController {
    constructor(rootSelector, router) {
        this.view = new HomeView(rootSelector);
        this.router = router;
        this.init();
        console.log('Into Home Controller')
    }
    
    async init() {
        await Promise.all([
            // this.view.renderWelcome();
            this.view.includePartial('body', '/_mvc/templates/low-navbar.html'),
            this.view.includePartial('body', '/_mvc/templates/home-top-content.html'),
            this.view.includePartial('body', '/_mvc/templates/spacer.html')
        ]);
        
        const navToBioButton = document.getElementById('bio-page');
        if (navToBioButton) {
            navToBioButton.addEventListener('click', (event) => {
                this.handleHomeMouseClick(event);
            })
        }
        // navToBioButton.addEventListener('click', this.handleHomeMouseClick());
        // document.addEventListener('click', this.handleHomeMouseClick());
    }

    handleHomeMouseClick(event) {
        // TODO: call here the router in the next iteration
        alert("Hi! Moving to Bio");
        console.log(event);
        console.log('A click occured!');
        // TODO: handle here somehow a[data-link]
        this.router.navigate('/_mvc/bio.html');
    }
}

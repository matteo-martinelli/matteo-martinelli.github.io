import { HomeView } from "../views/HomeView.js";

export class HomeController {
    constructor(rootSelector, router) {
        this.view = new HomeView(rootSelector);
        this.router = router;
        console.log('Into Home Controller')
    }
    
    async init() {
        await Promise.all([
            // this.view.renderWelcome();
            this.view.render(),
            this.view.includePartial('#layout-navbar', '/_mvc/templates/low-navbar.html'),
        ]);
    }

}

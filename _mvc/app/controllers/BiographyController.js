import { BiographyView } from "../views/BiographyView.js";

export class BiographyController {
    constructor(rootSelector, router) {
        this.root = rootSelector;
        this.router = router;
        this.view = new BiographyView('body');
        this.init();
        console.log('Into Bio Controller');
    }
    
    async init() {
        await Promise.all([
            this.view.renderWelcome(),
            this.view.includePartial('body', '/_mvc/templates/low-navbar.html'),
            this.view.includePartial('body', '/_mvc/templates/spacer.html')
        ]);
        // this.view.render();
    }

    handleHomeMouseClick(event) {
        // TODO: call here the router in the next iteration
        alert("Ciao!");
        console.log(event);
        console.log('A click occured!');
    }
}

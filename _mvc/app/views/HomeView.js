export class HomeView {
    constructor(rootSelector) {
        this.root = document.querySelector(rootSelector);
        // console.log('Home view root:', this.root); 
        // TODO: Verify the passed rootSelector across pages
    }

    async getHtml(path) {
        const res = await fetch(path);
        const html = await res.text();
        return html;
    }
}
export class HomeView {
    constructor(rootSelector) {
        this.root = document.querySelector(rootSelector);
        // console.log('Home view root:', this.root); 
        // TODO: Verify the passed rootSelector across pages
    }

    render() {
        this.includePartial('#app', '/_mvc/templates/home-top-content.html');
        this.includePartial('#layout-navbar', '/_mvc/templates/low-navbar.html'),
        this.includePartial('#layout-footer', '/_mvc/templates/spacer.html');

        // Deleting the header beacause here it is not necessary. 
        // Reallocating it when navigating away from the page. 
        // const header = document.querySelector('header');
        // header.remove();
    }

    async includePartial(selector, url) {
        const container = document.querySelector(selector);
        if (!container) return;

        const res = await fetch(url);
        const html = await res.text();
        // container.innerHTML = html;
        container.insertAdjacentHTML('beforeend', html);
    }

}
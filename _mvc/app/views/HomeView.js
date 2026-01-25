export class HomeView {
    constructor(rootSelector) {
        this.root = document.querySelector(rootSelector);
        // console.log(this.root);
    }

    renderWelcome() {
        // Implemented for testing; to be deleted
        this.root.innerHTML = `
            <section>
                <h1>Benvenuto</h1>
                <a href="/bio" data-link>Vai alla biografia</a>
            </section>
        `;
    }

    render() {
        this.includePartial('#app', '/_mvc/templates/home-top-content.html');
        this.includePartial('#layout-footer', '/_mvc/templates/spacer.html');
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
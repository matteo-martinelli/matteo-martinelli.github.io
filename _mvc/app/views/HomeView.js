export class HomeView {
    constructor(rootSelector) {
        this.root = document.querySelector(rootSelector);
        // console.log(this.root);
    }

    renderWelcome() {
        this.root.innerHTML = `
            <section>
                <h1>Benvenuto</h1>
                <a href="biography.html">Vai alla biografia</a>
            </section>
        `;
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
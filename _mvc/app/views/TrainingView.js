/* 
TrainingView.js: 
Its only job is to be a "template provider." 
It should have a method like getHtml() that simply returns the HTML string 
for its content. 
It should not modify the DOM itself.
*/


export class TrainingView {
    constructor(rootSelector) {
        this.root = document.querySelector(rootSelector);
        // console.log(this.root);
    }

    async getHtml(path) {
        const res = await fetch(path);
        const html = await res.text();
        return html;
    }

    getHtmlStructure() {
        // return `
        //     <section id="industrial-projects"></section>
        //     <hr id="sections-separator-1">
        //     <section id="scientific-projects"></section>
        //     <hr id="sections-separator-2">
        // `;
    }

    renderIndustrialProjects(projects) {
        // console.log(projects);
    }

    renderUniversityProjects(projects) {
        // console.log(projects);
    }
}
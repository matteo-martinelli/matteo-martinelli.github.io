/* 
BiographyView.js: 
Its only job is to be a "template provider." 
It should have a method like getHtml() that simply returns the HTML string 
for its content. 
It should not modify the DOM itself.
*/


export class BiographyView {
    constructor(rootSelector) {
        this.root = document.querySelector(rootSelector);
        // console.log(this.root);
    }

    getHtmlParagraph() {
        // TODO: move the html content to a file
        // this.root.innerHTML = `
        return `
            <section id="content-container" class="section">
                <div id="biography">
                    <h2>About me</h2>
                    
                    <p id="bio-par-sec">
                        What people say about me: loyal, precise, always ready and present for a friend or colleague. 🙂
                    </p>
                    
                    <p id="bio-par-sec">
                        I am aknowledged about the importance of 💬 communication 💬 and the role it plays in human relationships, from sharing to solving  problems moments.
                    </p>
                    
                    <p id="bio-par-sec">
                        I'm curious and this leads me to explore and discover new things, if I think they can be useful to me. 🔍🦝 In my opinion every problem has at least one solution, but the best solutions are most of the times achieved as a group.
                    </p>
                    
                    <p id="bio-par-sec">
                        🔧 Are you curious to know what my skills are? Or what projects have I managed? 🖱️ Click 
                        <a class="link" id="projects-link" href="../projects">here!</a>
                    </p>
                    
                    <p id="bio-par-sec">
                        Do you want to know more about me? 
                        <a class="link" id="cv-download" href="../assets/docs/cv/CV 4.11 - Matteo Martinelli - with Certificates - ENG.pdf" target="_blank" rel="noopener noreferrer">
                            Download my CV!
                        </a> 
                        📜<br>
                        Do you want to get in touch? Send me an 
                        <a class="link" id="contact-form-link" href="">email!</a>
                    </p>
                    <!--<br>
                    <a id="back-home" href="/index" data-link>Back to Home</a>-->
                </div>
            </section>
        `;
    }

    async getHtml(path) {
        const res = await fetch(path);
        const html = await res.text();
        return html;
    }
}
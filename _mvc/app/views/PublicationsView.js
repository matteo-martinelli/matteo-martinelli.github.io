/* 
PublicationsView.js: 
Its only job is to be a "template provider." 
It should have a method like getHtml() that simply returns the HTML string 
for its content. 
It should not modify the DOM itself.
*/


export class PublicationsView {
    constructor(rootSelector) {
        this.root = document.querySelector(rootSelector);
        // console.log(this.root);
    }

    getHtml() {
        return `
            <article class="section" id="content-container">
                <section id="scientific-articles"></section>
                <hr id="sections-separator">
                <section id="university-thesis"></section>
                <hr id="sections-separator">
            </article>
        `;
    }

    getPopulatedHtml(publications) {
        const scientific_articles_section = document.getElementById('scientific-articles');
                    
        const research_articles_h2_title = document.createElement('h2');   // Add class, id, ..-
        research_articles_h2_title.textContent = 'Publications';
        scientific_articles_section.appendChild(research_articles_h2_title);
        
        const research_publications_ol = document.createElement('ol');         // research_publications_ol
        research_publications_ol.className = 'scientific-publications-list';
        research_publications_ol.id = 'scientific-articles-list';
        scientific_articles_section.appendChild(research_publications_ol);
                            
        for (const pub_details in publications) {
            // List item where to store scientific publication details
            var research_publications_ol_li = document.createElement('li');
            
            // Retrieve data to present
            // TODO: reorganize in a dictionary and build a brief algorithm
            var content = publications[pub_details];
            var type = content['type'];
            var title = content['title'];
            var authors = content['authors'];
            var publisher = content['publisher'];
            var journal_issue_conference = content['journal-issue-conference'];
            var year = content['year'];
            var doi_link = content['reference-doi-link'];

            // Title and Badge
            var title_element = document.createElement('h4');
            title_element.textContent = title;
            
            var badge_element = document.createElement('a');
            badge_element.textContent = type;
            title_element.appendChild(badge_element);
            
            if (type == 'journal') {     // Enum all the possible types
                badge_element.classList.add('badge', 'journal');
            } 
            else if (type == 'conference') {
                badge_element.classList.add('badge', 'conference');
            }
            else if (type == 'preprint') {
                badge_element.classList.add('badge', 'preprint');
            }
            
            research_publications_ol_li.appendChild(title_element);

            // Create subelements structure of ol 
            // reporting scientific publications information in an ul
            var research_pub_description_ul = document.createElement('ul');
            research_pub_description_ul.className = 'scientific-publication-details';
            research_pub_description_ul.id = 'scientific-publication-details-ul';
            
            // Authors
            var research_pub_description_ul_li = document.createElement('li');
            var authors_emph_element = document.createElement('i');
            authors_emph_element.textContent = authors;
            research_pub_description_ul_li.appendChild(authors_emph_element);
            // Append the built li to the research_pub_description_ul
            research_pub_description_ul.appendChild(research_pub_description_ul_li);

            // Journal / Conference
            var research_pub_description_ul_li = document.createElement('li');
            var publisher_content = '(' + publisher + ') ' + journal_issue_conference + ', ' + year;
            research_pub_description_ul_li.textContent = (publisher_content);
            // Append the built li to the research_pub_description_ul
            research_pub_description_ul.appendChild(research_pub_description_ul_li);

            // DOI
            var research_pub_description_ul_li = document.createElement('li');
            research_pub_description_ul_li.textContent = 'DOI: ';
            var doi_link_a = document.createElement('a');
            doi_link_a.className = 'link'; 
            doi_link_a.id = 'publication-link'; 
            doi_link_a.textContent = doi_link; 
            doi_link_a.href = doi_link;
            doi_link_a.target = '_blank';
            doi_link_a.rel = 'noopener noreferrer';
            research_pub_description_ul_li.appendChild(doi_link_a); 
            research_pub_description_ul.appendChild(research_pub_description_ul_li);
            
            // Append the research_pub_description_ul to the upper-level li element in process
            research_publications_ol_li.appendChild(research_pub_description_ul);
            // Append the finally built research_publications_ol_li to the list grouping research articles
            research_publications_ol.append(research_publications_ol_li);
        }
    }
}
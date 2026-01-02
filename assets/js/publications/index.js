// Publications Page Script

function addDebuggingGraphhicalElements(debugging_value) {
    // Function aimed at activate the debugging mode fo the UI
    if (debugging_value){    
        var scientific_articles_section = document.getElementById('scientific-articles');
        scientific_articles_section.style.border = '1px solid orange';

        var university_thesis_section = document.getElementById('university-thesis');
        university_thesis_section.style.border = '1px solid olive';
    }
}


// TODO: collect in a separate utils.js file
function toTitleCase(str) {
  return str
    .toLowerCase()                                              // all lower case
    .split(' ')                                                 // divide words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // first letter uppercase + other lowercase
    .join(' ');                                                 // merge words
}


fetch('/assets/db/publications.json').then(
    response => {
        if (!response.ok) {
            throw new Error('There was an error reading the file!');
        } 
        return response.json();
    })
    .then(values =>{
        for (var key in values){
            switch (key){                   
                // TODO: improve vertical spacing between publications 
                case 'scientific-articles':{
                    var scientific_articles_section = document.getElementById('scientific-articles');
                    
                    var research_articles_h2_title = document.createElement('h2');   // Add class, id, ..-
                    research_articles_h2_title.textContent = 'Publications';
                    scientific_articles_section.appendChild(research_articles_h2_title);
                    
                    var research_publications_ol = document.createElement('ol');         // research_publications_ol
                    research_publications_ol.className = 'scientific-publications-list';
                    research_publications_ol.id = 'scientific-articles-list';
                    scientific_articles_section.appendChild(research_publications_ol);
                                        
                    for (var pub_details in values[key]) {
                        // List item where to store scientific publication details
                        var research_publications_ol_li = document.createElement('li');
                        
                        // Retrieve data to present
                        // TODO: reorganize in a dictionary and build a brief algorithm
                        var content = values[key][pub_details];
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
                        doi_link_a.textContent = doi_link; 
                        doi_link_a.href = doi_link;
                        doi_link_a.target = '_blank';
                        doi_link_a.rel = 'noopener noreferrer';
                        doi_link_a.style.color = 'orange';
                        research_pub_description_ul_li.appendChild(doi_link_a); 
                        research_pub_description_ul.appendChild(research_pub_description_ul_li);
                        
                        // Append the research_pub_description_ul to the upper-level li element in process
                        research_publications_ol_li.appendChild(research_pub_description_ul);
                        // Append the finally built research_publications_ol_li to the list grouping research articles
                        research_publications_ol.append(research_publications_ol_li);
                    }
                    break;
                }

                case 'university-thesis': {
                    var university_thesis_section = document.getElementById('university-thesis');
                    
                    var section_title = document.createElement('h2');
                    section_title.textContent = 'University Thesis';
                    university_thesis_section.appendChild(section_title);
                    
                    var university_publications_ol = document.createElement('ol');
                    university_publications_ol.className = 'scientific-publications-list';
                    university_publications_ol.id = 'university-articles-list';
                    
                    university_thesis_section.appendChild(university_publications_ol);
                    
                    for (var table_key in values[key]) {
                        // List item where to store university publication details
                        var university_publications_ol_li = document.createElement('li');

                        // TODO: reorganize in a dictionary and build a brief algorithm
                        // Retrieve data to present
                        var content = values[key][table_key];
                        var degree = content['degree'];
                        var course = content['course'];
                        var title = content['title'];
                        var authors = content['authors'];
                        var publisher = content['publisher'];
                        var year = content['year'];
                        var doi_link = content['reference-doi-link'];

                        // Title and Badge
                        var title_element = document.createElement('h4');
                        title_element.textContent = title;
                        
                        var badge_element = document.createElement('a');
                        badge_element.textContent = table_key;
                        title_element.appendChild(badge_element);
                        
                        if (table_key == 'phd-thesis') {     // Enum all the possible types
                            badge_element.classList.add('badge', 'phd-thesis');
                        } 
                        else if (table_key == 'masters-thesis') {
                            badge_element.classList.add('badge', 'masters-thesis');
                        }
                        
                        university_publications_ol_li.appendChild(title_element);
                        
                        // Create subelements structure of ol
                        // reporting university publications information in an ul
                        var university_publication_description_ul = document.createElement('ul');
                        university_publication_description_ul.className = 'scientific-publication-details';
                        university_publication_description_ul.id = 'university-pulication-details-ul';
                        
                        // Degree, course, university and year setting
                        var university_publication_description_ul_li = document.createElement('li');
                        var string_content = degree + ' in ' + course + ', ' + publisher + ', ' + year;
                        var degree_course_publisher_year_text_node = document.createTextNode(string_content);
                        university_publication_description_ul_li.appendChild(degree_course_publisher_year_text_node);
                        university_publication_description_ul.appendChild(university_publication_description_ul_li);
                        
                        // Link setting
                        var university_publication_description_ul_li = document.createElement('li');
                        university_publication_description_ul_li.textContent = 'Link: ';
                        var link_a = document.createElement('a');
                        link_a.textContent = doi_link; 
                        link_a.href = doi_link;
                        link_a.target = '_blank';
                        link_a.rel = 'noopener noreferrer';
                        link_a.style.color = 'orange';
                        university_publication_description_ul_li.appendChild(link_a);

                        // Append the built li to the university_publication_description_ul
                        university_publication_description_ul.appendChild(university_publication_description_ul_li);
                        // Append the university_publication_description_ul to the upper-level li element in process
                        university_publications_ol_li.appendChild(university_publication_description_ul);
                        // Append the finally built university_publications_ol_li to the list grouping university articles
                        university_publications_ol.appendChild(university_publications_ol_li);
                    }                
                    break;
                }
            }
        }
    })
    .then(values => {
        addDebuggingGraphhicalElements(false);
    })


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
                    
                    var scientific_articles_h2_title = document.createElement('h2');   // Add class, id, ..-
                    scientific_articles_h2_title.textContent = 'Publications';
                    scientific_articles_section.appendChild(scientific_articles_h2_title);
                    
                    var sa_ol = document.createElement('ol');         // Add class, id, ..-
                    scientific_articles_section.appendChild(sa_ol);
                                        
                    for (var key_industrial in values[key]) {
                        // TODO: reorganize in a dictionary and build a brief algorithm
                        // Retrieve data to present
                        var content = values[key][key_industrial];
                        var type = content['type'];
                        var title = content['title'];
                        var authors = content['authors'];
                        var publisher = content['publisher'];
                        var journal_issue_conference = content['journal-issue-conference'];
                        var year = content['year'];
                        var doi_link = content['reference-doi-link'];
                        
                        // Create title and badge structure (li)
                        var li_element = document.createElement('li');
                        li_element.style.paddingBottom = '0.4em';
                        
                        // Title and Badge
                        var title_element = document.createElement('h4');
                        var title_text_node = document.createTextNode(title);
                        
                        var badge_element = document.createElement('a');
                        var badge_text_node = document.createTextNode(type);
                        badge_element.appendChild(badge_text_node);
                        
                        if (type == 'journal') {     // Enum all the possible types
                            badge_element.classList.add('badge', 'journal');
                        } 
                        else if (type == 'conference') {
                            badge_element.classList.add('badge', 'conference');
                        }
                        else if (type == 'preprint') {
                            badge_element.classList.add('badge', 'preprint');
                        }
                        
                        title_element.appendChild(title_text_node);
                        title_element.appendChild(badge_element);
                        li_element.appendChild(title_element);

                        // Create subelements structure (ol)
                        var ul = document.createElement('ul');
                        
                        // Authors
                        var li_authors = document.createElement('li');
                        var authors_text_node = document.createTextNode(authors);
                        authors_emph_element = document.createElement('i');
                        authors_emph_element.appendChild(authors_text_node);
                        li_authors.appendChild(authors_emph_element); 
                        ul.appendChild(li_authors);

                        // Journal / Conference
                        var li_publisher = document.createElement('li');
                        var publisher_content = '(' + publisher + ') ' + journal_issue_conference + ', ' + year;
                        li_publisher.textContent = publisher_content; 
                        ul.appendChild(li_publisher);

                        // DOI
                        var li_doi = document.createElement('li');
                        li_doi.textContent = 'DOI: ';
                        var doi_link_a = document.createElement('a');
                        doi_link_a.textContent = doi_link; 
                        doi_link_a.href = doi_link;
                        doi_link_a.target = '_blank';
                        doi_link_a.rel = 'noopener noreferrer';
                        doi_link_a.style.color = 'orange';
                        li_doi.appendChild(doi_link_a); 
                        
                        // Append the build li to the ul
                        ul.appendChild(li_doi);
                        ul.style.marginLeft = '0.9em';
                        
                        // Append the ul to the element in process
                        li_element.appendChild(ul);

                        // Append the result to the list grouping scientific articles
                        sa_ol.append(li_element);
                        sa_ol.style.paddingLeft = '1.1em';
                    }

                    scientific_articles_section.style.paddingTop = '10px';
                    scientific_articles_section.style.paddingBottom = '10px';
                    scientific_articles_section.style.paddingLeft = '25px';

                    break;
                }

                case 'university-thesis': {
                    var university_thesis_section = document.getElementById('university-thesis');
                    
                    var section_title = document.createElement('h2');
                    section_title.textContent = 'University Thesis';
                    university_thesis_section.appendChild(section_title);
                    
                    var ordered_elements_list = document.createElement('ol');

                    for (var table_key in values[key]) {
                        var content = values[key][table_key];
                        var degree = content['degree'];
                        var course = content['course'];
                        var title = content['title'];
                        var authors = content['authors'];
                        var publisher = content['publisher'];
                        var year = content['year'];
                        var doi_link = content['reference-doi-link'];

                        // Title and Badge
                        var title_text_node = document.createTextNode(title);
                        var title_element = document.createElement('h4');
                        var li_title = document.createElement('li');
                        title_element.appendChild(title_text_node);
                        li_title.appendChild(title_element);
                        li_title.style.paddingBottom = '0.4em'; // TODO: improve, could be the opposite
                        
                        var badge_element = document.createElement('a');
                        var badge_text_node = document.createTextNode(table_key);
                        badge_element.appendChild(badge_text_node);
                        title_element.appendChild(badge_element);
                        
                        if (table_key == 'phd-thesis') {     // Enum all the possible types
                            badge_element.classList.add('badge', 'phd-thesis');
                        } 
                        else if (table_key == 'masters-thesis') {
                            badge_element.classList.add('badge', 'masters-thesis');
                        }

                        // Degree, course, university and year setting
                        var string_content = degree + ' in ' + course + ', ' + publisher + ', ' + year;
                        var degree_course_publisher_year_text_node = document.createTextNode(string_content);
                        var li_degree_course_publisher_year = document.createElement('li');
                        li_degree_course_publisher_year.appendChild(degree_course_publisher_year_text_node);
                        
                        // Link setting
                        var li_link = document.createElement('li');
                        li_link.textContent = 'Link: ';
                        var link_a = document.createElement('a');
                        link_a.textContent = doi_link; 
                        link_a.href = doi_link;
                        link_a.target = '_blank';
                        link_a.rel = 'noopener noreferrer';
                        link_a.style.color = 'orange';
                        li_link.appendChild(link_a);
                        
                        // Appending elements to appropriate lists and styling
                        var unordered_artifact_description = document.createElement('ul');
                        unordered_artifact_description.appendChild(li_degree_course_publisher_year);
                        unordered_artifact_description.appendChild(li_link);
                        unordered_artifact_description.style.marginLeft = '0.9em';

                        ordered_elements_list.appendChild(li_title);
                        ordered_elements_list.appendChild(unordered_artifact_description);
                        ordered_elements_list.style.paddingLeft = '1.1em';

                    }
                    // Appending elements to appropriate lists and styling
                    university_thesis_section.appendChild(ordered_elements_list);
                    university_thesis_section.style.paddingTop = '10px';
                    university_thesis_section.style.paddingBottom = '10px';
                    university_thesis_section.style.paddingLeft = '25px';
                
                    break;
                }
            }
        }
    })
    .then(values => {
        addDebuggingGraphhicalElements(false);
    })


// Pojects Page Script

function addDebuggingGraphhicalElements(debugging_value) {
    // Function aimed at activate the debugging mode fo the UI
    if (debugging_value){
        var industrial_projects_section = document.getElementById('industrial-projects');
        industrial_projects_section.style.border = '1px solid red';
    
        var projects_table = document.getElementById('projects-table');
        projects_table.style.border = '1px solid green';

        var industrial_projects_section = document.getElementById('scientific-projects');
        industrial_projects_section.style.border = '1px solid yellow';

        var editions_ul_section = document.getElementById('editions_ul');
        console.log(editions_ul_section);
        editions_ul_section.style.border = '1px solid yellow';

        var edition_content_ul_section = document.getElementById('edition_content_ul');
        console.log(edition_content_ul_section);
        edition_content_ul_section.style.border = '1px solid green';
    }
}


// TODO: collect in a separate utils.js file.
function toTitleCase(str) {
  return str
    .toLowerCase()                                              // all lower case
    .split(' ')                                                 // divide words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // first letter uppercase + other lowercase
    .join(' ');                                                 // merge words
}


// Industrial projects
// TODO: The logic must be the opposite: fetch the structure of the page, and then call the json files accordingly
fetch('/assets/db/industrial-projects.json').then(
    response => {
        if (!response.ok) {
            throw new Error('There was an error reading the file!');
        } 
        return response.json();
    })
    .then(values =>{        // TODO: make html elements const
        for (var key in values){
            switch (key){
                case 'industrial-projects': {
                    var industrial_projects_section = document.getElementById('industrial-projects');
                    
                    var industrial_projects_div = document.createElement('div');
                    var industrial_projects_title = document.createElement('h2');
                    industrial_projects_title.textContent = 'Industrial Projects:'; 
                    industrial_projects_div.appendChild(industrial_projects_title);

                    var industrial_projects_table = document.createElement('table')
                    industrial_projects_table.id = 'projects-table';

                    for (var key_industrial in values[key]) {
                        var content = values[key][key_industrial];
                        var description = content['title'];
                        
                        var table_row = document.createElement('tr');
                        var table_entry = document.createElement('td');
                        
                        var table_separator = document.createElement('td');
                        table_separator.className = 'separator';
                        
                        var table_value = document.createElement('td');
                        var ul = document.createElement('ul');
                        var li = document.createElement('li');
                        for (var elem in values[key][key_industrial]["links"]) {
                            var link_elem = document.createElement('a');
                            link_elem.className = 'link';
                            link_elem.href = values[key][key_industrial]["links"][elem];
                            link_elem.target = '_blank';
                            link_elem.rel = 'noopener noreferrer';
                            link_elem.textContent = elem.replace('-link', '').replaceAll('-', ' ');
                            table_value.appendChild(link_elem);
                            var separator = document.createTextNode(', ');
                            table_value.appendChild(separator);
                            console.log(values[key][key_industrial]["links"][elem]);
                        }
                        table_value.removeChild(table_value.lastChild);

                        li.textContent = description;
                        ul.appendChild(li);
                        table_entry.appendChild(ul);
                        table_separator.textContent = '=>';
                        table_row.appendChild(table_entry);
                        table_row.appendChild(table_separator);
                        table_row.appendChild(table_value);
                        industrial_projects_table.appendChild(table_row);
                    }
                    industrial_projects_div.appendChild(industrial_projects_table);                        
                    industrial_projects_section.appendChild(industrial_projects_div);
                    
                    break;
                }
            }
        }
    })
    .then(values => {
        addDebuggingGraphhicalElements(false);
    })

// Scientific projects
// TODO: The logic must be the opposite: fetch the structure of the page, and then call the json files accordingly
fetch('/assets/db/scientific-projects.json').then(
    response => {
        if (!response.ok) {
            throw new Error('There was an error reading the file!');
        } 
        return response.json();
    })
    .then(values =>{        // TODO: make html elements const
        for (var key in values){
            switch (key){
                case 'scientific-projects': {
                    var scientific_projects_section = document.getElementById('scientific-projects');
                    //console.log('scientific-projects section');

                    var scientific_projects_title = document.createElement('h2');
                    scientific_projects_title.textContent = 'Scientific Projects:'; 
                    scientific_projects_section .appendChild(scientific_projects_title);
                    
                    var scientific_projects_ol = document.createElement('ol');
                    scientific_projects_ol.className = 'scientific-projects-list';

                    for (var elem in values[key]) {
                        var content = values[key][elem];
                        
                        //console.log(content);

                        // TODO: reorganize in a dictionary and build a brief algorithm
                        var project_name = content.name;
                        var project_full_name = content.full_name;
                        var project_displayed_name = project_full_name + ' (' + project_name + ')';
                        var project_role = content.role;
                        var project_affiliation = content.affiliation;
                        var project_type = content.type;
                        var project_type = content.type;
                        var project_duration = content.duration;
                        var project_link = content.link;

                        var project_title_h2 = document.createElement('h4');
                        project_title_h2.textContent = project_displayed_name;
                        var project_title_li = document.createElement('li');
                        project_title_li.appendChild(project_title_h2);
                        scientific_projects_ol.appendChild(project_title_li);

                        var project_content_ul = document.createElement('ul');
                        var project_role_li = document.createElement('li');
                        
                        var role_key = document.createElement('b');
                        var role_value = document.createTextNode(project_role);
                        role_key.textContent = 'Role: '; 
                        project_role_li.appendChild(role_key);
                        project_role_li.appendChild(role_value);
                        project_content_ul.appendChild(project_role_li);

                        var project_affiliation_li = document.createElement('li');
                        var affiliation_key = document.createElement('b');
                        var affiliation_value = document.createTextNode(project_affiliation);
                        affiliation_key.textContent = 'Affiliation: '; 
                        project_affiliation_li.appendChild(affiliation_key);
                        project_affiliation_li.appendChild(affiliation_value);
                        project_content_ul.appendChild(project_affiliation_li);

                        var project_type_li = document.createElement('li');
                        var type_key = document.createElement('b');
                        var type_value = document.createTextNode(project_type);
                        type_key.textContent = 'Type: '; 
                        project_type_li.appendChild(type_key);
                        project_type_li.appendChild(type_value);
                        project_content_ul.appendChild(project_type_li);

                        var project_duration_li = document.createElement('li');
                        var duration_key = document.createElement('b');
                        var duration_value = document.createTextNode(project_duration);
                        duration_key.textContent = 'Duration: '; 
                        project_duration_li.appendChild(duration_key);
                        project_duration_li.appendChild(duration_value);
                        project_content_ul.appendChild(project_duration_li);

                        var project_link_li = document.createElement('li');
                        var link_key = document.createElement('b');
                        var link_value = document.createElement('a');
                        link_value.textContent = project_link;
                        link_value.href = project_link;
                        link_value.target = '_blank';
                        link_value.rel = 'noopener noreferrer';
                        link_value.className = 'link';
                        link_key.textContent = 'Link: '; 
                        project_link_li.appendChild(link_key);
                        project_link_li.appendChild(link_value);
                        project_content_ul.appendChild(project_link_li);

                        scientific_projects_ol.appendChild(project_content_ul);
                        scientific_projects_section.appendChild(scientific_projects_ol);
                    }
                    break; 
                }

            }
        }
    })
    .then(values => {
        addDebuggingGraphhicalElements(false);
    })

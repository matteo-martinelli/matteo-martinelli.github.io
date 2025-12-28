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
                            link_elem.href = values[key][key_industrial][elem];
                            link_elem.target = '_blank';
                            link_elem.rel = 'noopener noreferrer';
                            link_elem.textContent = elem.replace('-link', '').replaceAll('-', ' ');
                            table_value.appendChild(link_elem);
                            var separator = document.createTextNode(', ');
                            table_value.appendChild(separator);
                        }
                        table_value.removeChild(table_value.lastChild);

                        ul.style.paddingLeft = '1em';

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
                    
                    var industrial_projects_table_tr = industrial_projects_table.getElementsByTagName('tr');
                    for (var i = 0; i < industrial_projects_table_tr.length; i++) {
                        var industrial_projects_table_td = industrial_projects_table_tr[i].getElementsByTagName('td');
                        for (var j = 0; j < industrial_projects_table_td.length; j++) {
                            industrial_projects_table_td[j].style.paddingBottom = '0.4em';
                            if (industrial_projects_table_td[j].className == 'separator') {
                                industrial_projects_table_td[j].style.paddingLeft = '15px';
                                industrial_projects_table_td[j].style.paddingRight = '15px';
                            }
                        }
                        industrial_projects_table_tr[i].style.border = '1px solid green';
                    }

                    var table_separator = document.querySelector('#projects-table, .separator');
                    
                    industrial_projects_section.style.paddingTop = '10px';
                    industrial_projects_section.style.paddingBottom = '10px';
                    industrial_projects_section.style.paddingLeft = '25px';

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
                        project_content_ul.style.marginLeft = '25px';
                        project_content_ul.style.marginBottom = '0.4em';
                        
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
                        scientific_projects_ol.style.marginLeft = '25px';

                        scientific_projects_section.appendChild(scientific_projects_ol);
                    }

                    scientific_projects_section.style.paddingTop = '10px';
                    scientific_projects_section.style.paddingBottom = '10px';
                    scientific_projects_section.style.paddingLeft = '25px';

                    break; 
                }

            }
        }
    })
    .then(values => {
        addDebuggingGraphhicalElements(false);
    })

fetch('/assets/db/course-projects.json').then(
    response => {
        if (!response.ok) {
            throw new Error('There was an error reading the file!');
        } 
        return response.json();
    })
    .then(values =>{        // TODO: make html elements const
        for (var key in values){
            switch (key){
                case 'course-projects': {
                    // Getting or creating main structures
                    var course_projects_section = document.getElementById('course-projects');
                    course_projects_section.style.paddingTop = '10px';
                    course_projects_section.style.paddingBottom = '10px';
                    course_projects_section.style.paddingLeft = '25px';
                    
                    var course_projects_ol = document.createElement('ol');
                    course_projects_ol.style.marginLeft = '25px';
                    
                    //console.log(course_projects_section);

                    // Creating and appendig section title
                    var course_projects_title = document.createElement('h2');
                    course_projects_title.textContent = 'Course Projects:'; 
                    course_projects_section .appendChild(course_projects_title);
                    
                    // Cycling over courses
                    for (var elem in values[key]) {
                        // Creating main structures and setting the style
                        var course_content_ul = document.createElement('ul');
                        course_content_ul.style.paddingLeft = '25px';
                        course_content_ul.style.marginBottom = '0.4em'; // TODO: to confirm

                        // Getting variables
                        var content = values[key][elem];
                        
                        //console.log(content);

                        // TODO: reorganize in a dictionary and build a brief algorithm
                        // Getting first level vars
                        var course_id = content.course_id;
                        var course_title = content.course_title;
                        var provider = content.provider;
                        var promoter = content.promoter;
                        var language = content.language;
                        var description = content.description;
                        var link = content.link;
                        var role = content.role;
                        var course_set_from = content.from;
                        var course_set_to = content.to;
                        var total_taught_hours = content.total_taught_hours;

                        //console.log(total_taught_hours);

                        // Creating and appending course title
                        var course_li = document.createElement('li');
                        var course_decription_li = document.createElement('li');
                        var course_edition_li = document.createElement('li');
                        var course_title_h2 = document.createElement('h4');
                        course_title_h2.textContent = course_title;
                        course_li.appendChild(course_title_h2);
                        
                        // Creating and appending course description
                        var course_par = document.createElement('p');

                        if (provider != null) {
                            course_par.textContent = course_par.textContent + 'Provided by ' + provider;
                        } else 
                            
                        if (promoter != null) {
                            course_par.textContent = course_par.textContent + ' and promoted by ' + promoter + ', ';
                        }

                        if (course_set_from != null && course_set_to != null ) {
                            course_par.textContent = course_par.textContent + ' from ' + course_set_from + ' to ' + course_set_to;
                        }

                        if (language != null) {
                            course_par.textContent = course_par.textContent + ', taught in ' + language + '. ';
                        }

                        if (role != null) {
                            course_par.textContent = course_par.textContent + 'I contributed as a ' + role;
                        }

                        if (total_taught_hours != null) {
                            course_par.textContent = course_par.textContent + ' for a total of ' + total_taught_hours.value + ' ' + total_taught_hours.unit; 
                        }

                        course_par.textContent = course_par.textContent + '.';

                        if (link != null) {
                            var link_elem = document.createElement('a');
                            link_elem.textContent = 'here';
                            link_elem.href = link;
                            link_elem.target = '_blank';
                            link_elem.rel = 'noopener noreferrer';
                            link_elem.className = 'link';

                            course_par.textContent = course_par.textContent + ' More information ';

                            course_par.append(link_elem);
                            course_par.append('.');
                        }

                        course_decription_li.append(course_par);
                        course_content_ul.appendChild(course_decription_li);
                                                
                        var editions_list = content.editions;
                        for (var elem in editions_list) {
                            // Creating the list collecting the each edition detail
                            var edition_content_ul = document.createElement('ul');
                            edition_content_ul.style.paddingLeft = '25px';
                            
                            var edition_content = editions_list[elem];
                            var ed_id = edition_content['edition_id'];
                            
                            var ed_start_date = new Date(edition_content.start_date);
                            var ed_end_date = new Date(edition_content.end_date);
                            var edition = null; 
                            if (ed_start_date.getFullYear() == ed_end_date.getFullYear()) {
                                edition = String(ed_start_date.getFullYear());
                            } 
                            else {
                                edition = ed_start_date.getFullYear() + '-' + ed_end_date.getFullYear();
                            }
                            
                            var ed_delivery_mode = edition_content.delivery_mode;
                            var ed_location = edition_content.location;
                            var ed_total_hours = edition_content.total_hours;
                            var ed_participants_count = edition_content.participants_count;
                            var ed_client_type = edition_content.client_type;
                            var ed_client_name = edition_content.client_name;
                            
                            // Specifying the edition in the upper-level list
                            var course_edition_li = document.createElement('li');
                            var course_edition_key = document.createElement('b');
                            course_edition_key.textContent = edition + " Edition";
                            course_edition_li.appendChild(course_edition_key);
                            course_content_ul.appendChild(course_edition_li);
                            
                            // Appending fetched variables
                            var course_ed_details_li = document.createElement('li');
                            course_ed_details_li.textContent = edition;
                            edition_content_ul.appendChild(course_ed_details_li);

                            var course_ed_details_li = document.createElement('li');
                            course_ed_details_li.textContent = ed_participants_count + ' participants';
                            edition_content_ul.appendChild(course_ed_details_li);

                            var course_ed_details_li = document.createElement('li');
                            course_ed_details_li.textContent = ed_delivery_mode;
                            edition_content_ul.appendChild(course_ed_details_li);

                            var courscourse_ed_details_lie_edition_li = document.createElement('li');
                            course_ed_details_li.textContent = ed_location;
                            edition_content_ul.appendChild(course_ed_details_li);

                            var course_ed_details_li = document.createElement('li');
                            course_ed_details_li.textContent = ed_total_hours.value + ' ' + ed_total_hours.unit;
                            edition_content_ul.appendChild(course_ed_details_li);

                            // Creating the list collecting the each module detail
                            var modules_details_ul = document.createElement('ul');
                            modules_details_ul.style.paddingLeft = '25px';
                            
                            // Setting the title of the module list entry
                            var module_title_li = document.createElement('li');
                            //module_title_li.textContent = 'Module Title: ' + module_title;
                            module_title_li.textContent = 'Modules:';
                            edition_content_ul.appendChild(module_title_li);
                            
                            var modules_list = edition_content.modules;
                            for (module_elem in modules_list) {
                                var module_content = modules_list[module_elem];
                                var module_title = module_content.title;
                                var module_topics = module_content.topics;
                                var module_taught_hours = module_content.hours_taught;
                                var module_start_date = new Date(module_content.start_date);
                                var module_end_date = new Date(module_content.end_date);
                                
                                // Setting the title of the module list entry
                                // var module_title_li = document.createElement('li');
                                //module_title_li.textContent = 'Module Title: ' + module_title;
                                // module_title_li.textContent = 'Modules:';
                                // edition_content_ul.appendChild(module_title_li);
                                
                                var topics_list_ul = document.createElement('ul');
                                topics_list_ul.style.paddingLeft = '25px';

                                var modules_details_li = document.createElement('li');
                                modules_details_li.textContent = module_title;
                                topics_list_ul.appendChild(modules_details_li);
                                edition_content_ul.appendChild(topics_list_ul);

                                // var modules_details_li = document.createElement('li');
                                // modules_details_li.textContent = 'Topics: ' + module_topics.join(', ');
                                var modules_details_p = document.createElement('p');
                                modules_details_p.textContent = 'Topics: ' + module_topics.join(', ');
                                topics_list_ul.appendChild(modules_details_p);
                                edition_content_ul.appendChild(topics_list_ul);

                                // var modules_details_li = document.createElement('li');
                                // modules_details_li.textContent = 'Hours taught: ' + module_taught_hours.value + ' ' + module_taught_hours.unit;
                                var modules_details_p = document.createElement('p');
                                modules_details_p.textContent =  'Hours taught: ' + module_taught_hours.value + ' ' + module_taught_hours.unit;
                                topics_list_ul.appendChild(modules_details_p);
                                edition_content_ul.appendChild(topics_list_ul);

                                // var modules_details_li = document.createElement('li');
                                var modules_details_p = document.createElement('p');
                                var start_date_year = String(module_start_date.getFullYear());
                                var start_date_month = String(module_start_date.getMonth() + 1).padStart(2, '0');
                                var start_date_day = null;
                                if (module_start_date.getDate() < 10) {
                                    var start_date_day = String(module_start_date.getDate()).padStart(2, '0');
                                }
                                else {
                                    var start_date_day = String(module_start_date.getDate());
                                }
                                var formatted_start_date = start_date_day.concat('-', start_date_month, '-', start_date_year); 

                                var end_date_year = String(module_end_date.getFullYear());
                                var end_date_month = String(module_end_date.getMonth() + 1).padStart(2, '0');
                                var end_date_day = null;
                                if (module_end_date.getDate() < 10) {
                                    var end_date_day = String(module_end_date.getDate()).padStart(2, '0');
                                }
                                else {
                                    var end_date_day = String(module_end_date.getDate());
                                }
                                var formatted_end_date = end_date_day.concat('-', end_date_month, '-', end_date_year); 
                                
                                // modules_details_li.textContent = 'From ' + formatted_start_date + ' to ' + formatted_end_date;
                                modules_details_p.textContent = 'From ' + formatted_start_date + ' to ' + formatted_end_date;
                                topics_list_ul.appendChild(modules_details_p);
                                edition_content_ul.appendChild(topics_list_ul);

                                edition_content_ul.appendChild(modules_details_ul);
                            }

                            course_content_ul.appendChild(edition_content_ul);
                        }
                        
                        course_li.appendChild(course_content_ul);
                        course_projects_ol.appendChild(course_li);

                        course_projects_section.appendChild(course_projects_ol);
                    }

                    break; 
                }

            }
        }
    })
    .then(values => {
        addDebuggingGraphhicalElements(false);
    })

// Course projects
// TODO: The logic must be the opposite: fetch the structure of the page, and then call the json files accordingly

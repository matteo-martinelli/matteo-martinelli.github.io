// Pojects Page Script

function addDebuggingGraphhicalElements(debugging_value) {
    // Function aimed at activate the debugging mode fo the UI
    if (debugging_value){
        var industrial_projects_section = document.getElementById('industrial-projects');
        industrial_projects_section.style.border = '1px solid red';
    
        var projects_table = document.getElementById('projects-table');
        projects_table.style.border = '1px solid green';
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


fetch('/assets/db/projects.json').then(
    response => {
        if (!response.ok) {
            throw new Error('There was an error reading the file!');
        } 
        return response.json();
    })
    .then(values =>{
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


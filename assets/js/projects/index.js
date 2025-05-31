function toTitleCase(str) {
  return str
    .toLowerCase()                 // tutto minuscolo
    .split(' ')                   // dividi in parole
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // prima lettera maiuscola + resto minuscolo
    .join(' ');                   // riunisci le parole
}

var section = document.getElementById('db-content-test-section');
console.log('Element returned:');
console.log(section);

//const div = document.createElement('div');
//div.textContent = 'questo testo è stato inserito dal mio script';
//section.appendChild(div);

fetch('/assets/db/projects.json').then(
    response => {
        console.log('response status:\n', response.status);
        console.log('response:\n', response);
        if (!response.ok) {
            throw new Error('There was an error reading the file!');
        } 
        return response.json();
    })
    .then(values =>{
        for (var key in values){
            switch (key){
                case 'industrial-projects':
                    //console.log(values[key])
                    // TODO: give an id and a class to the created div
                    const industrial_projects_div = document.createElement('div');
                    const industrial_projects_title = document.createElement('h2');
                    const industrial_projects_table = document.createElement('table')
                    industrial_projects_table.id = 'projects-table2';
                    industrial_projects_title.textContent = 'Industrial Projects:'; 
                    industrial_projects_div.appendChild(industrial_projects_title);
                    for (var key_industrial in values[key]) {
                        //
                        // console.log(key_industrial);
                        //console.log(values[key][key_industrial]);
                        var description = key_industrial.replaceAll('-', ' ');
                        description = toTitleCase(description);
                        var content = values[key][key_industrial];
                        const table_row = document.createElement('tr');
                        const table_entry = document.createElement('td');
                        const table_separator = document.createElement('td');
                        table_separator.className = 'separator';
                        const table_value = document.createElement('td');
                        const ul = document.createElement('ul');
                        const li = document.createElement('li');
                        var value_content;
                        for (var elem in values[key][key_industrial]) {
                            const link_elem = document.createElement('a');
                            //console.log(elem);
                            //console.log(values[key][key_industrial][elem]);
                            link_elem.className = 'link';
                            link_elem.href = values[key][key_industrial][elem];
                            link_elem.target = '_blank';
                            link_elem.rel = 'noopener noreferrer';
                            link_elem.textContent = elem.replace('-link', '').replaceAll('-', ' ');
                            //value_content = link_elem;
                            table_value.appendChild(link_elem);
                            const separator = document.createTextNode(', ');
                            table_value.appendChild(separator);
                        }
                        table_value.removeChild(table_value.lastChild);

                        li.textContent = description;
                        //console.log(il);
                        ul.appendChild(li);
                        table_entry.appendChild(ul);
                        table_separator.innerText = '=>';
                        //table_value.innerText = content;
                        table_row.appendChild(table_entry);
                        table_row.appendChild(table_separator);
                        table_row.appendChild(table_value);
                        //table_row.appendChild(value_content);
                        industrial_projects_table.appendChild(table_row)
                        //console.log(industrial_projects_table);
                        //console.log(ul);
                        //industrial_projects_div.textContent = description;
                    }
                    industrial_projects_div.appendChild(industrial_projects_table);                        
                    section.appendChild(industrial_projects_div);
            }
        }
    })

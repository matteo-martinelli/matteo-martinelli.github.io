/* 
ProjectsView.js: 
Its only job is to be a "template provider." 
It should have a method like getHtml() that simply returns the HTML string 
for its content. 
It should not modify the DOM itself.
*/


export class ProjectsView {
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
        return `
            <section id="industrial-projects"></section>
            <hr id="sections-separator-1">
            <section id="scientific-projects"></section>
            <hr id="sections-separator-2">
        `;
    }

    renderIndustrialProjects(projects) {
        // console.log(projects);

        var industrial_projects_section = document.getElementById('industrial-projects');
                    
        var industrial_projects_div = document.createElement('div');
        var industrial_projects_title = document.createElement('h2');
        industrial_projects_title.textContent = 'Industrial Projects:'; 
        industrial_projects_div.appendChild(industrial_projects_title);

        var industrial_projects_table = document.createElement('table')
        industrial_projects_table.id = 'projects-table';

        for (var key_industrial in projects) {
            var content = projects[key_industrial];
            var description = content['title'];
            
            var table_row = document.createElement('tr');
            var table_entry = document.createElement('td');
            
            var table_separator = document.createElement('td');
            table_separator.className = 'separator';
            
            var table_value = document.createElement('td');
            var ul = document.createElement('ul');
            var li = document.createElement('li');
            for (var elem in content["links"]) {
                var link_elem = document.createElement('a');
                link_elem.className = 'link';
                link_elem.href = projects[key_industrial]["links"][elem];
                link_elem.target = '_blank';
                link_elem.rel = 'noopener noreferrer';
                link_elem.textContent = elem.replace('-link', '').replaceAll('-', ' ');
                table_value.appendChild(link_elem);
                var separator = document.createTextNode(', ');
                table_value.appendChild(separator);
                console.log(projects[key_industrial]["links"][elem]);
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
        
    }

    renderUniversityProjects(projects) {
        // console.log(projects);

        var scientific_projects_section = document.getElementById('scientific-projects');
        //console.log('scientific-projects section');

        var scientific_projects_title = document.createElement('h2');
        scientific_projects_title.textContent = 'Scientific Projects:'; 
        scientific_projects_section .appendChild(scientific_projects_title);
        
        var scientific_projects_ol = document.createElement('ol');
        scientific_projects_ol.className = 'scientific-projects-list';

        for (var elem in projects) {
            var content = projects[elem];
            
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
    }
}
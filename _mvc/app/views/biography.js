var biography_section = document.getElementById('biography');

var section_title = document.createElement('h2');
section_title.textContent = 'About me';
biography_section.appendChild(section_title);

var biography_par = document.createElement('p');
biography_section.appendChild(biography_par);

var biography_par_1 = document.createElement('p');
var biography_par_2 = document.createElement('p');
var biography_par_3 = document.createElement('p');
var biography_par_4 = document.createElement('p');
var biography_par_5 = document.createElement('p');
biography_par_1.id = 'bio-par-sec';
biography_par_2.id = 'bio-par-sec';
biography_par_3.id = 'bio-par-sec';
biography_par_4.id = 'bio-par-sec';
biography_par_5.id = 'bio-par-sec';
biography_section.appendChild(biography_par_1);
biography_section.appendChild(biography_par_2);
biography_section.appendChild(biography_par_3);
biography_section.appendChild(biography_par_4);
biography_section.appendChild(biography_par_5);

var break_line = document.createElement('br');

var projects_link = document.createElement('a');
projects_link.className = 'link';
projects_link.id = 'projects-link';
projects_link.href = '../projects';
projects_link.textContent = 'here!';

var cv_link = document.createElement('a');
cv_link.className = 'link';
cv_link.id = 'cv-download';
cv_link.href = '../assets/docs/cv/CV 4.11 - Matteo Martinelli - with Certificates - ENG.pdf';
cv_link.target = "_blank";
cv_link.rel = "noopener noreferrer";
cv_link.textContent = 'Download my CV!';

var email_link = document.createElement('a');
email_link.className = 'link';
email_link.id = 'contact-form-link';
email_link.href = '';
email_link.textContent = 'email!';

var text_content_1 = document.createTextNode('What people say about me: loyal, precise, always ready and present for a friend or colleague. 🙂');
var text_content_2 = document.createTextNode('I am aknowledged about the importance of 💬 communication 💬 and the role it plays in human relationships, from sharing to solving  problems moments.');
var text_content_3 = document.createTextNode('I\'m curious and this leads me to explore and discover new things, if I think they can be useful to me. 🔍🦝 In my opinion every problem has at least one solution, but the best solutions are most of the times achieved as a group.');
var text_content_4 = document.createTextNode('🔧 Are you curious to know what my skills are? Or what projects have I managed? 🖱️ Click ');
var text_content_5 = document.createTextNode('Do you want to know more about me? ');
var text_content_6 = document.createTextNode(' 📜');
var text_content_7 = document.createTextNode('Do you want to get in touch? Send me an ');

biography_par_1.appendChild(text_content_1);

biography_par_2.appendChild(text_content_2);

biography_par_3.appendChild(text_content_3);

biography_par_4.appendChild(text_content_4);
biography_par_4.appendChild(projects_link);

biography_par_5.appendChild(text_content_5);
biography_par_5.appendChild(cv_link);
biography_par_5.appendChild(text_content_6);
biography_par_5.appendChild(break_line);
biography_par_5.appendChild(text_content_7);
biography_par_5.appendChild(email_link);

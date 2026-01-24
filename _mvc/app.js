// import { ProjectController } from './controllers/ProjectController.js';
// import { includePartial } from './app/helpers/htmlInjector.js';
import { HomeController } from "./app/controllers/HomeController.js";
import { Router } from "./app/router/Router.js";

console.log('app.js uploaded');

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router('body');
  router.init();
  const controller = new HomeController('body', router);
  // controller.init();
});

// document.addEventListener('DOMContentLoaded', async () => {
//   await Promise.all([
//     includePartial('body', '/_mvc/templates/low-navbar.html'),
//     includePartial('body', '/_mvc/templates/home-top-content.html'),
//     includePartial('body', '/_mvc/templates/spacer.html')
//   ]);
// });

// document.addEventListener('DOMContentLoaded', async () => {
  // const projectController = new ProjectController();
  // await projectController.init();
// });

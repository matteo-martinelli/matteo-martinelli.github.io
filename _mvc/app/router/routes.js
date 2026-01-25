import { HomeController } from '../controllers/HomeController.js';
import { BiographyController } from '../controllers/BiographyController.js';

// TODO: when updating paths, do the following: 
// 1. Change routes.js paths (e.g., to /bio).
// 2. Update all href attributes in your HTML files (e.g., low-navbar.html).
// 3. Update the default fallback path in Router.js (inside init()).

export const routes = [
  // {
  //   path: '/',          // home
  //   controller: HomeController
  // },
  {
    path: '/_mvc/index',  // home page
    controller: HomeController
  },
  {
    path: '/_mvc/bio',     // biografia
    controller: BiographyController
  },
  // {
  //   path: '/publications',     // biografia
  //   controller: PublicationsController
  // }, 
  // {
  //   path: '/projects',     // biografia
  //   controller: ProjectsController
  // },
  // {
  //   path: '/training',     // biografia
  //   controller: TrainingController
  // }
];

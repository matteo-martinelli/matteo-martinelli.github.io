import { HomeController } from '../controllers/HomeController.js';
import { BiographyController } from '../controllers/BiographyController.js';
import { PublicationsController } from '../controllers/PublicationsController.js';
import { ProjectsController } from '../controllers/ProjectsController.js';
import { TrainingController } from '../controllers/TrainingController.js';

// TODO: when updating paths, do the following: 
// 1. Change routes.js paths (e.g., to /bio).
// 2. Update all href attributes in your HTML files (e.g., low-navbar.html).
// 3. Update the default fallback path in Router.js (inside init()).

export const routes = [
  // {
  //   path: '/',               // home
  //   controller: HomeController
  // },
  {
    path: '/_mvc/index',        // home page
    controller: HomeController
  },
  {
    path: '/_mvc/bio',          // biografia
    controller: BiographyController
  },
  {
    path: '/_mvc/publications', // scientific publications
    controller: PublicationsController
  }, 
  {
    path: '/_mvc/projects',     // industrial projects
    controller: ProjectsController
  },
  {
    path: '/_mvc/training',     // training activities
    controller: TrainingController
  }
];

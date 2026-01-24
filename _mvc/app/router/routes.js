import { HomeController } from '../controllers/HomeController.js';
import { BiographyController } from '../controllers/BiographyController.js';

export const routes = [
  {
    path: '/',          // home
    controller: HomeController
  },
  {
    path: '/_mvc/index.html',  // home page
    controller: HomeController
  },
  {
    path: '/_mvc/bio.html',     // biografia
    controller: BiographyController
  }
];

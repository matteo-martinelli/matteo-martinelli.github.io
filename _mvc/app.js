import { Router } from "./app/router/Router.js";


function run() {
  console.log('app.js uploaded');

  document.addEventListener('DOMContentLoaded', () => {
    const router = new Router('#app');
    router.init();
  });
}

run();

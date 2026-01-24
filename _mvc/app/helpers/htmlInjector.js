export async function includePartial(selector, url) {
  const container = document.querySelector(selector);
  if (!container) return;

  const res = await fetch(url);
  const html = await res.text();
  // container.innerHTML = html;
  container.insertAdjacentHTML('beforeend', html);
}
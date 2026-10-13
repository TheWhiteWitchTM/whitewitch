function base(html, selector = null) {
  const targets = selector
    ? document.querySelectorAll(selector)
    : document.querySelectorAll('[data-component]');

  const inserted = [];

  targets.forEach(el => {
    el.innerHTML = html;
    // return the element(s) that now contain the injected HTML
    inserted.push(...el.children);
  });

  // return a single element if only one, otherwise the array
  return inserted.length === 1 ? inserted[0] : inserted;
}


---
layout: home
title: The White Witch™
description: Politics and social events. Facts & data first. I want you smarter, not recruited.
---

<p align="center">
  <img src="https://pbs.twimg.com/media/HUNMWkbWUAE7b5d.jpg" width="100%" alt="The White Witch banner" />
</p>

<div class="intro">
  <p align="center">
    <strong>Politics and social events. Facts & data first.</strong><br>
    I want you smarter, not recruited.<br>
    No paid posts. No quiet sponsors.<br>
    Argue with the data, not the caption.
  </p>

  <p align="center">
    <em>Enter at your own risk. Side effects may include thinking for yourself, mild eye-rolling, and an inexplicable urge to check the source.</em>
  </p>

  <p align="center">
    🎥 Resuming YouTube videos in November.<br>
    Same energy, more receipts, and zero interest in your feelings about the data.
  </p>
</div>

## 🚨 Featured

<div class="featured-list">
{% assign featured = "" | split: "" %}
{% for post in site.blog %}
  {% if post.featured %}{% assign featured = featured | push: post %}{% endif %}
{% endfor %}
{% for post in site.politics %}
  {% if post.featured %}{% assign featured = featured | push: post %}{% endif %}
{% endfor %}
{% assign featured = featured | sort: "date" | reverse %}

{% for post in featured limit: 6 %}
  <article class="featured-item" data-url="{{ post.url | relative_url }}">
    <h2 class="toggle-title">
      <span class="toggle-emoji" title="Expand / collapse">▼</span>
      <span class="title-text">{{ post.title }}</span>
    </h2>

    <div class="excerpt">
      {{ post.content | strip_html | truncate: 300 }}
    </div>

    {% if post.video %}
      {% assign yt_id = post.video | split: "/" | last | split: "?" | first | replace: "watch?v=", "" | replace: "youtu.be/", "" %}
      <div class="featured-media">
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/{{ yt_id }}" frameborder="0" allowfullscreen loading="lazy"></iframe>
      </div>
    {% elsif post.image %}
      <img src="{{ post.image | relative_url }}" alt="" class="featured-image" loading="lazy">
    {% endif %}

    <div class="button-row">
      <button class="expand-btn" type="button" title="Expand / collapse">▼ Show more</button>
      <button class="discussion-btn" type="button" title="Toggle discussion">💬 Discussion</button>
    </div>

    <div class="full-content" hidden></div>
    <div class="giscus-container" hidden></div>
  </article>
{% else %}
  <p>No featured posts yet.</p>
{% endfor %}
</div>

<style>
.intro { margin: 2rem 0 3rem; }
.featured-item { margin: 2rem 0; padding-bottom: 1.5rem; border-bottom: 1px solid #222; }
.featured-image, .featured-media { max-width: 100%; margin: 0.75rem 0; border-radius: 6px; }
.featured-media iframe { border-radius: 6px; max-width: 100%; }
.toggle-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
  margin-bottom: 0.4rem;
}
.toggle-title:hover .title-text { text-decoration: underline; }
.toggle-emoji { font-size: 0.9em; }
.excerpt { margin-bottom: 0.6rem; }
.button-row {
  display: flex;
  gap: 0.75rem;
  margin: 0.6rem 0 0.4rem;
  flex-wrap: wrap;
}
.expand-btn,
.discussion-btn {
  background: transparent;
  color: #c9a6ff;
  border: 1px solid #c9a6ff;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}
.expand-btn:hover,
.discussion-btn:hover {
  background: #c9a6ff;
  color: #0a0a0a;
}
.full-content { margin-top: 0.6rem; }
.giscus-container { margin-top: 1rem; }
.excerpt.hidden { display: none; }
</style>

<script>
document.querySelectorAll('.featured-item').forEach(item => {
  const title = item.querySelector('.toggle-title');
  const emoji = item.querySelector('.toggle-emoji');
  const expandBtn = item.querySelector('.expand-btn');
  const discBtn = item.querySelector('.discussion-btn');
  const excerpt = item.querySelector('.excerpt');
  const full = item.querySelector('.full-content');
  const giscus = item.querySelector('.giscus-container');
  const url = item.dataset.url;

  const collapse = () => {
    full.setAttribute('hidden', '');
    excerpt.classList.remove('hidden');
    expandBtn.innerHTML = '▼ Show more';
    emoji.textContent = '▼';
  };

  const expand = async () => {
    if (!full.dataset.loaded) {
      expandBtn.textContent = 'Loading…';
      try {
        const res = await fetch(url);
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const content = doc.querySelector('.content-area') || doc.querySelector('main');
        const back = content.querySelector('a[href*="blog"], a[href*="politics"]');
        if (back) back.closest('p')?.remove() || back.remove();
        full.innerHTML = content.innerHTML;
        full.dataset.loaded = 'true';
      } catch (e) {
        full.innerHTML = '<p>Could not load post.</p>';
      }
    }
    full.removeAttribute('hidden');
    excerpt.classList.add('hidden');
    expandBtn.innerHTML = '▲ Show less';
    emoji.textContent = '▲';
  };

  const toggleExpand = () => {
    if (full.hasAttribute('hidden')) expand();
    else collapse();
  };

  title.addEventListener('click', toggleExpand);
  expandBtn.addEventListener('click', toggleExpand);

  discBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (giscus.hasAttribute('hidden')) {
      if (!giscus.dataset.loaded) {
        discBtn.textContent = 'Loading…';
        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.setAttribute('data-repo', '{{ site.data.giscus.repo | default: "TheWhiteWitchTM/whitewitch" }}');
        script.setAttribute('data-repo-id', '{{ site.data.giscus.repo_id }}');
        script.setAttribute('data-category', '{{ site.data.giscus.category }}');
        script.setAttribute('data-category-id', '{{ site.data.giscus.category_id }}');
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-theme', 'dark');
        script.setAttribute('data-lang', 'en');
        script.crossOrigin = 'anonymous';
        script.async = true;
        giscus.appendChild(script);
        giscus.dataset.loaded = 'true';
      }
      giscus.removeAttribute('hidden');
      discBtn.innerHTML = '💬 Discussion off';
    } else {
      giscus.setAttribute('hidden', '');
      discBtn.innerHTML = '💬 Discussion';
    }
  });
});
</script>

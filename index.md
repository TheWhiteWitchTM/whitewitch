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
      <span class="toggle-emoji">▼</span>
      <span class="title-text">{{ post.title }}</span>
    </h2>

    <div class="excerpt">
      {{ post.content | strip_html | truncate: 300 }}
      <button class="expand-btn" type="button">Show more</button>
    </div>

    {% if post.video %}
      {% assign yt_id = post.video | split: "/" | last | split: "?" | first | replace: "watch?v=", "" | replace: "youtu.be/", "" %}
      <div class="featured-media">
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/{{ yt_id }}" frameborder="0" allowfullscreen loading="lazy"></iframe>
      </div>
    {% elsif post.image %}
      <img src="{{ post.image | relative_url }}" alt="" class="featured-image" loading="lazy">
    {% endif %}

    <div class="full-content" hidden></div>
  </article>
{% else %}
  <p>No featured posts yet.</p>
{% endfor %}
</div>

{% include discussion.html %}

<style>
.intro { margin: 2rem 0 3rem; }
.featured-item { margin: 2rem 0; padding-bottom: 1.5rem; border-bottom: 1px solid #222; }
.featured-image, .featured-media { max-width: 100%; margin: 0.75rem 0; border-radius: 6px; }
.featured-media iframe { border-radius: 6px; max-width: 100%; }
.toggle-title {
  cursor: pointer;
  user-select: none;
  margin-bottom: 0.4rem;
}
.toggle-title:hover .title-text { text-decoration: underline; }
.toggle-emoji { margin-right: 0.4rem; font-size: 0.9em; }
.excerpt .expand-btn {
  display: inline;
  margin-left: 0.4rem;
  background: none;
  border: none;
  color: #c9a6ff;
  cursor: pointer;
  padding: 0;
  font-size: inherit;
}
.excerpt .expand-btn:hover { text-decoration: underline; }
.full-content { margin-top: 0.6rem; }
.discussion-btn {
  background: transparent;
  color: #c9a6ff;
  border: 1px solid #c9a6ff;
  padding: 0.35rem 0.9rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 2rem;
}
.discussion-btn:hover { background: #c9a6ff; color: #0a0a0a; }
</style>

<script>
document.querySelectorAll('.featured-item').forEach(item => {
  const title = item.querySelector('.toggle-title');
  const emoji = item.querySelector('.toggle-emoji');
  const btn = item.querySelector('.expand-btn');
  const full = item.querySelector('.full-content');
  const url = item.dataset.url;

  const collapse = () => {
    full.setAttribute('hidden', '');
    btn.textContent = 'Show more';
    emoji.textContent = '▼';
  };

  const expand = async () => {
    if (!full.dataset.loaded) {
      btn.textContent = 'Loading…';
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
    btn.textContent = 'Show less';
    emoji.textContent = '▲';
  };

  const toggle = () => {
    if (full.hasAttribute('hidden')) expand();
    else collapse();
  };

  title.addEventListener('click', toggle);
  btn.addEventListener('click', toggle);
});
</script>

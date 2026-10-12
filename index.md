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

<div class="post-list">
{% assign featured = "" | split: "" %}
{% for post in site.blog %}
  {% if post.featured %}{% assign featured = featured | push: post %}{% endif %}
{% endfor %}
{% for post in site.politics %}
  {% if post.featured %}{% assign featured = featured | push: post %}{% endif %}
{% endfor %}
{% assign featured = featured | sort: "date" | reverse %}

{% for post in featured limit: 6 %}
  <article class="post-item" data-url="{{ post.url | relative_url }}">
    <h2 class="toggle-title">
      <span class="toggle-emoji" title="Expand / collapse">▼</span>
      <span class="title-text">{{ post.title }}</span>
    </h2>

    <div class="excerpt">
      {{ post.content | strip_html | truncate: 300 }}
    </div>

    {% if post.video %}
      {% assign yt_id = post.video | split: "/" | last | split: "?" | first | replace: "watch?v=", "" | replace: "youtu.be/", "" %}
      <div class="post-media">
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/{{ yt_id }}" frameborder="0" allowfullscreen loading="lazy"></iframe>
      </div>
    {% elsif post.image %}
      <img src="{{ post.image | relative_url }}" alt="" class="post-image" loading="lazy">
    {% endif %}

    <div class="full-content" hidden></div>

    <div class="button-row">
      <button class="expand-btn" type="button" title="Expand / collapse">▼ Show more</button>
    </div>

    {% include discussion.html %}
  </article>
{% else %}
  <p>No featured posts yet.</p>
{% endfor %}
</div>

<script>
document.querySelectorAll('.post-item').forEach(item => {
  const title = item.querySelector('.toggle-title');
  const emoji = item.querySelector('.toggle-emoji');
  const expandBtn = item.querySelector('.expand-btn');
  const excerpt = item.querySelector('.excerpt');
  const full = item.querySelector('.full-content');
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
});
</script>

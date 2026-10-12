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

## Featured

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
    <h2>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
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

    <button class="expand-btn" type="button">Show more</button>

    <div class="full-content" hidden>
      <button class="close-btn" type="button" aria-label="Close">×</button>
    </div>
  </article>
{% else %}
  <p>No featured posts yet.</p>
{% endfor %}
</div>

<style>
.intro {
  margin: 2rem 0 3rem;
}
.featured-item {
  margin: 2rem 0;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #222;
  position: relative;
}
.featured-image,
.featured-media {
  max-width: 100%;
  margin: 0.75rem 0;
  border-radius: 6px;
}
.featured-media iframe {
  border-radius: 6px;
  max-width: 100%;
}
.expand-btn,
.close-btn {
  background: transparent;
  color: #c9a6ff;
  border: 1px solid #c9a6ff;
  padding: 0.35rem 0.9rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}
.close-btn {
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  font-size: 1.5rem;
  line-height: 1;
  padding: 0.15rem 0.45rem;
  border: none;
}
.expand-btn:hover,
.close-btn:hover {
  background: #c9a6ff;
  color: #0a0a0a;
}
.full-content {
  margin-top: 1rem;
  position: relative;
}
</style>

<script>
document.querySelectorAll('.featured-item').forEach(item => {
  const btn = item.querySelector('.expand-btn');
  const full = item.querySelector('.full-content');
  const closeBtn = item.querySelector('.close-btn');
  const url = item.dataset.url;

  const collapse = () => {
    full.setAttribute('hidden', '');
    btn.textContent = 'Show more';
  };

  btn.addEventListener('click', async () => {
    if (full.hasAttribute('hidden')) {
      if (!full.dataset.loaded) {
        btn.textContent = 'Loading…';
        try {
          const res = await fetch(url);
          const html = await res.text();
          const doc = new DOMParser().parseFromString(html, 'text/html');
          const content = doc.querySelector('.content-area') || doc.querySelector('main') || doc.body;
          full.insertAdjacentHTML('beforeend', content.innerHTML);
          full.dataset.loaded = 'true';
        } catch (e) {
          full.insertAdjacentHTML('beforeend', '<p>Could not load post.</p>');
        }
      }
      full.removeAttribute('hidden');
      btn.textContent = 'Show less';
    } else {
      collapse();
    }
  });

  closeBtn.addEventListener('click', collapse);
});
</script>

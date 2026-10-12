---
layout: default
title: Blog
permalink: /blog/
---

# 📝 Blog

<div class="post-list">
{% for item in site.blog %}
  <article class="post-item" data-url="{{ item.url | relative_url }}">
    <h2 class="toggle-title">
      <span class="toggle-emoji" title="Expand / collapse">▼</span>
      <span class="title-text">{{ item.title }}</span>
    </h2>

    <div class="excerpt">
      {{ item.content | strip_html | truncate: 300 }}
    </div>

    {% if item.video %}
      {% assign yt_id = item.video | split: "/" | last | split: "?" | first | replace: "watch?v=", "" | replace: "youtu.be/", "" %}
      <div class="post-media">
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/{{ yt_id }}" frameborder="0" allowfullscreen loading="lazy"></iframe>
      </div>
    {% elsif item.image %}
      <img src="{{ item.image | relative_url }}" alt="" class="post-image" loading="lazy">
    {% endif %}

    <div class="full-content" hidden></div>

    <div class="button-row">
      <button class="expand-btn" type="button" title="Expand / collapse">▼ Show more</button>
      {% include discussion.html %}
    </div>
  </article>
{% endfor %}
</div>

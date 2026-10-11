---
layout: default
title: Blog
permalink: /blog/
---

# Blog

<div class="post-list">
{% for item in site.blog %}
  <article class="post-card">
    <h2><a href="{{ item.url | relative_url }}">{{ item.title }}</a></h2>
    {% if item.description %}
      <p class="post-description">{{ item.description }}</p>
    {% elsif item.excerpt %}
      <p class="post-description">{{ item.excerpt }}</p>
    {% endif %}
  </article>
{% endfor %}
</div>
```

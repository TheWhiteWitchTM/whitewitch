---
layout: default
title: Politics
permalink: /politics/
---

# Politics

<div class="post-list">
{% for item in site.politics %}
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

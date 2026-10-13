---
layout: default
title: Blog
permalink: /blog/
---

# 📝 Blog

<div class="post-list">
{% for item in site.blog %}
  {% include post-card.html post=item %}
{% endfor %}
</div>

---
layout: default
title: Rants
permalink: /rants/
---

# 😡 Rants

<div class="post-list">
{% for item in site.rants %}
  {% include post-card.html post=item %}
{% endfor %}
</div>

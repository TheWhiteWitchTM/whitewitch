---
layout: default
title: Politics
permalink: /politics/
---

# 🤮 Politics

<div class="post-list">
{% for item in site.politics %}
  {% include post-card.html post=item %}
{% endfor %}
</div>

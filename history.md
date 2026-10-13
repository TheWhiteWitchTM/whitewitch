---
layout: default
title: History
permalink: /history/
---

# 📜 History

<div class="post-list">
{% for item in site.history %}
  {% include post-card.html post=item %}
{% endfor %}
</div>

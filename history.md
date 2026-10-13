---
layout: default
title: History
description: History with receipts. Columbus, wars, and the parts textbooks leave out.
image: /assets/images/history.jpg
permalink: /history/
---

# 📜 History

The version that doesn’t require you to pretend the uncomfortable parts didn’t happen. Receipts preferred. Soft landings not included.

<div class="post-list">
{% for item in site.history %}
  {% include post-card.html post=item %}
{% endfor %}
</div>

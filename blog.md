---
layout: default
title: Blog
description: Games, tools, and whatever else doesn’t fit the other collections. Still facts first.
image: /assets/images/blog.jpg
permalink: /blog/
---

# 📝 Blog

The stuff that isn’t politics, history, or a rant. Games, tools, and the occasional experiment. Same rules: no paid posts, no quiet sponsors, and no pretending the data doesn’t matter.

<div class="post-list">
{% for item in site.blog %}
  {% include post-card.html post=item %}
{% endfor %}
</div>

---
layout: default
title: Blog
description: Games, tools, and whatever else doesn’t fit the other collections. Still facts first.
image: /assets/images/blog.jpg
image_width: 1200
image_height: 630
permalink: /blog/
---

{% assign items = site.blog | sort: "date" | reverse %}

{% include tag-filter.html title="📝 Blog" collection=items %}

<p>The stuff that isn’t politics, history, or a rant. Games, tools, and the occasional experiment. Same rules: no paid posts, no quiet sponsors, and no pretending the data doesn’t matter.</p>

<hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid #333;">

{% if items.size > 0 %}
  {% include post-list.html collection=items %}
{% else %}
  <p>No blog posts yet.</p>
{% endif %}

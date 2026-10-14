---
layout: default
title: Blog
description: Games, tools, and whatever else doesn’t fit the other collections. Still facts first.
image: /assets/images/blog.jpg
permalink: /blog/
---

# 📝 Blog

The stuff that isn’t politics, history, or a rant. Games, tools, and the occasional experiment. Same rules: no paid posts, no quiet sponsors, and no pretending the data doesn’t matter.

{% assign blog_posts = "" | split: "" %}
{% for post in site.posts %}
  {% if post.path contains "_posts/blog/" %}
    {% assign blog_posts = blog_posts | push: post %}
  {% endif %}
{% endfor %}

{% include post-list.html collection=blog_posts %}

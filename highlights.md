---
layout: default
title: Highlights
description: Selected pieces worth reading twice.
permalink: /highlights/
---

# ✨ Highlights

<div class="post-list">
{% assign highlights = "" | split: "" %}
{% for collection in site.collections %}
  {% for post in collection.docs %}
    {% if post.highlights %}
      {% assign highlights = highlights | push: post %}
    {% endif %}
  {% endfor %}
{% endfor %}
{% assign highlights = highlights | sort: "date" | reverse %}

{% for post in highlights %}
  {% include post-card.html post=post %}
{% else %}
  <p>No highlights yet.</p>
{% endfor %}
</div>

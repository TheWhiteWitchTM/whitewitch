---
layout: default
title: Highlights
description: The pieces I actually stand behind. Dark humor, sarcasm, and the ones that didn’t make me want to close the tab.
image: /assets/images/highlights.jpg
permalink: /highlights/
---

# ✨ Highlights

Some of these took longer than they should have. Some of them I still like. All of them survived the “is this actually worth posting” filter, which is a higher bar than most people use.

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

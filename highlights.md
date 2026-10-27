---
layout: default
title: Highlights
description: The pieces I actually stand behind.
permalink: /highlights/
---

{% assign highlights = "" | split: "" %}
{% for collection in site.collections %}
  {% for post in collection.docs %}
    {% if post.highlight or post.highlights %}
      {% assign highlights = highlights | push: post %}
    {% endif %}
  {% endfor %}
{% endfor %}
{% assign highlights = highlights | sort: "date" | reverse %}

{% include tag-filter.html title="✨ Highlights" collection=highlights %}

<p>Some of these took longer than they should have. Some of them I still like. All of them survived the “is this actually worth posting” filter, which is a higher bar than most people use.</p>

<hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid #333;">

{% if highlights.size > 0 %}
  {% include post-list.html collection=highlights %}
{% else %}
  <p>No highlights yet.</p>
{% endif %}

---
layout: default
title: Articles
permalink: /articles/
---

{% assign items = site.articles | sort: "date" | reverse %}

{% include tag-filter.html title="📜 Articles" collection=items %}

<p>Longer pieces.</p>

<hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid #333;">

{% if items.size > 0 %}
  {% include post-list.html collection=items %}
{% else %}
  <p>No articles yet.</p>
{% endif %}

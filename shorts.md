---
layout: default
title: Shorts
permalink: /shorts/
---

{% assign items = site.shorts | sort: "date" | reverse %}

{% include tag-filter.html title="⚡ Shorts" collection=items %}

<p>Short posts. Quick takes.</p>

<hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid #333;">

{% if items.size > 0 %}
  {% include post-list.html collection=items %}
{% else %}
  <p>No shorts yet.</p>
{% endif %}

---
layout: default
title: Videos
permalink: /videos/
---

{% assign items = site.videos | sort: "date" | reverse %}

{% include tag-filter.html title="🎥 Videos" collection=items %}

<p>Videos.</p>

<hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid #333;">

{% if items.size > 0 %}
  {% include post-list.html collection=items %}
{% else %}
  <p>No videos yet.</p>
{% endif %}

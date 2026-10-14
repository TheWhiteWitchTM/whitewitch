---
layout: default
title: Shorts
description: Quick takes. Less patience, same data.
permalink: /shorts/
---

{% assign items = site.shorts | sort: "date" | reverse %}

{% include tag-filter.html title="⚡ Shorts" collection=items %}

<p>The short ones.</p>
<p>Less setup, less patience, same refusal to pretend the numbers say something else.</p>
<p>If it needed three paragraphs it wouldn’t be here.</p>

<hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid #333;">

{% if items.size > 0 %}
  {% include post-list.html collection=items %}
{% else %}
  <p>No shorts yet.</p>
{% endif %}

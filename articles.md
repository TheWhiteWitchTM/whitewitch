---
layout: default
title: Articles
description: Longer pieces. More context, more sources, still no interest in your feelings.
permalink: /articles/
---

{% assign items = site.articles | sort: "date" | reverse %}

{% include tag-filter.html title="📜 Articles" collection=items %}

<p>The longer ones.</p>
<p>More context, more sources, more room to show the paper trail.</p>
<p>Still zero interest in how the data makes you feel.</p>

<hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid #333;">

{% if items.size > 0 %}
  {% include post-list.html collection=items %}
{% else %}
  <p>No articles yet.</p>
{% endif %}

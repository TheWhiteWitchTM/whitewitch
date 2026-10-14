---
layout: default
title: Videos
description: Receipts with a timeline. Same energy, harder to ignore.
permalink: /videos/
---

{% assign items = site.videos | sort: "date" | reverse %}

{% include tag-filter.html title="🎥 Videos" collection=items %}

<p>Receipts with a timeline.</p>
<p>Same facts, same sarcasm, just harder to skim past when they’re moving.</p>
<p>Argue with the footage, not the caption.</p>

<hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid #333;">

{% if items.size > 0 %}
  {% include post-list.html collection=items %}
{% else %}
  <p>No videos yet.</p>
{% endif %}

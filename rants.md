---
layout: default
title: Rants
description: Things that make me angry. Short, blunt, and not interested in your feelings about it.
image: /assets/images/rants.jpg
image_width: 1200
image_height: 630
permalink: /rants/
---

{% assign items = site.rants | sort: "date" | reverse %}

{% include tag-filter.html title="😡 Rants" collection=items %}

<p>These are the ones that made me close the laptop, open it again, and still hit publish.</p>
<p>Angry, blunt, and still checked against the data.</p>
<p>Soft takes stay out. Accuracy does not.</p>

<hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid #333;">

{% if items.size > 0 %}
  {% include post-list.html collection=items %}
{% else %}
  <p>No rants yet.</p>
{% endif %}

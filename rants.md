---
layout: default
title: Rants
description: Things that make me angry. Short, blunt, and not interested in your feelings about it.
image: /assets/images/rants.jpg
permalink: /rants/
---

# 😡 Rants

These are the ones that made me close the laptop, open it again, and still hit publish. Dark humor is optional. Accuracy is not. Soft takes stay out.

<div class="post-list">
{% for item in site.rants %}
  {% include post-card.html post=item %}
{% endfor %}
</div>

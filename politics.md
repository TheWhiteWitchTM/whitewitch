---
layout: default
title: Politics
description: US and German politics. Facts first, sarcasm included, no quiet sponsors.
image: /assets/images/politics.jpg
permalink: /politics/
---

# 🤮 Politics

Both passports are real, so both countries get the same treatment. Data first. Feelings last. Propaganda from either side gets the same mockery.

<div class="post-list">
{% for item in site.politics %}
  {% include post-card.html post=item %}
{% endfor %}
</div>

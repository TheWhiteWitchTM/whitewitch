---
layout: home
title: The White Witch™
description: Politics and social events. Facts & data first. I want you smarter, not recruited.
---

<p align="center">
  <img src="{{ '/assets/images/site.jpg' | relative_url }}" width="100%" alt="The White Witch banner" />
</p>

<div class="intro">
  <p align="center">
    <strong>Politics and social events. Facts & data first.</strong><br>
    I want you smarter, not recruited.<br>
    No paid posts. No quiet sponsors.<br>
    Argue with the data, not the caption.
  </p>
  <p align="center">
    <em>Enter at your own risk. Side effects may include thinking for yourself, mild eye-rolling, and an inexplicable urge to check the source.</em>
  </p>
  <p align="center">
    🎥 Resuming YouTube videos in November.<br>
    Same energy, more receipts, and zero interest in your feelings about the data.
  </p>
</div>

## 🚨 Featured

<div class="post-list">
{% assign featured = "" | split: "" %}
{% for collection in site.collections %}
  {% for post in collection.docs %}
    {% if post.featured %}
      {% assign featured = featured | push: post %}
    {% endif %}
  {% endfor %}
{% endfor %}
{% assign featured = featured | sort: "date" | reverse %}

{% for post in featured limit: 6 %}
  {% include post-card.html post=post %}
{% else %}
  <p>No featured posts yet.</p>
{% endfor %}
</div>

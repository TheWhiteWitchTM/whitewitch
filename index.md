---
layout: home
title: The White Witch™
description: Politics and social events, facts first. LibreSky is the Bluesky client. Emoji games, MAGIC, and the old machines sit beside the long pages.
---

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
  <p align="center">
    🌤️ <a href="https://thewhitewitchtm.github.io/LibreSky/">LibreSky</a> is the Bluesky client. Edit, voice, video, and chat. The password stays with Bluesky.
    <a href="https://thewhitewitchtm.github.io/corporate/">LibreSky Corporate</a> is the edition you host. Coming soon.<br>
    🗂️ <a href="https://thewhitewitchtm.github.io/sociallydead/">SociallyDead</a> is a directory of social media.<br>
    🕹️ The games are on <a href="https://thewhitewitchtm.github.io/emojigames/">Emoji Games</a>.
    🪄 <a href="{{ '/magic/' | relative_url }}">MAGIC</a> is the language.
    <a href="{{ '/magic/retro/' | relative_url }}">RETRO MAGIC</a> is the old machines.<br>
    🧪 The lab is <a href="https://thewhitewitchtm.github.io/mira/">Mira's World</a>.
    The card for the whole desk is <a href="https://thewhitewitchtm.github.io/">thewhitewitchtm.github.io</a>.
  </p>
</div>

## 🚨 Featured

{% assign featured = "" | split: "" %}
{% for collection in site.collections %}
  {% for post in collection.docs %}
    {% if post.featured %}
      {% assign featured = featured | push: post %}
    {% endif %}
  {% endfor %}
{% endfor %}

{% include post-list.html collection=featured %}

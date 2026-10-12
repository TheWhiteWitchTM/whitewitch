---
layout: home
title: The White Witch™
description: Politics and social events. Facts & data first. I want you smarter, not recruited.
---

<p align="center">
  <img src="https://pbs.twimg.com/media/HUNMWkbWUAE7b5d.jpg" width="100%" alt="The White Witch banner" />
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

<div class="featured-list">
{% assign featured = "" | split: "" %}
{% for post in site.blog %}
  {% if post.featured %}{% assign featured = featured | push: post %}{% endif %}
{% endfor %}
{% for post in site.politics %}
  {% if post.featured %}{% assign featured = featured | push: post %}{% endif %}
{% endfor %}
{% assign featured = featured | sort: "date" | reverse %}

{% for post in featured limit: 6 %}
  <article class="featured-item" data-url="{{ post.url | relative_url }}">
    <h2 class="toggle-title">
      <span class="toggle-emoji" title="Expand / collapse">▼</span>
      <span class="title-text">{{ post.title }}</span>
      <button class="discussion-btn" type="button" title="Toggle discussion">💬</button>
    </h2>

    <div class="excerpt">
      {{ post.content | strip_html | truncate: 300 }}
      <button class="expand-btn" type="button">Show more</button>
    </div>

    {% if post.video %}
      {% assign yt_id = post.video | split: "/" | last | split: "?" | first | replace: "watch?v=", "" | replace: "youtu.be/", "" %}
      <div class="featured-media">
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/{{ yt_id }}" frameborder="0" allowfullscreen loading="lazy"></iframe>
      </div>
    {% elsif post.image %}
      <img src="{{ post.image | relative_url }}" alt="" class="featured-image" loading="lazy">
    {% endif %}

    <div class="full-content" hidden></div>
    <div class="giscus-container" hidden></div>
  </article>
{% else %}
  <p>No featured posts yet.</p>
{% endfor %}
</div>

<style>
.intro { margin: 2rem 0 3rem; }
.featured-item { margin: 2rem 0; padding-bottom: 1.5rem; border-bottom: 1px solid #222; }
.featured-image, .featured-

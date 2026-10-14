---
layout: default
title: Highlights
description: The pieces I actually stand behind.
permalink: /highlights/
---

# ✨ Highlights

Some of these took longer than they should have. Some of them I still like. All of them survived the “is this actually worth posting” filter.

<select id="tag-filter">
  <option value="">All</option>
  {% assign all_tags = "" | split: "" %}
  {% for collection in site.collections %}
    {% for post in collection.docs %}
      {% if post.highlights and post.tags %}
        {% for tag in post.tags %}
          {% unless all_tags contains tag %}
            {% assign all_tags = all_tags | push: tag %}
          {% endunless %}
        {% endfor %}
      {% endif %}
    {% endfor %}
  {% endfor %}
  {% assign all_tags = all_tags | sort %}
  {% for tag in all_tags %}
    <option value="{{ tag }}">{{ tag }}</option>
  {% endfor %}
</select>

<div class="post-list" id="post-list">
  {% assign highlights = "" | split: "" %}
  {% for collection in site.collections %}
    {% for post in collection.docs %}
      {% if post.highlights %}
        {% assign highlights = highlights | push: post %}
      {% endif %}
    {% endfor %}
  {% endfor %}
  {% assign highlights = highlights | sort: "date" | reverse %}

  {% for post in highlights %}
    <div class="post-item" data-tags="{{ post.tags | join: ',' }}">
      {% include post-card.html post=post %}
    </div>
  {% else %}
    <p>No highlights yet.</p>
  {% endfor %}
</div>

<script>
document.getElementById('tag-filter').addEventListener('change', function () {
  const selected = this.value.toLowerCase();
  document.querySelectorAll('#post-list .post-item').forEach(function (el) {
    const tags = (el.dataset.tags || '').toLowerCase();
    el.style.display = (!selected || tags.split(',').map(t => t.trim()).includes(selected)) ? '' : 'none';
  });
});
</script>

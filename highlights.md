---
layout: default
title: Highlights
description: The pieces I actually stand behind.
permalink: /highlights/
---

<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1rem;">
  <h1 style="margin: 0;">✨ Highlights</h1>
  <div>
    <label for="tag-filter">👁️ Show:</label>
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
  </div>
</div>

<p>Some of these took longer than they should have. Some of them I still like. All of them survived the “is this actually worth posting” filter, which is a higher bar than most people use.</p>

{% assign highlights = "" | split: "" %}
{% for collection in site.collections %}
  {% for post in collection.docs %}
    {% if post.highlights %}
      {% assign highlights = highlights | push: post %}
    {% endif %}
  {% endfor %}
{% endfor %}
{% assign highlights = highlights | sort: "date" | reverse %}

{% if highlights.size > 0 %}
  {% include post-list.html collection=highlights %}
{% else %}
  <p>No highlights yet.</p>
{% endif %}

<script>
(function () {
  const select = document.getElementById('tag-filter');
  if (!select) return;
  select.addEventListener('change', function () {
    const selected = this.value.toLowerCase();
    document.querySelectorAll('.post-item').forEach(function (el) {
      const tags = (el.dataset.tags || '').toLowerCase();
      const list = tags.split(',').map(function (t) { return t.trim(); });
      el.style.display = (!selected || list.indexOf(selected) !== -1) ? '' : 'none';
    });
  });
})();
</script>

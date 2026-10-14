---
layout: default
title: Highlights
description: The pieces I actually stand behind.
permalink: /highlights/
---

# ✨ Highlights

Some of these took longer than they should have. Some of them I still like. All of them survived the “is this actually worth posting” filter.

<div class="tag-filter" style="margin: 1rem 0 1.5rem;">
  <label for="tag-filter">Filter:</label>
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

  // Add data-tags to the existing .post-item articles for filtering
  document.querySelectorAll('.post-item').forEach(function (el) {
    // The tags aren't on the article yet, so we skip for now or you can extend post-card later
  });

  select.addEventListener('change', function () {
    const selected = this.value.toLowerCase();
    document.querySelectorAll('.post-item').forEach(function (el) {
      // For now this just shows all; see note below
      el.style.display = '';
    });
  });
})();
</script>

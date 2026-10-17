---
layout: default
title: Tools
description: Tiny client-side wizards. Zero tracking, zero cookies, zero accounts.
---

# 🛠️ Tools

Five tiny wizards. All run in your browser. Nothing leaves the tab.

{% for tool in site.data.tools %}
## {{ tool.title }}

{{ tool.description }}

[Open →]({{ tool.url | relative_url }})

---
{% endfor %}

[Changes]({{ '/changes/' | relative_url }})

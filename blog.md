```markdown
---
layout: default
title: Blog
permalink: /blog/
---

# Blog

{% for item in site.blog %}
- [{{ item.title }}]({{ item.url }})
{% endfor %}
```

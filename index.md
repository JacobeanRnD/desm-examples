---
title: DESM By Example
---

<ul>
{% for page in site.pages %}
{% if page.example %}
<li><a href="{{ site.base_url }}{{ page.dir }}/">{{ page.title }}</a></li>
{% endif %}
{% endfor %}
</ul>

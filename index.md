---
title: DESM By Example
---

<ul>
{% for page in site.pages %}
{% if page.example %}
<li><a href="{{ page.dir }}/">{{ page.title }}</a></li>
{% endif %}
{% endfor %}
</ul>

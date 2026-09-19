import re

with open('data/amrf/amrf-data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

subcategories = re.findall(r'"subcategoryId":\s*"([^"]+)"', text)
print("Subcategories in AMRF_DATA:", set(subcategories))
colors = re.findall(r'"color":\s*"([^"]+)"', text)
print("Colors in AMRF_DATA:", set(colors))

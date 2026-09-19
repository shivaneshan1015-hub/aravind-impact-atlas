import re

with open('data/laico/laico-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

counts = [int(m.group(1)) for m in re.finditer(r'"hospitalCount":\s*(\d+)', content)]
print("Sum of hospitalCount:", sum(counts))
print("Total capacity building location entries:", len(counts))

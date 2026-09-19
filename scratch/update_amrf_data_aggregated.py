import json

with open("data/amrf/amrf-data.ts", "r", encoding="utf-8") as f:
    lines = f.readlines()

# Find start of amrf_scholar_comp_1 / amrf_phd_completed_ and end of amrf_collab_ulster
start_idx = -1
end_idx = -1

for idx, line in enumerate(lines):
    if '"id": "amrf_scholar_comp_1"' in line or '"id": "amrf_phd_completed_' in line:
        for k in range(idx, -1, -1):
            if "{" in lines[k]:
                start_idx = k
                break
        break

for idx, line in enumerate(lines):
    if '"id": "amrf_collab_ulster"' in line:
        for k in range(idx, -1, -1):
            if "{" in lines[k]:
                end_idx = k
                break
        break

print(f"Replacing lines {start_idx} to {end_idx}")

with open("scratch/amrf_phd_aggregated.json", "r", encoding="utf-8") as f:
    items = json.load(f)

new_code = []
for item in items:
    new_code.append("  " + json.dumps(item, indent=4).replace("\n", "\n  ") + ",\n")

merged_lines = lines[:start_idx] + ["".join(new_code)] + lines[end_idx:]

with open("data/amrf/amrf-data.ts", "w", encoding="utf-8") as f:
    f.writelines(merged_lines)

print("data/amrf/amrf-data.ts updated successfully with aggregated Ph.D. city nodes!")

import json

with open("scratch/amrf_phd_v2.json", "r", encoding="utf-8") as f:
    phd_data = json.load(f)

completed_nodes = phd_data["completed"]
ongoing_nodes = phd_data["ongoing"]

with open("data/amrf/amrf-data.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Locate amrf_hq item start
hq_index = content.find('"id": "amrf_hq"')
if hq_index == -1:
    raise ValueError("Could not find amrf_hq")

# Find the end of amrf_hq object
hq_end = content.find('  },', hq_index) + 4

# Locate start of collaboratives item
collab_index = content.find('"id": "amrf_collab_ulster"')
if collab_index == -1:
    raise ValueError("Could not find amrf_collab_ulster")

# Find opening brace of collab item
collab_start = content.rfind('  {\n', 0, collab_index)

# Prepare JSON string for nodes
all_phd_nodes = completed_nodes + ongoing_nodes
formatted_nodes = []
for node in all_phd_nodes:
    node_str = "  " + json.dumps(node, indent=4).replace("\n", "\n  ")
    formatted_nodes.append(node_str)

new_nodes_code = ",\n" + ",\n".join(formatted_nodes) + ",\n"

new_content = content[:hq_end] + new_nodes_code + content[collab_start:]

with open("data/amrf/amrf-data.ts", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Successfully updated data/amrf/amrf-data.ts with new aggregated Ph.D. nodes!")

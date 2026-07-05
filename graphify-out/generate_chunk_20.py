import json
import os

manifest_path = r"C:\Users\Felipe Proença\Desktop\editor-de-banners-e-imagens\open desing\open-design\graphify-out\.graphify_chunk_20_manifest.txt"
output_path = r"C:\Users\Felipe Proença\Desktop\editor-de-banners-e-imagens\open desing\open-design\graphify-out\.graphify_chunk_20.json"

# Read manifest
with open(manifest_path, 'r', encoding='utf-8') as f:
    file_paths = [line.strip() for line in f if line.strip()]

nodes = []
edges = []
hyperedge_nodes = []

# Project node
project_id = "raphaeltattoo_project"
project_label = "Raphael Tattoo Project"
project_node = {
    "id": project_id,
    "label": project_label,
    "file_type": "concept",
    "source_file": file_paths[0] if file_paths else "",
    "source_location": None,
    "source_url": None,
    "captured_at": None,
    "author": None,
    "contributor": None
}
nodes.append(project_node)

# Process each image file
for file_path in file_paths:
    filename = os.path.basename(file_path)
    stem = filename.rsplit('.', 1)[0]  # remove extension
    # Replace hyphens with underscores for ID
    stem_id = stem.replace('-', '_')
    node_id = f"{stem_id}_image"
    label = f"Raphael Tattoo Frame {stem.split('-')[-1]}"  # e.g., frame-0025 -> 0025
    
    node = {
        "id": node_id,
        "label": label,
        "file_type": "image",
        "source_file": file_path,
        "source_location": None,
        "source_url": None,
        "captured_at": None,
        "author": None,
        "contributor": None
    }
    nodes.append(node)
    hyperedge_nodes.append(node_id)

# Create edges between consecutive frames
for i in range(len(file_paths) - 1):
    src_id = f"{file_paths[i].rsplit('\\\\', 1)[-1].rsplit('.', 1)[0].replace('-', '_')}_image"
    tgt_id = f"{file_paths[i+1].rsplit('\\\\', 1)[-1].rsplit('.', 1)[0].replace('-', '_')}_image"
    edge = {
        "source": src_id,
        "target": tgt_id,
        "relation": "semantically_similar_to",
        "confidence": "INFERRED",
        "confidence_score": 0.85,
        "source_file": file_paths[i],
        "source_location": None,
        "weight": 1.0
    }
    edges.append(edge)

# Create edges from each frame to the project
for file_path in file_paths:
    frame_id = f"{file_path.rsplit('\\\\', 1)[-1].rsplit('.', 1)[0].replace('-', '_')}_image"
    edge = {
        "source": frame_id,
        "target": project_id,
        "relation": "references",
        "confidence": "EXTRACTED",
        "confidence_score": 1.0,
        "source_file": file_path,
        "source_location": None,
        "weight": 1.0
    }
    edges.append(edge)

# Create hyperedge for all frames as part of the project sequence
hyperedge = {
    "id": "raphaeltattoo_sequence",
    "label": "Raphael Tattoo Animation Sequence",
    "nodes": hyperedge_nodes,
    "relation": "participate_in",
    "confidence": "INFERRED",
    "confidence_score": 0.75,
    "source_file": file_paths[0]
}

graph = {
    "nodes": nodes,
    "edges": edges,
    "hyperedges": [hyperedge],
    "input_tokens": 0,
    "output_tokens": 0
}

# Write JSON
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(graph, f, indent=2)

print(f"Generated {len(nodes)} nodes, {len(edges)} edges, 1 hyperedge.")
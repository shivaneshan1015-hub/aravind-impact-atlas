import json
import re

completed_rows = [
    {"title": "Molecular Analysis of PAX6 Gene in Indian Aniridic patients", "state": "Tamil Nadu", "city": "Vellore"},
    {"title": "Aetiology and pathogenic Mechanism of Uveitis associated with Leptospirosis", "state": "Tamil Nadu", "city": "Madurai"},
    {"title": "Studies on Myocilin TIGR/MYOC gene mutations and Myocilin protein in Indian patients with glaucoma", "state": "Tamil Nadu", "city": "Karur"},
    {"title": "Involvement of Transcription Factor genes PAX6/FOXL2 in various ocular anomalies", "state": "Tamil Nadu", "city": "Madurai"},
    {"title": "Understanding the Molecular Genetics of Cataract", "state": "Tamil Nadu", "city": "Madurai"},
    {"title": "Identification, Characterization, Enrichment and in vitro maintenance of Human Corneal Epithelial Stem Cells", "state": "Karnataka", "city": ""},
    {"title": "Serological and Molecular characterization of Rubella virus in children with Ocular defects of Congenital Rubella Syndrome", "state": "Tamil Nadu", "city": "Madurai"},
    {"title": "Molecular Genetics of Diabetic Retinopathy", "state": "Tamil Nadu", "city": "Sattur"},
    {"title": "Molecular Mechanisms of Diabetic Retinopathy", "state": "Tamil Nadu", "city": "Madurai"},
    {"title": "Genetic and functional analysis of Fuchs Endothelial Corneal Dystrophy (FECD) and Congenital Hereditary Endothelial Dystrophy (CHED) in Indian population", "state": "Tamil Nadu", "city": "Dindigul"},
    {"title": "Understanding Pathogenesis of Human Mycotic Keratitis - A Proteome wide analysis", "state": "Tamil Nadu", "city": "Tenkasi"},
    {"title": "Molecular Genetics and Functional Analysis of Albinism Patients in India", "state": "Tamil Nadu", "city": "Madurai"},
    {"title": "Characterization Of The Immunopathogenic Mechanism In Human Mycotic Keratitis", "state": "Tamil Nadu", "city": "Madurai"},
    {"title": "Identification and Characterization of Mutations in Candidate Genes involved in major Congenital Ocular Anomalies", "state": "Uttar Pradesh", "city": "Luknow"},
    {"title": "Etiology and immunopathogenesis of subconjunctival and Anterior Chamber Granulomatous Uveitis", "state": "Bihar", "city": ""},
    {"title": "Molecular studies of Leber Congenital Amaurosis (LCA) in Indian population", "state": "Bihar", "city": "Chapra"},
    {"title": "Identification of genetic variants in genes associated with Primary Open Angle Glaucoma in Indian Population", "state": "Andhra Pradesh", "city": "Tenali"},
    {"title": "Investigating the role of Nuclear, Mitochondrial Genome and microRNA in the pathogenesis of Fuchs Endothelial Corneal Dystrophy (FECD)", "state": "Tamil Nadu", "city": "Madurai"},
    {"title": "Studies on the characterization of limbal niche- their role in maintenance and ex vivo expansion of limbal epithelial stem cells", "state": "Kerala", "city": ""},
    {"title": "Mitochondrial Genes Involvement in Leber’s Hereditary Optic Neuropathy (LHON)", "state": "Assam", "city": ""},
    {"title": "Genotypic characterization and analysis of virulence factors in Methicillin resistant Staphylococcus aureus (MRSA) causing ocular infections", "state": "Tamil Nadu", "city": "Kovilpatti"},
    {"title": "Molecular Genetics and Cytokine Profiling in South Indian patients with Primary Angle Closure Glaucoma (PACG)", "state": "New Delhi", "city": ""},
    {"title": "Molecular Analyses of various risk factors involved in Pseudoexfoliation Syndrome", "state": "Tamil Nadu", "city": "Trichy"},
    {"title": "Genetics and functional approaches to understand the pathogenicity of Primary Open Angle Glaucoma (POAG)", "state": "Kashmir", "city": ""},
    {"title": "Molecular Signature of Human Limbal Epithelial Stem Cells", "state": "Tamil Nadu", "city": "Karaikudi"},
    {"title": "Understanding the role of trabecular meshwork stem cells in the maintenance of tissue homeostasis", "state": "Tamil Nadu", "city": "Madurai"},
    {"title": "Characterization of genetic and transcriptional alterations in retinoblastoma", "state": "Tamil Nadu", "city": "Madurai"},
    {"title": "Molecular Genetics of Macular Corneal Dystrophy (MCD) in Indian population", "state": "Tamil Nadu", "city": "Madurai"},
    {"title": "Understanding the Molecular Mechanisms of Chemoresistance in Retinoblastoma", "state": "Tamil Nadu", "city": "Madurai"},
    {"title": "Micro RNAs Specific to Corneal Epithelial Stem Cells", "state": "Tamil Nadu", "city": "Dindigul"},
    {"title": "Identification of modifier genes involved in Tumorigenesis of Retinoblastoma", "state": "Tamil Nadu", "city": "Madurai"},
    {"title": "Interaction of Pathogenic Fungi with Human Corneal Epithelial cells", "state": "Tamil Nadu", "city": ""},
    {"title": "Identification of Pathogenic variants associated with Genetic Eye diseases in whole Exome and Genome dataset", "state": "Tamil Nadu", "city": "Madurai"},
    {"title": "Characterization of Antimicrobial Resistance and virulence in ocular Pseudomonas aeruginosa isolates", "state": "Tamil Nadu", "city": ""},
    {"title": "Molecular Genetics and Functional Studies of Mitochondrial Genes Associated with Leber’s Hereditary Optic Neuropathy (LHON)", "state": "Tamil Nadu", "city": "Aruppukkottai"},
    {"title": "Genomic Characterization of Kinome Related Genes in Retinoblastoma", "state": "Tamil Nadu", "city": "Madurai"},
    {"title": "Molecular Characterization Of Tumor Progression In Retinoblastoma", "state": "Tamil Nadu", "city": "Madurai"},
    {"title": "Molecular Genetics of ABCA4 Gene in Patients with Retinal Dystrophies", "state": "Tamil Nadu", "city": "Rajapalayam"},
    {"title": "Molecular Characterization of Leber’s Congenital Amaurosis in South Indian Cohort", "state": "Tamil Nadu", "city": "Coimbatore"},
    {"title": "Investigating the Cross Talk Between Nuclear and Mitochondrial Genome in Patients with Leber Hereditary Optic Neuropathy (LHON)", "state": "Tamil Nadu", "city": "Sivakasi"},
    {"title": "Molecular genetics of Juvenile X-linked Retinoschisis in South Indian population", "state": "West Bengal", "city": "Kolkatta"},
    {"title": "Characterization of Adult Human Lens Epithelial Stem Cells in the Maintenance of Tissue Homeostasis", "state": "Tamil Nadu", "city": "Madurai"},
    {"title": "Identification of dysregulated microRNAs in ocular fluids as diagnostic markers for intraocular tuberculosis", "state": "Andhra Pradesh", "city": ""},
    {"title": "Identification, Characterization and Maintenance of Stem Cells in Adult Human Retinal Pigment Epithelium", "state": "Tamil Nadu", "city": "Madurai"},
    {"title": "Molecular Characterization of Ocular Lymphoma for improved Disease prognosis", "state": "Tamil Nadu", "city": "Madurai"},
    {"title": "Human Adult Stem Cell Derived Small Extracellular Vesicles for Trabecular Meshwork Regeneration", "state": "Tamil Nadu", "city": "Madurai"}
]

ongoing_rows = [
    {"title": "Identification and Analysis of Alternartive Transcripts in Retinoblastoma progression", "state": "Tamil Nadu", "city": "Nagapattnam"},
    {"title": "Dysregulated human corneal miRNAs in fusarium keratitis and their role in disease progression", "state": "Kerala", "city": "Kannur"},
    {"title": "Expression profiling of human corneal miRNAs and their role in Pseudomonas aeruginosa keratitis", "state": "Tamil Nadu", "city": "Madurai"},
    {"title": "Elucidating the role of cancer stem cells in chemoresistant retinoblastoma and their threpeutic implications", "state": "Tamil Nadu", "city": "Madurai"},
    {"title": "Molecular Regulation of Adult Human Lens Epithelial Stem cells: Change with aging and Cataract", "state": "Tamil Nadu", "city": "Madurai"},
    {"title": "Molecular Regulators Associated with the maintenance of Human Trabecular Meshwork Stem Cells in relation to their reduction in ageing and Glaucoma", "state": "Kerala", "city": "Kollam"},
    {"title": "Molecular Characterization of Human Retinal Pigment Epithelial Stem Cells and their role in Age-related macular degeneration", "state": "Tamil Nadu", "city": "Dindugal"},
    {"title": "Investigating Molecular Signatures of Anti-VEGF Treatment Response and the Therapeutic Potential of RBP3 in Diabetic Macular Edema", "state": "Tamil Nadu", "city": "Madurai"}
]

# Coordinates lookup table ensuring inland placement
coords = {
    "Vellore": {"lat": 12.9165, "lng": 79.1325},
    "Madurai": {"lat": 9.9252, "lng": 78.1198},
    "Karur": {"lat": 10.9601, "lng": 78.0816},
    "Karnataka": {"lat": 12.9716, "lng": 77.5946},
    "Sattur": {"lat": 9.3562, "lng": 77.9255},
    "Dindigul": {"lat": 10.3673, "lng": 77.9803},
    "Dindugal": {"lat": 10.3673, "lng": 77.9803},
    "Tenkasi": {"lat": 8.9594, "lng": 77.3000},
    "Lucknow": {"lat": 26.8467, "lng": 80.9462},
    "Luknow": {"lat": 26.8467, "lng": 80.9462},
    "Bihar": {"lat": 25.5941, "lng": 85.1376},
    "Chapra": {"lat": 25.7831, "lng": 84.7483},
    "Tenali": {"lat": 16.2430, "lng": 80.6400},
    "Kerala": {"lat": 10.5276, "lng": 76.2144},  # Central Kerala inland
    "Assam": {"lat": 26.1445, "lng": 91.7362},
    "Kovilpatti": {"lat": 9.1723, "lng": 77.8687},
    "New Delhi": {"lat": 28.6139, "lng": 77.2090},
    "Trichy": {"lat": 10.7905, "lng": 78.7047},
    "Kashmir": {"lat": 34.0837, "lng": 74.7973},
    "Karaikudi": {"lat": 10.0735, "lng": 78.7732},
    "Tamil Nadu": {"lat": 10.7905, "lng": 78.7047},  # Trichy region inland
    "Aruppukkottai": {"lat": 9.5103, "lng": 78.0984},
    "Rajapalayam": {"lat": 9.4533, "lng": 77.5544},
    "Coimbatore": {"lat": 11.0168, "lng": 76.9558},
    "Sivakasi": {"lat": 9.4533, "lng": 77.7974},
    "Kolkatta": {"lat": 22.5726, "lng": 88.3639},
    "Andhra Pradesh": {"lat": 15.9129, "lng": 79.7400},
    "Nagapattnam": {"lat": 10.7656, "lng": 79.8000},  # Nagapattinam slightly inland
    "Kannur": {"lat": 11.8745, "lng": 75.4000},       # Kannur slightly inland
    "Kollam": {"lat": 8.8932, "lng": 76.6500}         # Kollam slightly inland
}

def aggregate(rows, status_key, color):
    groups = {}
    for r in rows:
        loc_name = r["city"].strip() if r["city"].strip() else r["state"].strip()
        if loc_name not in groups:
            groups[loc_name] = {
                "location_name": loc_name,
                "state": r["state"].strip(),
                "city": r["city"].strip() if r["city"].strip() else loc_name,
                "theses": []
            }
        groups[loc_name]["theses"].append(r["title"].strip())
    
    nodes = []
    for loc_name, g in groups.items():
        c_info = coords.get(loc_name, {"lat": 10.7905, "lng": 78.7047})
        safe_id = re.sub(r'[^a-z0-9_]', '_', loc_name.lower())
        count = len(g["theses"])
        
        node = {
            "id": f"amrf_phd_{status_key}_{safe_id}",
            "name": f"{loc_name} ({count} Ph.D. Thesis{'es' if count > 1 else ''})",
            "rawName": loc_name,
            "entityId": "amrf",
            "subcategoryId": f"phd_{status_key}" if status_key == "completed" else "ongoing_phd",
            "country": "India",
            "state": g["state"],
            "city": g["city"],
            "latitude": c_info["lat"],
            "longitude": c_info["lng"],
            "type": "PhD Scholar",
            "metrics": {
                "count": count,
                "city": g["city"],
                "state": g["state"],
                "status": "Completed" if status_key == "completed" else "Ongoing",
                "degree": "Ph.D. Ocular Sciences"
            },
            "metadata": {
                "status": status_key,
                "count": count,
                "thesesList": g["theses"],
                "city": g["city"],
                "state": g["state"],
                "color": color
            }
        }
        nodes.append(node)
    return nodes

completed_nodes = aggregate(completed_rows, "completed", "#155E75")
ongoing_nodes = aggregate(ongoing_rows, "ongoing", "#9D174D")

print(f"Aggregated {len(completed_nodes)} completed nodes and {len(ongoing_nodes)} ongoing nodes.")
print("Completed nodes summary:")
for n in completed_nodes:
    print(f" - {n['rawName']}: {n['metadata']['count']} theses")

print("Ongoing nodes summary:")
for n in ongoing_nodes:
    print(f" - {n['rawName']}: {n['metadata']['count']} theses")

with open("scratch/amrf_phd_v2.json", "w", encoding="utf-8") as f:
    json.dump({"completed": completed_nodes, "ongoing": ongoing_nodes}, f, indent=2)

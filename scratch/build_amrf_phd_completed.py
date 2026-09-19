import json

coords_map = {
    "Vellore": (12.9165, 79.1325),
    "Madurai": (9.9252, 78.1198),
    "Karur": (10.9601, 78.0816),
    "Samayanallur": (9.9881, 78.0494),
    "Sattur": (9.3562, 77.9255),
    "Dindigul": (10.3673, 77.9803),
    "Tenkasi": (8.9594, 77.3000),
    "Lucknow": (26.8467, 80.9462),
    "Chapra": (25.7831, 84.7483),
    "Tenali": (16.2430, 80.6400),
    "Kovilpatti": (9.1723, 77.8687),
    "Trichy": (10.7905, 78.7047),
    "Karaikudi": (10.0735, 78.7732),
    "Sholavandan": (10.0212, 78.0069),
    "Thirumangalam": (9.8252, 77.9894),
    "Aruppukkottai": (9.5103, 78.0984),
    "Rajapalayam": (9.4533, 77.5544),
    "Coimbatore": (11.0168, 76.9558),
    "Sivakasi": (9.4533, 77.7973),
    "Kolkata": (22.5726, 88.3639),
    "Usilampatti": (10.0101, 77.7911),
    "Karnataka": (12.9716, 77.5946),
    "Bihar": (25.5941, 85.1376),
    "Kerala": (8.5241, 76.9366),
    "Assam": (26.1445, 91.7362),
    "New Delhi": (28.6139, 77.2090),
    "Kashmir": (34.0837, 74.7973),
    "Tamil Nadu": (10.7905, 78.7047),
    "Andhra Pradesh": (16.5062, 80.6480),
}

phd_completed_raw = [
    {"thesis": "Molecular Analysis of PAX6 Gene in Indian Aniridic patients", "state": "Tamil Nadu", "city": "Vellore"},
    {"thesis": "Aetiology and pathogenic Mechanism of Uveitis associated with Leptospirosis", "state": "Tamil Nadu", "city": "Madurai"},
    {"thesis": "Studies on Myocilin TIGR/MYOC) gene mutations and Myocilin protein in Indian patients with Primary Open Angle Glaucoma", "state": "Tamil Nadu", "city": "Karur"},
    {"thesis": "Involvement of Transcription Factor genes PAX6/FOXL2 in various ocular anomalies", "state": "Tamil Nadu", "city": "Samayanallur"},
    {"thesis": "Understanding the Molecular Genetics of Cataract", "state": "Tamil Nadu", "city": "Madurai"},
    {"thesis": "Identification, Characterization, Enrichment and in vitro maintenance of Human Corneal Epithelial Stem Cells", "state": "Karnataka", "city": ""},
    {"thesis": "Serological and Molecular characterization of Rubella virus in children with Ocular defects of Congenital Rubella Syndrome", "state": "Tamil Nadu", "city": "Madurai"},
    {"thesis": "Molecular Genetics of Diabetic Retinopathy", "state": "Tamil Nadu", "city": "Sattur"},
    {"thesis": "Molecular Mechanisms of Diabetic Retinopathy", "state": "Tamil Nadu", "city": "Madurai"},
    {"thesis": "Genetic and functional analysis of Fuchs Endothelial Corneal Dystrophy (FECD) and Congenital hereditary endothelial dystrophy (CHED) in Indian patients", "state": "Tamil Nadu", "city": "Dindigul"},
    {"thesis": "Understanding Pathogenesis of Human Mycotic Keratitis - A Proteome wide analysis", "state": "Tamil Nadu", "city": "Tenkasi"},
    {"thesis": "Molecular Genetics and Functional Analysis of Albinism Patients in India", "state": "Tamil Nadu", "city": "Madurai"},
    {"thesis": "Characterization Of The Immunopathogenic Mechanism In Human Mycotic Keratitis", "state": "Tamil Nadu", "city": "Madurai"},
    {"thesis": "Identification and Characterization of Mutations in Candidate Genes involved in major Congenital Globe Anomalies", "state": "Uttar Pradesh", "city": "Lucknow"},
    {"thesis": "Etiology and immunopathogenesis of subconjunctival and Anterior Chamber Granulomatous Uveitis in children of South India", "state": "Bihar", "city": ""},
    {"thesis": "Molecular studies of Leber Congenital Amaurosis (LCA) in Indian population", "state": "Bihar", "city": "Chapra"},
    {"thesis": "Identification of genetic variants in genes associated with Primary Open Angle Glaucoma in Indian population", "state": "Andhra Pradesh", "city": "Tenali"},
    {"thesis": "Investigating the role of Nuclear, Mitochondrial Genome and microRNA in the pathogenesis of Diabetic retinopathy", "state": "Tamil Nadu", "city": "Madurai"},
    {"thesis": "Studies on the characterization of limbal niche- their role in maintenance and ex vivo expansion of human corneal epithelial stem cells", "state": "Kerala", "city": ""},
    {"thesis": "Mitochondrial Genes Involvement in Leber's Hereditary Optic Neuropathy (LHON)", "state": "Assam", "city": ""},
    {"thesis": "Genotypic characterization and analysis of virulence factors in Methicillin resistant Staphylococcus aureus causing ocular infections", "state": "Tamil Nadu", "city": "Kovilpatti"},
    {"thesis": "Molecular Genetics and Cytokine Profiling in South Indian patients with Primary Angle Closure Glaucoma", "state": "New Delhi", "city": ""},
    {"thesis": "Molecular Analyses of various risk factors involved in Pseudoexfoliation Syndrome", "state": "Tamil Nadu", "city": "Trichy"},
    {"thesis": "Genetics and functional approaches to understand the pathogenicity of Primary Open Angle Glaucoma", "state": "Kashmir", "city": ""},
    {"thesis": "Molecular Signature of Human Limbal Epithelial Stem Cells", "state": "Tamil Nadu", "city": "Karaikudi"},
    {"thesis": "Understanding the role of trabecular meshwork stem cells in the maintenance of tissue homeostasis in normal and glaucomatous human eyes", "state": "Tamil Nadu", "city": "Madurai"},
    {"thesis": "Characterization of genetic and transcriptional alterations in retinoblastoma", "state": "Tamil Nadu", "city": "Madurai"},
    {"thesis": "Molecular Genetics of Macular Corneal Dystrophy (MCD) in Indian population", "state": "Tamil Nadu", "city": "Madurai"},
    {"thesis": "Understanding the Molecular Mechanisms of Chemoresistance in Retinoblastoma", "state": "Tamil Nadu", "city": "Madurai"},
    {"thesis": "Micro RNAs Specific to Corneal Epithelial Stem Cells", "state": "Tamil Nadu", "city": "Dindigul"},
    {"thesis": "Identification of modifier genes involved in Tumorigenesis of Retinoblastoma", "state": "Tamil Nadu", "city": "Sholavandan"},
    {"thesis": "Interaction of Pathogenic Fungi with Human Corneal Epithelial cells", "state": "Tamil Nadu", "city": ""},
    {"thesis": "Identification of Pathogenic variants associated with Genetic Eye diseases in whole Exome and Genome data", "state": "Tamil Nadu", "city": "Thirumangalam"},
    {"thesis": "Characterization of Antimicrobial Resistance and virulence in ocular Pseudomonas aeruginosa and Methicillin-Resistant Staphylococcus aureus strains through comparative genomic analysis", "state": "Tamil Nadu", "city": ""},
    {"thesis": "Molecular Genetics and Functional Studies of Mitochondrial Genes Associated with Leber's Hereditary Optic Neuropathy", "state": "Tamil Nadu", "city": "Aruppukkottai"},
    {"thesis": "Genomic Characterization of Kinome Related Genes in Retinoblastoma", "state": "Tamil Nadu", "city": "Madurai"},
    {"thesis": "Molecular Characterization Of Tumor Progression In Retinoblastoma", "state": "Tamil Nadu", "city": "Madurai"},
    {"thesis": "Molecular Genetics of ABCA4 Gene in Patients with Retinal Dystrophies", "state": "Tamil Nadu", "city": "Rajapalayam"},
    {"thesis": "Molecular Characterization of Leber's Congenital Amaurosis in South Indian Cohort", "state": "Tamil Nadu", "city": "Coimbatore"},
    {"thesis": "Investigating the Cross Talk Between Nuclear and Mitochondrial Genome in Patients with Leber's Hereditary Optic Neuropathy", "state": "Tamil Nadu", "city": "Sivakasi"},
    {"thesis": "Molecular genetics of Juvenile X-linked Retinoschisis in South Indian population", "state": "West Bengal", "city": "Kolkata"},
    {"thesis": "Characterization of Adult Human Lens Epithelial Stem Cells in the Maintenance of Tissue Homeostasis and their Functional Status in Cataractous Lens", "state": "Tamil Nadu", "city": "Usilampatti"},
    {"thesis": "Identification of dysregulated microRNAs in ocular fluids as diagnostic markers for intraocular tuberculosis", "state": "Andhra Pradesh", "city": ""},
    {"thesis": "Identification, Characterization and Maintenance of Stem Cells in Adult Human Retinal Pigment Epithelium", "state": "Tamil Nadu", "city": "Madurai"},
    {"thesis": "Molecular Characterization of Ocular Lymphoma for improved Disease prognosis", "state": "Tamil Nadu", "city": "Madurai"},
    {"thesis": "Human Adult Stem Cell Derived Small Extracellular Vesicles for Trabecular Meshwork Regeneration in Glaucoma", "state": "Tamil Nadu", "city": "Madurai"},
]

city_counts = {}

items = []
for idx, row in enumerate(phd_completed_raw, 1):
    city = row["city"].strip()
    state = row["state"].strip()
    thesis = row["thesis"].strip()

    loc_key = city if city else state
    if loc_key not in city_counts:
        city_counts[loc_key] = 0
    city_counts[loc_key] += 1
    count_idx = city_counts[loc_key]

    base_lat, base_lng = coords_map.get(loc_key, coords_map.get(state, (10.7905, 78.7047)))
    
    # Slight deterministic spiral offset for multiple items at the same city/state
    if count_idx > 1:
        angle = (count_idx - 1) * 0.785398 # 45 deg steps
        radius = 0.008 + (count_idx * 0.004)
        lat = round(base_lat + radius * (0.8 * (count_idx % 2 * 2 - 1)), 4)
        lng = round(base_lng + radius * (0.8 * (count_idx % 3 - 1)), 4)
    else:
        lat = round(base_lat, 4)
        lng = round(base_lng, 4)

    display_city = city if city else state
    displayName = f"Ph.D. Thesis ({display_city}): {thesis[:35]}..."

    item = {
        "id": f"amrf_scholar_comp_{idx}",
        "name": thesis,
        "rawName": thesis,
        "entityId": "amrf",
        "subcategoryId": "phd_completed",
        "country": "India",
        "state": state,
        "city": display_city,
        "latitude": lat,
        "longitude": lng,
        "type": "PhD Scholar",
        "metrics": {
            "thesisTitle": thesis,
            "city": display_city,
            "state": state,
            "status": "Completed",
            "degree": "Ph.D. Ocular Sciences"
        },
        "metadata": {
            "status": "completed",
            "scholarNo": idx,
            "thesisTitle": thesis,
            "city": city,
            "state": state,
            "displayLocation": display_city,
            "color": "#06B6D4"
        }
    }
    items.append(item)

print(f"Generated {len(items)} completed Ph.D. entries successfully.")
with open("scratch/amrf_phd_completed.json", "w") as f:
    json.dump(items, f, indent=2)

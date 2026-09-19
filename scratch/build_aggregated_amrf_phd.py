import json

coords_map = {
    "Vellore": (12.9165, 79.1325),
    "Madurai": (9.9252, 78.1198),
    "Karur": (10.9601, 78.0816),
    "Samayanallur": (9.9881, 78.0494),
    "Sattur": (9.3562, 77.9255),
    "Dindigul": (10.3673, 77.9803),
    "Dindugal": (10.3673, 77.9803),
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
    "Nagapattnam": (10.7656, 79.8449),
    "Nagapattinam": (10.7656, 79.8449),
    "Kannur": (11.8745, 75.3704),
    "Kollam": (8.8932, 76.6141),
}

# 46 Completed PhD Raw Entries
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

# 8 Ongoing PhD Raw Entries
phd_ongoing_raw = [
    {"thesis": "Identification and Analysis of Alternartive Transcripts in Retinoblastoma progression", "state": "Tamil Nadu", "city": "Nagapattnam"},
    {"thesis": "Dysregulated human corneal miRNAs in fusarium keratitis and their role in disease progression", "state": "Kerala", "city": "Kannur"},
    {"thesis": "Expression profiling of human corneal miRNAs and their role in Pseudomonas aeruginosa keratitis", "state": "Tamil Nadu", "city": "Madurai"},
    {"thesis": "Elucidating the role of cancer stem cells in chemoresistant retinoblastoma and their threpeutic implications", "state": "Tamil Nadu", "city": "Madurai"},
    {"thesis": "Molecular Regulation of Adult Human Lens Epithelial Stem cells: Change with aging and Cataract", "state": "Tamil Nadu", "city": "Madurai"},
    {"thesis": "Molecular Regulators Associated with the maintenance of Human Trabecular Meshwork Stem Cells in relation to their reduction in ageing and Glaucoma", "state": "Kerala", "city": "Kollam"},
    {"thesis": "Molecular Characterization of Human Retinal Pigment Epithelial Stem Cells and their role in Age-related macular degeneration", "state": "Tamil Nadu", "city": "Dindugal"},
    {"thesis": "Investigating Molecular Signatures of Anti-VEGF Treatment Response and the Therapeutic Potential of RBP3 in Diabetic Macular Edema", "state": "Tamil Nadu", "city": "Madurai"},
]

def group_phd_entries(raw_entries, status_type, color):
    grouped = {}
    for entry in raw_entries:
        city = entry["city"].strip()
        state = entry["state"].strip()
        thesis = entry["thesis"].strip()

        loc_key = city if city else state
        # Normalize city names
        if loc_key == "Nagapattnam":
            loc_key = "Nagapattinam"
        if loc_key == "Dindugal":
            loc_key = "Dindigul"

        if loc_key not in grouped:
            grouped[loc_key] = {
                "city": loc_key,
                "state": state,
                "theses": []
            }
        grouped[loc_key]["theses"].append(thesis)

    items = []
    for idx, (loc_key, data) in enumerate(grouped.items(), 1):
        count = len(data["theses"])
        coords = coords_map.get(loc_key, coords_map.get(data["state"], (10.7905, 78.7047)))
        
        status_label = "Completed" if status_type == "phd_completed" else "Ongoing"
        noun = "Theses" if count > 1 else "Thesis"

        item = {
            "id": f"amrf_{status_type}_{loc_key.lower().replace(' ', '_')}",
            "name": f"{loc_key} ({count} {status_label} Ph.D. {noun})",
            "rawName": loc_key,
            "entityId": "amrf",
            "subcategoryId": status_type,
            "country": "India",
            "state": data["state"],
            "city": loc_key,
            "latitude": coords[0],
            "longitude": coords[1],
            "type": "PhD Scholar",
            "metrics": {
                "count": count,
                "city": loc_key,
                "state": data["state"],
                "status": status_label,
                "degree": "Ph.D. Ocular Sciences"
            },
            "metadata": {
                "status": "completed" if status_type == "phd_completed" else "ongoing",
                "count": count,
                "thesesList": data["theses"],
                "city": loc_key,
                "state": data["state"],
                "color": color
            }
        }
        items.append(item)
    return items

completed_items = group_phd_entries(phd_completed_raw, "phd_completed", "#0891B2")
ongoing_items = group_phd_entries(phd_ongoing_raw, "ongoing_phd", "#DB2777")

print(f"Generated {len(completed_items)} aggregated Completed Ph.D. city nodes (Total 46 theses).")
print(f"Generated {len(ongoing_items)} aggregated Ongoing Ph.D. city nodes (Total 8 theses).")

with open("scratch/amrf_phd_aggregated.json", "w") as f:
    json.dump(completed_items + ongoing_items, f, indent=2)

import { GeoLocationItem } from "@/types/geo";

export interface AMRFPhdStateItem extends GeoLocationItem {
  phdCount?: number;
}

export const AMRF_DATA: GeoLocationItem[] = [
  {
      "id": "amrf_hq",
      "name": "AMRF Research HQ",
      "rawName": "AMRF Madurai HQ",
      "entityId": "amrf",
      "subcategoryId": "collaboratives",
      "country": "India",
      "state": "Tamil Nadu",
      "city": "Madurai",
      "latitude": 9.9252,
      "longitude": 78.1198,
      "type": "Research Center",
      "metrics": {
          "establishedYear": 1985,
          "globalPartners": 12,
          "phdScholars": 54,
          "internationalFellows": 6
      },
      "address": "1, Anna Nagar, Madurai, Tamil Nadu 625020",
      "metadata": {
          "isHq": true,
          "color": "#7C3AED"
      }
  },
  {
      "id": "amrf_phd_completed_vellore",
      "name": "Vellore (1 Ph.D. Thesis)",
      "rawName": "Vellore",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Tamil Nadu",
      "city": "Vellore",
      "latitude": 12.9165,
      "longitude": 79.1325,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Vellore",
          "state": "Tamil Nadu",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 1,
          "thesesList": [
              "Molecular Analysis of PAX6 Gene in Indian Aniridic patients"
          ],
          "city": "Vellore",
          "state": "Tamil Nadu",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_madurai",
      "name": "Madurai (20 Ph.D. Thesises)",
      "rawName": "Madurai",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Tamil Nadu",
      "city": "Madurai",
      "latitude": 9.9252,
      "longitude": 78.1198,
      "type": "PhD Scholar",
      "metrics": {
          "count": 20,
          "city": "Madurai",
          "state": "Tamil Nadu",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 20,
          "thesesList": [
              "Aetiology and pathogenic Mechanism of Uveitis associated with Leptospirosis",
              "Involvement of Transcription Factor genes PAX6/FOXL2 in various ocular anomalies",
              "Understanding the Molecular Genetics of Cataract",
              "Serological and Molecular characterization of Rubella virus in children with Ocular defects of Congenital Rubella Syndrome",
              "Molecular Mechanisms of Diabetic Retinopathy",
              "Molecular Genetics and Functional Analysis of Albinism Patients in India",
              "Characterization Of The Immunopathogenic Mechanism In Human Mycotic Keratitis",
              "Investigating the role of Nuclear, Mitochondrial Genome and microRNA in the pathogenesis of Fuchs Endothelial Corneal Dystrophy (FECD)",
              "Understanding the role of trabecular meshwork stem cells in the maintenance of tissue homeostasis",
              "Characterization of genetic and transcriptional alterations in retinoblastoma",
              "Molecular Genetics of Macular Corneal Dystrophy (MCD) in Indian population",
              "Understanding the Molecular Mechanisms of Chemoresistance in Retinoblastoma",
              "Identification of modifier genes involved in Tumorigenesis of Retinoblastoma",
              "Identification of Pathogenic variants associated with Genetic Eye diseases in whole Exome and Genome dataset",
              "Genomic Characterization of Kinome Related Genes in Retinoblastoma",
              "Molecular Characterization Of Tumor Progression In Retinoblastoma",
              "Characterization of Adult Human Lens Epithelial Stem Cells in the Maintenance of Tissue Homeostasis",
              "Identification, Characterization and Maintenance of Stem Cells in Adult Human Retinal Pigment Epithelium",
              "Molecular Characterization of Ocular Lymphoma for improved Disease prognosis",
              "Human Adult Stem Cell Derived Small Extracellular Vesicles for Trabecular Meshwork Regeneration"
          ],
          "city": "Madurai",
          "state": "Tamil Nadu",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_karur",
      "name": "Karur (1 Ph.D. Thesis)",
      "rawName": "Karur",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Tamil Nadu",
      "city": "Karur",
      "latitude": 10.9601,
      "longitude": 78.0816,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Karur",
          "state": "Tamil Nadu",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 1,
          "thesesList": [
              "Studies on Myocilin TIGR/MYOC gene mutations and Myocilin protein in Indian patients with glaucoma"
          ],
          "city": "Karur",
          "state": "Tamil Nadu",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_karnataka",
      "name": "Karnataka (1 Ph.D. Thesis)",
      "rawName": "Karnataka",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Karnataka",
      "city": "Karnataka",
      "latitude": 12.9716,
      "longitude": 77.5946,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Karnataka",
          "state": "Karnataka",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 1,
          "thesesList": [
              "Identification, Characterization, Enrichment and in vitro maintenance of Human Corneal Epithelial Stem Cells"
          ],
          "city": "Karnataka",
          "state": "Karnataka",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_sattur",
      "name": "Sattur (1 Ph.D. Thesis)",
      "rawName": "Sattur",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Tamil Nadu",
      "city": "Sattur",
      "latitude": 9.3562,
      "longitude": 77.9255,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Sattur",
          "state": "Tamil Nadu",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 1,
          "thesesList": [
              "Molecular Genetics of Diabetic Retinopathy"
          ],
          "city": "Sattur",
          "state": "Tamil Nadu",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_dindigul",
      "name": "Dindigul (2 Ph.D. Thesises)",
      "rawName": "Dindigul",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Tamil Nadu",
      "city": "Dindigul",
      "latitude": 10.3673,
      "longitude": 77.9803,
      "type": "PhD Scholar",
      "metrics": {
          "count": 2,
          "city": "Dindigul",
          "state": "Tamil Nadu",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 2,
          "thesesList": [
              "Genetic and functional analysis of Fuchs Endothelial Corneal Dystrophy (FECD) and Congenital Hereditary Endothelial Dystrophy (CHED) in Indian population",
              "Micro RNAs Specific to Corneal Epithelial Stem Cells"
          ],
          "city": "Dindigul",
          "state": "Tamil Nadu",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_tenkasi",
      "name": "Tenkasi (1 Ph.D. Thesis)",
      "rawName": "Tenkasi",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Tamil Nadu",
      "city": "Tenkasi",
      "latitude": 8.9594,
      "longitude": 77.3,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Tenkasi",
          "state": "Tamil Nadu",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 1,
          "thesesList": [
              "Understanding Pathogenesis of Human Mycotic Keratitis - A Proteome wide analysis"
          ],
          "city": "Tenkasi",
          "state": "Tamil Nadu",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_luknow",
      "name": "Luknow (1 Ph.D. Thesis)",
      "rawName": "Luknow",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Uttar Pradesh",
      "city": "Luknow",
      "latitude": 26.8467,
      "longitude": 80.9462,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Luknow",
          "state": "Uttar Pradesh",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 1,
          "thesesList": [
              "Identification and Characterization of Mutations in Candidate Genes involved in major Congenital Ocular Anomalies"
          ],
          "city": "Luknow",
          "state": "Uttar Pradesh",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_bihar",
      "name": "Bihar (1 Ph.D. Thesis)",
      "rawName": "Bihar",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Bihar",
      "city": "Bihar",
      "latitude": 25.5941,
      "longitude": 85.1376,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Bihar",
          "state": "Bihar",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 1,
          "thesesList": [
              "Etiology and immunopathogenesis of subconjunctival and Anterior Chamber Granulomatous Uveitis"
          ],
          "city": "Bihar",
          "state": "Bihar",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_chapra",
      "name": "Chapra (1 Ph.D. Thesis)",
      "rawName": "Chapra",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Bihar",
      "city": "Chapra",
      "latitude": 25.7831,
      "longitude": 84.7483,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Chapra",
          "state": "Bihar",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 1,
          "thesesList": [
              "Molecular studies of Leber Congenital Amaurosis (LCA) in Indian population"
          ],
          "city": "Chapra",
          "state": "Bihar",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_tenali",
      "name": "Tenali (1 Ph.D. Thesis)",
      "rawName": "Tenali",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Andhra Pradesh",
      "city": "Tenali",
      "latitude": 16.243,
      "longitude": 80.64,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Tenali",
          "state": "Andhra Pradesh",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 1,
          "thesesList": [
              "Identification of genetic variants in genes associated with Primary Open Angle Glaucoma in Indian Population"
          ],
          "city": "Tenali",
          "state": "Andhra Pradesh",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_kerala",
      "name": "Kerala (1 Ph.D. Thesis)",
      "rawName": "Kerala",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Kerala",
      "city": "Kerala",
      "latitude": 10.5276,
      "longitude": 76.2144,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Kerala",
          "state": "Kerala",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 1,
          "thesesList": [
              "Studies on the characterization of limbal niche- their role in maintenance and ex vivo expansion of limbal epithelial stem cells"
          ],
          "city": "Kerala",
          "state": "Kerala",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_assam",
      "name": "Assam (1 Ph.D. Thesis)",
      "rawName": "Assam",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Assam",
      "city": "Assam",
      "latitude": 26.1445,
      "longitude": 91.7362,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Assam",
          "state": "Assam",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 1,
          "thesesList": [
              "Mitochondrial Genes Involvement in Leber\u2019s Hereditary Optic Neuropathy (LHON)"
          ],
          "city": "Assam",
          "state": "Assam",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_kovilpatti",
      "name": "Kovilpatti (1 Ph.D. Thesis)",
      "rawName": "Kovilpatti",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Tamil Nadu",
      "city": "Kovilpatti",
      "latitude": 9.1723,
      "longitude": 77.8687,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Kovilpatti",
          "state": "Tamil Nadu",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 1,
          "thesesList": [
              "Genotypic characterization and analysis of virulence factors in Methicillin resistant Staphylococcus aureus (MRSA) causing ocular infections"
          ],
          "city": "Kovilpatti",
          "state": "Tamil Nadu",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_new_delhi",
      "name": "New Delhi (1 Ph.D. Thesis)",
      "rawName": "New Delhi",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "New Delhi",
      "city": "New Delhi",
      "latitude": 28.6139,
      "longitude": 77.209,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "New Delhi",
          "state": "New Delhi",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 1,
          "thesesList": [
              "Molecular Genetics and Cytokine Profiling in South Indian patients with Primary Angle Closure Glaucoma (PACG)"
          ],
          "city": "New Delhi",
          "state": "New Delhi",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_trichy",
      "name": "Trichy (1 Ph.D. Thesis)",
      "rawName": "Trichy",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Tamil Nadu",
      "city": "Trichy",
      "latitude": 10.7905,
      "longitude": 78.7047,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Trichy",
          "state": "Tamil Nadu",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 1,
          "thesesList": [
              "Molecular Analyses of various risk factors involved in Pseudoexfoliation Syndrome"
          ],
          "city": "Trichy",
          "state": "Tamil Nadu",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_kashmir",
      "name": "Kashmir (1 Ph.D. Thesis)",
      "rawName": "Kashmir",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Kashmir",
      "city": "Kashmir",
      "latitude": 34.0837,
      "longitude": 74.7973,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Kashmir",
          "state": "Kashmir",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 1,
          "thesesList": [
              "Genetics and functional approaches to understand the pathogenicity of Primary Open Angle Glaucoma (POAG)"
          ],
          "city": "Kashmir",
          "state": "Kashmir",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_karaikudi",
      "name": "Karaikudi (1 Ph.D. Thesis)",
      "rawName": "Karaikudi",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Tamil Nadu",
      "city": "Karaikudi",
      "latitude": 10.0735,
      "longitude": 78.7732,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Karaikudi",
          "state": "Tamil Nadu",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 1,
          "thesesList": [
              "Molecular Signature of Human Limbal Epithelial Stem Cells"
          ],
          "city": "Karaikudi",
          "state": "Tamil Nadu",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_tamil_nadu",
      "name": "Tamil Nadu (2 Ph.D. Thesises)",
      "rawName": "Tamil Nadu",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Tamil Nadu",
      "city": "Tamil Nadu",
      "latitude": 10.7905,
      "longitude": 78.7047,
      "type": "PhD Scholar",
      "metrics": {
          "count": 2,
          "city": "Tamil Nadu",
          "state": "Tamil Nadu",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 2,
          "thesesList": [
              "Interaction of Pathogenic Fungi with Human Corneal Epithelial cells",
              "Characterization of Antimicrobial Resistance and virulence in ocular Pseudomonas aeruginosa isolates"
          ],
          "city": "Tamil Nadu",
          "state": "Tamil Nadu",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_aruppukkottai",
      "name": "Aruppukkottai (1 Ph.D. Thesis)",
      "rawName": "Aruppukkottai",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Tamil Nadu",
      "city": "Aruppukkottai",
      "latitude": 9.5103,
      "longitude": 78.0984,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Aruppukkottai",
          "state": "Tamil Nadu",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 1,
          "thesesList": [
              "Molecular Genetics and Functional Studies of Mitochondrial Genes Associated with Leber\u2019s Hereditary Optic Neuropathy (LHON)"
          ],
          "city": "Aruppukkottai",
          "state": "Tamil Nadu",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_rajapalayam",
      "name": "Rajapalayam (1 Ph.D. Thesis)",
      "rawName": "Rajapalayam",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Tamil Nadu",
      "city": "Rajapalayam",
      "latitude": 9.4533,
      "longitude": 77.5544,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Rajapalayam",
          "state": "Tamil Nadu",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 1,
          "thesesList": [
              "Molecular Genetics of ABCA4 Gene in Patients with Retinal Dystrophies"
          ],
          "city": "Rajapalayam",
          "state": "Tamil Nadu",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_coimbatore",
      "name": "Coimbatore (1 Ph.D. Thesis)",
      "rawName": "Coimbatore",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Tamil Nadu",
      "city": "Coimbatore",
      "latitude": 11.0168,
      "longitude": 76.9558,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Coimbatore",
          "state": "Tamil Nadu",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 1,
          "thesesList": [
              "Molecular Characterization of Leber\u2019s Congenital Amaurosis in South Indian Cohort"
          ],
          "city": "Coimbatore",
          "state": "Tamil Nadu",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_sivakasi",
      "name": "Sivakasi (1 Ph.D. Thesis)",
      "rawName": "Sivakasi",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Tamil Nadu",
      "city": "Sivakasi",
      "latitude": 9.4533,
      "longitude": 77.7974,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Sivakasi",
          "state": "Tamil Nadu",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 1,
          "thesesList": [
              "Investigating the Cross Talk Between Nuclear and Mitochondrial Genome in Patients with Leber Hereditary Optic Neuropathy (LHON)"
          ],
          "city": "Sivakasi",
          "state": "Tamil Nadu",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_kolkatta",
      "name": "Kolkatta (1 Ph.D. Thesis)",
      "rawName": "Kolkatta",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "West Bengal",
      "city": "Kolkatta",
      "latitude": 22.5726,
      "longitude": 88.3639,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Kolkatta",
          "state": "West Bengal",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 1,
          "thesesList": [
              "Molecular genetics of Juvenile X-linked Retinoschisis in South Indian population"
          ],
          "city": "Kolkatta",
          "state": "West Bengal",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_completed_andhra_pradesh",
      "name": "Andhra Pradesh (1 Ph.D. Thesis)",
      "rawName": "Andhra Pradesh",
      "entityId": "amrf",
      "subcategoryId": "phd_completed",
      "country": "India",
      "state": "Andhra Pradesh",
      "city": "Andhra Pradesh",
      "latitude": 15.9129,
      "longitude": 79.74,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Andhra Pradesh",
          "state": "Andhra Pradesh",
          "status": "Completed",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "completed",
          "count": 1,
          "thesesList": [
              "Identification of dysregulated microRNAs in ocular fluids as diagnostic markers for intraocular tuberculosis"
          ],
          "city": "Andhra Pradesh",
          "state": "Andhra Pradesh",
          "color": "#155E75"
      }
  },
  {
      "id": "amrf_phd_ongoing_nagapattnam",
      "name": "Nagapattnam (1 Ph.D. Thesis)",
      "rawName": "Nagapattnam",
      "entityId": "amrf",
      "subcategoryId": "ongoing_phd",
      "country": "India",
      "state": "Tamil Nadu",
      "city": "Nagapattnam",
      "latitude": 10.7656,
      "longitude": 79.8,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Nagapattnam",
          "state": "Tamil Nadu",
          "status": "Ongoing",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "ongoing",
          "count": 1,
          "thesesList": [
              "Identification and Analysis of Alternartive Transcripts in Retinoblastoma progression"
          ],
          "city": "Nagapattnam",
          "state": "Tamil Nadu",
          "color": "#9D174D"
      }
  },
  {
      "id": "amrf_phd_ongoing_kannur",
      "name": "Kannur (1 Ph.D. Thesis)",
      "rawName": "Kannur",
      "entityId": "amrf",
      "subcategoryId": "ongoing_phd",
      "country": "India",
      "state": "Kerala",
      "city": "Kannur",
      "latitude": 11.8745,
      "longitude": 75.4,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Kannur",
          "state": "Kerala",
          "status": "Ongoing",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "ongoing",
          "count": 1,
          "thesesList": [
              "Dysregulated human corneal miRNAs in fusarium keratitis and their role in disease progression"
          ],
          "city": "Kannur",
          "state": "Kerala",
          "color": "#9D174D"
      }
  },
  {
      "id": "amrf_phd_ongoing_madurai",
      "name": "Madurai (4 Ph.D. Thesises)",
      "rawName": "Madurai",
      "entityId": "amrf",
      "subcategoryId": "ongoing_phd",
      "country": "India",
      "state": "Tamil Nadu",
      "city": "Madurai",
      "latitude": 9.9252,
      "longitude": 78.1198,
      "type": "PhD Scholar",
      "metrics": {
          "count": 4,
          "city": "Madurai",
          "state": "Tamil Nadu",
          "status": "Ongoing",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "ongoing",
          "count": 4,
          "thesesList": [
              "Expression profiling of human corneal miRNAs and their role in Pseudomonas aeruginosa keratitis",
              "Elucidating the role of cancer stem cells in chemoresistant retinoblastoma and their threpeutic implications",
              "Molecular Regulation of Adult Human Lens Epithelial Stem cells: Change with aging and Cataract",
              "Investigating Molecular Signatures of Anti-VEGF Treatment Response and the Therapeutic Potential of RBP3 in Diabetic Macular Edema"
          ],
          "city": "Madurai",
          "state": "Tamil Nadu",
          "color": "#9D174D"
      }
  },
  {
      "id": "amrf_phd_ongoing_kollam",
      "name": "Kollam (1 Ph.D. Thesis)",
      "rawName": "Kollam",
      "entityId": "amrf",
      "subcategoryId": "ongoing_phd",
      "country": "India",
      "state": "Kerala",
      "city": "Kollam",
      "latitude": 8.8932,
      "longitude": 76.65,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Kollam",
          "state": "Kerala",
          "status": "Ongoing",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "ongoing",
          "count": 1,
          "thesesList": [
              "Molecular Regulators Associated with the maintenance of Human Trabecular Meshwork Stem Cells in relation to their reduction in ageing and Glaucoma"
          ],
          "city": "Kollam",
          "state": "Kerala",
          "color": "#9D174D"
      }
  },
  {
      "id": "amrf_phd_ongoing_dindugal",
      "name": "Dindugal (1 Ph.D. Thesis)",
      "rawName": "Dindugal",
      "entityId": "amrf",
      "subcategoryId": "ongoing_phd",
      "country": "India",
      "state": "Tamil Nadu",
      "city": "Dindugal",
      "latitude": 10.3673,
      "longitude": 77.9803,
      "type": "PhD Scholar",
      "metrics": {
          "count": 1,
          "city": "Dindugal",
          "state": "Tamil Nadu",
          "status": "Ongoing",
          "degree": "Ph.D. Ocular Sciences"
      },
      "metadata": {
          "status": "ongoing",
          "count": 1,
          "thesesList": [
              "Molecular Characterization of Human Retinal Pigment Epithelial Stem Cells and their role in Age-related macular degeneration"
          ],
          "city": "Dindugal",
          "state": "Tamil Nadu",
          "color": "#9D174D"
      }
  },
  {
      "id": "amrf_collab_ulster",
      "name": "Ulster University",
      "rawName": "Ulster University",
      "entityId": "amrf",
      "subcategoryId": "collaboratives",
      "country": "United Kingdom",
      "state": "Northern Ireland",
      "city": "Coleraine",
      "latitude": 55.1487,
      "longitude": -6.6766,
      "type": "University Collaborator",
      "metrics": {
          "partnerType": "University",
          "focus": "Ocular Research & Vision Science"
      },
      "metadata": {
          "isCollaborator": true,
          "institutionName": "Ulster University"
      }
  },
  {
      "id": "amrf_collab_paris",
      "name": "University of Paris",
      "rawName": "University of Paris",
      "entityId": "amrf",
      "subcategoryId": "collaboratives",
      "country": "France",
      "state": "Île-de-France",
      "city": "Paris",
      "latitude": 48.8566,
      "longitude": 2.3522,
      "type": "University Collaborator",
      "metrics": {
          "partnerType": "University",
          "focus": "Genomics & Ocular Immunology"
      },
      "metadata": {
          "isCollaborator": true,
          "institutionName": "University of Paris"
      }
  },
  {
      "id": "amrf_collab_liverpool",
      "name": "University of Liverpool",
      "rawName": "University of Liverpool",
      "entityId": "amrf",
      "subcategoryId": "collaboratives",
      "country": "United Kingdom",
      "state": "England",
      "city": "Liverpool",
      "latitude": 53.406,
      "longitude": -2.966,
      "type": "University Collaborator",
      "metrics": {
          "partnerType": "University",
          "focus": "Retinal Imaging & Therapeutics"
      },
      "metadata": {
          "isCollaborator": true,
          "institutionName": "University of Liverpool"
      }
  },
  {
      "id": "amrf_collab_ucl",
      "name": "University College of London",
      "rawName": "University College of London",
      "entityId": "amrf",
      "subcategoryId": "collaboratives",
      "country": "United Kingdom",
      "state": "England",
      "city": "London",
      "latitude": 51.5246,
      "longitude": -0.134,
      "type": "University Collaborator",
      "metrics": {
          "partnerType": "University",
          "focus": "Limbal Stem Cell Therapy"
      },
      "metadata": {
          "isCollaborator": true,
          "institutionName": "University College of London"
      }
  },
  {
      "id": "amrf_collab_mcmaster",
      "name": "McMaster University",
      "rawName": "McMaster University",
      "entityId": "amrf",
      "subcategoryId": "collaboratives",
      "country": "Canada",
      "state": "Ontario",
      "city": "Hamilton",
      "latitude": 43.2609,
      "longitude": -79.9192,
      "type": "University Collaborator",
      "metrics": {
          "partnerType": "University",
          "focus": "Translational Vision Genetics"
      },
      "metadata": {
          "isCollaborator": true,
          "institutionName": "McMaster University"
      }
  },
  {
      "id": "amrf_collab_iowa",
      "name": "University of IOWA",
      "rawName": "University of IOWA",
      "entityId": "amrf",
      "subcategoryId": "collaboratives",
      "country": "USA",
      "state": "Iowa",
      "city": "Iowa City",
      "latitude": 41.6627,
      "longitude": -91.5549,
      "type": "University Collaborator",
      "metrics": {
          "partnerType": "University",
          "focus": "Glaucoma Molecular Genetics"
      },
      "metadata": {
          "isCollaborator": true,
          "institutionName": "University of IOWA"
      }
  },
  {
      "id": "amrf_collab_lshtm",
      "name": "London School of Hygiene & Tropical Medicine",
      "rawName": "LSHTM",
      "entityId": "amrf",
      "subcategoryId": "collaboratives",
      "country": "United Kingdom",
      "state": "England",
      "city": "London",
      "latitude": 51.5208,
      "longitude": -0.1302,
      "type": "Research Institute",
      "metrics": {
          "partnerType": "Institute",
          "focus": "Ocular Epidemiology & Trachoma Control"
      },
      "metadata": {
          "isCollaborator": true,
          "institutionName": "London School of Hygiene & Tropical Medicine"
      }
  },
  {
      "id": "amrf_collab_edinburgh",
      "name": "University of Edinburgh",
      "rawName": "University of Edinburgh",
      "entityId": "amrf",
      "subcategoryId": "collaboratives",
      "country": "United Kingdom",
      "state": "Scotland",
      "city": "Edinburgh",
      "latitude": 55.9445,
      "longitude": -3.1892,
      "type": "University Collaborator",
      "metrics": {
          "partnerType": "University",
          "focus": "Proteomics & Bio-Marker Profiling"
      },
      "metadata": {
          "isCollaborator": true,
          "institutionName": "University of Edinburgh"
      }
  },
  {
      "id": "amrf_collab_dartmouth",
      "name": "Dartmouth Hitchcock Medical Center",
      "rawName": "Dartmouth Hitchcock Medical Center",
      "entityId": "amrf",
      "subcategoryId": "collaboratives",
      "country": "USA",
      "state": "New Hampshire",
      "city": "Lebanon",
      "latitude": 43.6706,
      "longitude": -72.2725,
      "type": "Medical Center Collaborator",
      "metrics": {
          "partnerType": "Medical Center",
          "focus": "Ocular Microbiology & Diagnostics"
      },
      "metadata": {
          "isCollaborator": true,
          "institutionName": "Dartmouth Hitchcock Medical Center"
      }
  },
  {
      "id": "amrf_collab_moorfields",
      "name": "Moorfields Eye Hospital",
      "rawName": "Moorfields Eye Hospital",
      "entityId": "amrf",
      "subcategoryId": "collaboratives",
      "country": "United Kingdom",
      "state": "England",
      "city": "London",
      "latitude": 51.5258,
      "longitude": -0.0886,
      "type": "Hospital & Research Center",
      "metrics": {
          "partnerType": "Eye Hospital",
          "focus": "Clinical Research & Ophthalmic Surgery"
      },
      "metadata": {
          "isCollaborator": true,
          "institutionName": "Moorfields Eye Hospital"
      }
  },
  {
      "id": "amrf_collab_pasteur",
      "name": "Institut Pasteur",
      "rawName": "Institut Pasteur",
      "entityId": "amrf",
      "subcategoryId": "collaboratives",
      "country": "France",
      "state": "Île-de-France",
      "city": "Paris",
      "latitude": 48.8397,
      "longitude": 2.3117,
      "type": "Research Institute",
      "metrics": {
          "partnerType": "Research Institute",
          "focus": "Fungal Keratitis & Pathogen Genomics"
      },
      "metadata": {
          "isCollaborator": true,
          "institutionName": "Institut Pasteur"
      }
  },
  {
      "id": "amrf_collab_ccmb",
      "name": "CSIR-CCMB",
      "rawName": "CSIR-CCMB",
      "entityId": "amrf",
      "subcategoryId": "collaboratives",
      "country": "India",
      "state": "Telangana",
      "city": "Hyderabad",
      "latitude": 17.4243,
      "longitude": 78.5446,
      "type": "Research Institute",
      "metrics": {
          "partnerType": "National Institute",
          "focus": "Cellular & Molecular Biology"
      },
      "metadata": {
          "isCollaborator": true,
          "institutionName": "CSIR-CCMB"
      }
  },
  {
      "id": "amrf_student_kit_1",
      "name": "Royal Tropical Institute (Fellow #1)",
      "rawName": "Royal Tropical Institute",
      "entityId": "amrf",
      "subcategoryId": "students_abroad",
      "country": "The Netherlands",
      "state": "North Holland",
      "city": "Amsterdam",
      "latitude": 52.3622,
      "longitude": 4.9221,
      "type": "International Student / Fellow",
      "metrics": {
          "fellowCount": 1,
          "researchFocus": "Global Tropical Ophthalmology"
      },
      "metadata": {
          "isStudentAbroad": true,
          "institutionName": "Royal Tropical Institute, Amsterdam"
      }
  },
  {
      "id": "amrf_student_kit_2",
      "name": "Royal Tropical Institute (Fellow #2)",
      "rawName": "Royal Tropical Institute",
      "entityId": "amrf",
      "subcategoryId": "students_abroad",
      "country": "The Netherlands",
      "state": "North Holland",
      "city": "Amsterdam",
      "latitude": 52.367,
      "longitude": 4.928,
      "type": "International Student / Fellow",
      "metrics": {
          "fellowCount": 1,
          "researchFocus": "Community Eye Care Health"
      },
      "metadata": {
          "isStudentAbroad": true,
          "institutionName": "Royal Tropical Institute, Amsterdam"
      }
  },
  {
      "id": "amrf_student_drexel",
      "name": "Drexel University College of Medicine",
      "rawName": "Drexel University",
      "entityId": "amrf",
      "subcategoryId": "students_abroad",
      "country": "USA",
      "state": "Pennsylvania",
      "city": "Philadelphia",
      "latitude": 39.9566,
      "longitude": -75.1899,
      "type": "International Student / Fellow",
      "metrics": {
          "fellowCount": 1,
          "researchFocus": "Clinical Ophthalmic Research"
      },
      "metadata": {
          "isStudentAbroad": true,
          "institutionName": "Drexel University College of Medicine"
      }
  },
  {
      "id": "amrf_student_giessen",
      "name": "University of Giessen",
      "rawName": "University of Giessen",
      "entityId": "amrf",
      "subcategoryId": "students_abroad",
      "country": "Germany",
      "state": "Hesse",
      "city": "Giessen",
      "latitude": 50.5873,
      "longitude": 8.6835,
      "type": "International Student / Fellow",
      "metrics": {
          "fellowCount": 1,
          "researchFocus": "Ocular Pathology & Proteomics"
      },
      "metadata": {
          "isStudentAbroad": true,
          "institutionName": "University of Giessen"
      }
  },
  {
      "id": "amrf_student_lshtm_abroad",
      "name": "London School of Hygiene and Tropical Medicine",
      "rawName": "LSHTM",
      "entityId": "amrf",
      "subcategoryId": "students_abroad",
      "country": "United Kingdom",
      "state": "England",
      "city": "London",
      "latitude": 51.5208,
      "longitude": -0.1302,
      "type": "International Student / Fellow",
      "metrics": {
          "fellowCount": 1,
          "researchFocus": "Epidemiological Eye Research"
      },
      "metadata": {
          "isStudentAbroad": true,
          "institutionName": "London School of Hygiene & Tropical Medicine"
      }
  },
  {
      "id": "amrf_student_pasteur_abroad",
      "name": "Institut Pasteur",
      "rawName": "Institut Pasteur",
      "entityId": "amrf",
      "subcategoryId": "students_abroad",
      "country": "France",
      "state": "Île-de-France",
      "city": "Paris",
      "latitude": 48.8397,
      "longitude": 2.3117,
      "type": "International Student / Fellow",
      "metrics": {
          "fellowCount": 1,
          "researchFocus": "Microbiology & Mycotic Keratitis"
      },
      "metadata": {
          "isStudentAbroad": true,
          "institutionName": "Institut Pasteur, Paris"
      }
  }
];

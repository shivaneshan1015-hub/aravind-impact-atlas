export interface StateMeta {
  code: string;
  name: string;
  centroid: [number, number]; // [lng, lat]
  bounds: [[number, number], [number, number]]; // [[minLng, minLat], [maxLng, maxLat]]
}

export const INDIA_STATES_META: Record<string, StateMeta> = {
  "Tamil Nadu": {
    code: "TN",
    name: "Tamil Nadu",
    centroid: [78.6569, 11.1271],
    bounds: [[76.24, 8.08], [80.34, 13.56]],
  },
  Kerala: {
    code: "KL",
    name: "Kerala",
    centroid: [76.2711, 10.4505],
    bounds: [[74.86, 8.29], [77.58, 12.79]],
  },
  Karnataka: {
    code: "KA",
    name: "Karnataka",
    centroid: [75.7139, 14.3173],
    bounds: [[74.05, 11.59], [78.58, 18.45]],
  },
  "Andhra Pradesh": {
    code: "AP",
    name: "Andhra Pradesh",
    centroid: [79.24, 15.4129],
    bounds: [[76.84, 12.62], [84.77, 19.14]],
  },
  Telangana: {
    code: "TS",
    name: "Telangana",
    centroid: [79.0193, 17.8124],
    bounds: [[77.24, 15.83], [81.32, 19.91]],
  },
  Maharashtra: {
    code: "MH",
    name: "Maharashtra",
    centroid: [75.7139, 19.5515],
    bounds: [[72.66, 15.60], [80.89, 22.03]],
  },
  Gujarat: {
    code: "GJ",
    name: "Gujarat",
    centroid: [71.1924, 22.2587],
    bounds: [[68.16, 20.12], [74.47, 24.70]],
  },
  "West Bengal": {
    code: "WB",
    name: "West Bengal",
    centroid: [87.855, 23.5868],
    bounds: [[85.83, 21.53], [89.88, 27.22]],
  },
  Delhi: {
    code: "DL",
    name: "Delhi",
    centroid: [77.1025, 28.7041],
    bounds: [[76.84, 28.40], [77.34, 28.88]],
  },
  Rajasthan: {
    code: "RJ",
    name: "Rajasthan",
    centroid: [74.2179, 27.0238],
    bounds: [[69.50, 23.06], [78.27, 30.20]],
  },
  Odisha: {
    code: "OD",
    name: "Odisha",
    centroid: [84.8035, 20.3517],
    bounds: [[81.39, 17.81], [87.49, 22.57]],
  },
  Punjab: {
    code: "PB",
    name: "Punjab",
    centroid: [75.3412, 31.1471],
    bounds: [[73.88, 29.53], [76.92, 32.55]],
  },
  "Uttar Pradesh": {
    code: "UP",
    name: "Uttar Pradesh",
    centroid: [80.9462, 26.8467],
    bounds: [[77.08, 23.87], [84.63, 30.41]],
  },
  "Madhya Pradesh": {
    code: "MP",
    name: "Madhya Pradesh",
    centroid: [78.6569, 22.9734],
    bounds: [[74.04, 21.07], [82.80, 26.87]],
  },
  Bihar: {
    code: "BR",
    name: "Bihar",
    centroid: [85.3131, 25.0961],
    bounds: [[83.33, 24.28], [88.29, 27.52]],
  },
  Haryana: {
    code: "HR",
    name: "Haryana",
    centroid: [76.0856, 29.0588],
    bounds: [[74.45, 27.65], [77.60, 30.92]],
  },
  "Himachal Pradesh": {
    code: "HP",
    name: "Himachal Pradesh",
    centroid: [77.1734, 31.1048],
    bounds: [[75.59, 30.38], [79.00, 33.22]],
  },
  "Jammu & Kashmir": {
    code: "JK",
    name: "Jammu & Kashmir",
    centroid: [74.7973, 33.7782],
    bounds: [[73.43, 32.28], [77.83, 35.15]],
  },
  Ladakh: {
    code: "LA",
    name: "Ladakh",
    centroid: [77.5771, 34.1526],
    bounds: [[75.50, 32.50], [80.30, 36.00]],
  },
  Uttarakhand: {
    code: "UK",
    name: "Uttarakhand",
    centroid: [79.0193, 30.0668],
    bounds: [[77.57, 28.72], [81.04, 31.46]],
  },
  Assam: {
    code: "AS",
    name: "Assam",
    centroid: [92.9376, 26.2006],
    bounds: [[89.70, 24.13], [96.02, 27.97]],
  },
  Meghalaya: {
    code: "ML",
    name: "Meghalaya",
    centroid: [91.3662, 25.4670],
    bounds: [[89.82, 25.03], [92.80, 26.12]],
  },
  Tripura: {
    code: "TR",
    name: "Tripura",
    centroid: [91.9882, 23.9408],
    bounds: [[91.15, 22.94], [92.34, 24.53]],
  },
  Mizoram: {
    code: "MZ",
    name: "Mizoram",
    centroid: [92.9376, 23.1645],
    bounds: [[92.26, 21.95], [93.44, 24.52]],
  },
  Manipur: {
    code: "MN",
    name: "Manipur",
    centroid: [93.9063, 24.6637],
    bounds: [[93.05, 23.83], [94.78, 25.68]],
  },
  Nagaland: {
    code: "NL",
    name: "Nagaland",
    centroid: [94.5624, 26.1584],
    bounds: [[93.33, 25.20], [95.25, 27.04]],
  },
  "Arunachal Pradesh": {
    code: "AR",
    name: "Arunachal Pradesh",
    centroid: [94.7278, 28.2180],
    bounds: [[91.58, 26.63], [97.40, 29.47]],
  },
  Sikkim: {
    code: "SK",
    name: "Sikkim",
    centroid: [88.5122, 27.5330],
    bounds: [[88.01, 27.08], [88.92, 28.13]],
  },
  Goa: {
    code: "GA",
    name: "Goa",
    centroid: [74.1240, 15.2993],
    bounds: [[73.68, 14.90], [74.34, 15.80]],
  },
  Chhattisgarh: {
    code: "CG",
    name: "Chhattisgarh",
    centroid: [81.8661, 21.2787],
    bounds: [[80.25, 17.78], [84.40, 24.10]],
  },
  Jharkhand: {
    code: "JH",
    name: "Jharkhand",
    centroid: [85.3096, 23.6102],
    bounds: [[83.32, 21.97], [87.92, 25.33]],
  },
  Puducherry: {
    code: "PY",
    name: "Puducherry",
    centroid: [79.8083, 11.9416],
    bounds: [[79.60, 11.70], [79.90, 12.10]],
  },
  "Andaman & Nicobar": {
    code: "AN",
    name: "Andaman & Nicobar",
    centroid: [92.6586, 11.6234],
    bounds: [[92.20, 6.70], [93.90, 13.70]],
  },
  Chandigarh: {
    code: "CH",
    name: "Chandigarh",
    centroid: [76.7794, 30.7333],
    bounds: [[76.70, 30.68], [76.85, 30.79]],
  },
  "Dadra & Nagar Haveli": {
    code: "DN",
    name: "Dadra & Nagar Haveli",
    centroid: [73.0169, 20.1809],
    bounds: [[72.85, 20.05], [73.20, 20.40]],
  },
  Lakshadweep: {
    code: "LD",
    name: "Lakshadweep",
    centroid: [72.6420, 10.5667],
    bounds: [[72.10, 8.20], [73.80, 12.40]],
  },
};

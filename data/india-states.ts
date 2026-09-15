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
    bounds: [
      [76.24, 8.08],
      [80.34, 13.56],
    ],
  },
  Kerala: {
    code: "KL",
    name: "Kerala",
    centroid: [76.2711, 10.8505],
    bounds: [
      [74.86, 8.29],
      [77.58, 12.79],
    ],
  },
  Karnataka: {
    code: "KA",
    name: "Karnataka",
    centroid: [75.7139, 15.3173],
    bounds: [
      [74.05, 11.59],
      [78.58, 18.45],
    ],
  },
  "Andhra Pradesh": {
    code: "AP",
    name: "Andhra Pradesh",
    centroid: [79.74, 15.9129],
    bounds: [
      [76.84, 12.62],
      [84.77, 19.14],
    ],
  },
  Telangana: {
    code: "TS",
    name: "Telangana",
    centroid: [79.0193, 18.1124],
    bounds: [
      [77.24, 15.83],
      [81.32, 19.91],
    ],
  },
  Maharashtra: {
    code: "MH",
    name: "Maharashtra",
    centroid: [75.7139, 19.7515],
    bounds: [
      [72.66, 15.60],
      [80.89, 22.03],
    ],
  },
  Gujarat: {
    code: "GJ",
    name: "Gujarat",
    centroid: [71.1924, 22.2587],
    bounds: [
      [68.16, 20.12],
      [74.47, 24.70],
    ],
  },
  "West Bengal": {
    code: "WB",
    name: "West Bengal",
    centroid: [87.855, 22.9868],
    bounds: [
      [85.83, 21.53],
      [89.88, 27.22],
    ],
  },
  Delhi: {
    code: "DL",
    name: "Delhi",
    centroid: [77.1025, 28.7041],
    bounds: [
      [76.84, 28.40],
      [77.34, 28.88],
    ],
  },
  Rajasthan: {
    code: "RJ",
    name: "Rajasthan",
    centroid: [74.2179, 27.0238],
    bounds: [
      [69.50, 23.06],
      [78.27, 30.20],
    ],
  },
  Odisha: {
    code: "OD",
    name: "Odisha",
    centroid: [84.8035, 20.9517],
    bounds: [
      [81.39, 17.81],
      [87.49, 22.57],
    ],
  },
  Punjab: {
    code: "PB",
    name: "Punjab",
    centroid: [75.3412, 31.1471],
    bounds: [
      [73.88, 29.53],
      [76.92, 32.55],
    ],
  },
  Assam: {
    code: "AS",
    name: "Assam",
    centroid: [92.9376, 26.2006],
    bounds: [
      [89.70, 24.13],
      [96.02, 27.97],
    ],
  },
  Bihar: {
    code: "BR",
    name: "Bihar",
    centroid: [85.3131, 25.0961],
    bounds: [
      [83.33, 24.28],
      [88.29, 27.52],
    ],
  },
  Haryana: {
    code: "HR",
    name: "Haryana",
    centroid: [76.0856, 29.0588],
    bounds: [
      [74.45, 27.65],
      [77.60, 30.92],
    ],
  },
  "Madhya Pradesh": {
    code: "MP",
    name: "Madhya Pradesh",
    centroid: [78.6569, 22.9734],
    bounds: [
      [74.04, 21.08],
      [82.82, 26.87],
    ],
  },
  Puducherry: {
    code: "PY",
    name: "Puducherry",
    centroid: [79.8083, 11.9416],
    bounds: [
      [79.75, 11.90],
      [79.85, 12.00],
    ],
  },
};

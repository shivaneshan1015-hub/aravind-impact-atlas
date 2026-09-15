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
    centroid: [76.2711, 10.4505],
    bounds: [
      [74.86, 8.29],
      [77.58, 12.79],
    ],
  },
  Karnataka: {
    code: "KA",
    name: "Karnataka",
    centroid: [75.7139, 14.3173],
    bounds: [
      [74.05, 11.59],
      [78.58, 18.45],
    ],
  },
  "Andhra Pradesh": {
    code: "AP",
    name: "Andhra Pradesh",
    centroid: [79.24, 15.4129],
    bounds: [
      [76.84, 12.62],
      [84.77, 19.14],
    ],
  },
  Telangana: {
    code: "TS",
    name: "Telangana",
    centroid: [79.0193, 17.8124],
    bounds: [
      [77.24, 15.83],
      [81.32, 19.91],
    ],
  },
  Maharashtra: {
    code: "MH",
    name: "Maharashtra",
    centroid: [75.7139, 19.5515],
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
    centroid: [87.855, 23.5868],
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
    centroid: [84.8035, 20.3517],
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
};

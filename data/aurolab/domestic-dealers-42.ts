import { GeoLocationItem } from "@/types/geo";

export interface AurolabDealerRecord {
  sNo: number;
  city: string;
  state: string;
  lat: number;
  lng: number;
  dealerName: string;
}

// Transposed from Image 5: Aurolab Domestic Dealers (42 Dealers across Indian cities)
export const AUROLAB_DOMESTIC_DEALERS_42: AurolabDealerRecord[] = [
  { sNo: 1, city: "Delhi", state: "Delhi", lat: 28.7041, lng: 77.1025, dealerName: "Aurolab Dealer 1 (Delhi North)" },
  { sNo: 2, city: "Delhi", state: "Delhi", lat: 28.6139, lng: 77.209, dealerName: "Aurolab Dealer 2 (Delhi Central)" },
  { sNo: 3, city: "Delhi", state: "Delhi", lat: 28.55, lng: 77.12, dealerName: "Aurolab Dealer 3 (Delhi South)" },
  { sNo: 4, city: "Shahabad", state: "Haryana", lat: 30.17, lng: 76.87, dealerName: "Aurolab Dealer (Shahabad)" },
  { sNo: 5, city: "Amritsar", state: "Punjab", lat: 31.634, lng: 74.8723, dealerName: "Aurolab Dealer 1 (Amritsar)" },
  { sNo: 6, city: "Amritsar", state: "Punjab", lat: 31.64, lng: 74.88, dealerName: "Aurolab Dealer 2 (Amritsar East)" },
  { sNo: 7, city: "Srinagar", state: "Jammu and Kashmir", lat: 34.0837, lng: 74.7973, dealerName: "Aurolab Dealer (Srinagar)" },
  { sNo: 8, city: "Chandigarh", state: "Chandigarh", lat: 30.7333, lng: 76.7794, dealerName: "Aurolab Dealer (Chandigarh)" },
  { sNo: 9, city: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, dealerName: "Aurolab Dealer (Jaipur)" },
  { sNo: 10, city: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739, dealerName: "Aurolab Dealer (Varanasi)" },
  { sNo: 11, city: "Meerut", state: "Uttar Pradesh", lat: 28.9845, lng: 77.7064, dealerName: "Aurolab Dealer (Meerut)" },
  { sNo: 12, city: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, dealerName: "Aurolab Dealer (Lucknow)" },
  { sNo: 13, city: "Gorakhpur", state: "Uttar Pradesh", lat: 26.7606, lng: 83.3732, dealerName: "Aurolab Dealer (Gorakhpur)" },
  { sNo: 14, city: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, dealerName: "Aurolab Dealer 1 (Kolkata Central)" },
  { sNo: 15, city: "Kolkata", state: "West Bengal", lat: 22.58, lng: 88.37, dealerName: "Aurolab Dealer 2 (Kolkata East)" },
  { sNo: 16, city: "Kolkata", state: "West Bengal", lat: 22.56, lng: 88.35, dealerName: "Aurolab Dealer 3 (Kolkata South)" },
  { sNo: 17, city: "Guwahati", state: "Assam", lat: 26.1445, lng: 91.7362, dealerName: "Aurolab Dealer (Guwahati)" },
  { sNo: 18, city: "Begusarai", state: "Bihar", lat: 25.418, lng: 86.128, dealerName: "Aurolab Dealer (Begusarai)" },
  { sNo: 19, city: "Patna", state: "Bihar", lat: 25.5941, lng: 85.1376, dealerName: "Aurolab Dealer (Patna)" },
  { sNo: 20, city: "Ranchi", state: "Jharkhand", lat: 23.3441, lng: 85.3096, dealerName: "Aurolab Dealer (Ranchi)" },
  { sNo: 21, city: "Bhubaneshwar", state: "Odisha", lat: 20.2961, lng: 85.8245, dealerName: "Aurolab Dealer (Bhubaneshwar)" },
  { sNo: 22, city: "Hyderabad", state: "Telangana", lat: 17.385, lng: 78.4867, dealerName: "Aurolab Dealer (Hyderabad)" },
  { sNo: 23, city: "Bangalore", state: "Karnataka", lat: 12.9716, lng: 77.5946, dealerName: "Aurolab Dealer (Bangalore)" },
  { sNo: 24, city: "Cochin", state: "Kerala", lat: 9.9816, lng: 76.2711, dealerName: "Aurolab Dealer (Cochin)" },
  { sNo: 25, city: "Kannur", state: "Kerala", lat: 11.8745, lng: 75.3704, dealerName: "Aurolab Dealer (Kannur)" },
  { sNo: 26, city: "Madurai", state: "Tamil Nadu", lat: 9.9252, lng: 78.1198, dealerName: "Aurolab Manufacturing Hub (Madurai)" },
  { sNo: 27, city: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, dealerName: "Aurolab Dealer 1 (Chennai Central)" },
  { sNo: 28, city: "Chennai", state: "Tamil Nadu", lat: 13.06, lng: 80.25, dealerName: "Aurolab Dealer 2 (Chennai West)" },
  { sNo: 29, city: "Pollachi", state: "Tamil Nadu", lat: 10.66, lng: 77.005, dealerName: "Aurolab Dealer (Pollachi)" },
  { sNo: 30, city: "Coimbatore", state: "Tamil Nadu", lat: 11.0168, lng: 76.9558, dealerName: "Aurolab Dealer (Coimbatore)" },
  { sNo: 31, city: "Chennai", state: "Tamil Nadu", lat: 13.09, lng: 80.28, dealerName: "Aurolab Dealer 3 (Chennai North)" },
  { sNo: 32, city: "Vishakapatnam", state: "Andhra Pradesh", lat: 17.6868, lng: 83.2185, dealerName: "Aurolab Dealer (Vishakapatnam)" },
  { sNo: 33, city: "Vijayawada", state: "Andhra Pradesh", lat: 16.5062, lng: 80.648, dealerName: "Aurolab Dealer (Vijayawada)" },
  { sNo: 34, city: "Indore", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577, dealerName: "Aurolab Dealer (Indore)" },
  { sNo: 35, city: "Jabalpur", state: "Madhya Pradesh", lat: 23.1815, lng: 79.9864, dealerName: "Aurolab Dealer (Jabalpur)" },
  { sNo: 36, city: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, dealerName: "Aurolab Dealer (Pune)" },
  { sNo: 37, city: "Sangli", state: "Maharashtra", lat: 16.8524, lng: 74.5815, dealerName: "Aurolab Dealer (Sangli)" },
  { sNo: 38, city: "Mumbai", state: "Maharashtra", lat: 19.076, lng: 72.8777, dealerName: "Aurolab Dealer 1 (Mumbai South)" },
  { sNo: 39, city: "Mumbai", state: "Maharashtra", lat: 19.05, lng: 72.85, dealerName: "Aurolab Dealer 2 (Mumbai Suburbs)" },
  { sNo: 40, city: "Nagpur", state: "Maharashtra", lat: 21.1458, lng: 79.0882, dealerName: "Aurolab Dealer (Nagpur)" },
  { sNo: 41, city: "Raipur", state: "Chhattisgarh", lat: 21.2514, lng: 81.6296, dealerName: "Aurolab Dealer (Raipur)" },
  { sNo: 42, city: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, dealerName: "Aurolab Dealer (Ahmedabad)" },
];

export const AUROLAB_DOMESTIC_LOCATIONS: GeoLocationItem[] = AUROLAB_DOMESTIC_DEALERS_42.map((d) => ({
  id: `aurolab_domestic_${d.sNo}`,
  name: `${d.city} District`,
  rawName: d.city,
  entityId: "aurolab",
  subcategoryId: "domestic",
  country: "India",
  state: d.state,
  city: d.city,
  latitude: d.lat,
  longitude: d.lng,
  metrics: {
    District: d.city,
    State: d.state,
    Country: "India",
    "Distribution Node": `#${d.sNo}`,
  },
  address: `${d.city}, ${d.state}, India`,
}));

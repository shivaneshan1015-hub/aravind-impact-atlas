import { GeoLocationItem } from "@/types/geo";

export type StaffGroup = "employees" | "trainees";
export type StaffCategory = "admin" | "doctors" | "post_graduates" | "aop" | "support";

export interface StaffCategoryMeta {
  id: StaffCategory;
  name: string;
  count: number;
  color: string;
  bgLight: string;
}

export const EMPLOYEE_CATEGORIES: Record<StaffCategory, StaffCategoryMeta> = {
  admin: {
    id: "admin",
    name: "Admin",
    count: 843,
    color: "#1E293B", // Dark Slate
    bgLight: "bg-slate-900 text-white border-slate-800",
  },
  doctors: {
    id: "doctors",
    name: "Doctors",
    count: 445,
    color: "#065F46", // Dark Forest Emerald
    bgLight: "bg-emerald-900 text-white border-emerald-800",
  },
  post_graduates: {
    id: "post_graduates",
    name: "Post Graduates",
    count: 0,
    color: "#581C87", // Dark Purple
    bgLight: "bg-purple-950 text-white border-purple-900",
  },
  aop: {
    id: "aop",
    name: "AOP",
    count: 2415,
    color: "#312E81", // Dark Midnight Indigo
    bgLight: "bg-indigo-950 text-white border-indigo-900",
  },
  support: {
    id: "support",
    name: "Support Services",
    count: 289,
    color: "#701A75", // Dark Velvet Plum
    bgLight: "bg-fuchsia-950 text-white border-fuchsia-900",
  },
};

export const TRAINEE_CATEGORIES: Record<StaffCategory, StaffCategoryMeta> = {
  admin: {
    id: "admin",
    name: "Admin Trainees",
    count: 102,
    color: "#1E293B", // Dark Slate
    bgLight: "bg-slate-900 text-white border-slate-800",
  },
  doctors: {
    id: "doctors",
    name: "Fellows",
    count: 351,
    color: "#065F46", // Dark Forest Emerald
    bgLight: "bg-emerald-900 text-white border-emerald-800",
  },
  post_graduates: {
    id: "post_graduates",
    name: "Post Graduates",
    count: 187,
    color: "#581C87", // Dark Purple
    bgLight: "bg-purple-950 text-white border-purple-900",
  },
  aop: {
    id: "aop",
    name: "AOP Trainees",
    count: 2009,
    color: "#312E81", // Dark Midnight Indigo
    bgLight: "bg-indigo-950 text-white border-indigo-900",
  },
  support: {
    id: "support",
    name: "Support Services Trainees",
    count: 27,
    color: "#701A75", // Dark Velvet Plum
    bgLight: "bg-fuchsia-950 text-white border-fuchsia-900",
  },
};

export interface DistrictCoords {
  lat: number;
  lng: number;
  state: string;
  country: string;
}

export const DISTRICT_COORDINATES: Record<string, DistrictCoords> = {
  "Ahmedabad": { lat: 23.0225, lng: 72.5714, state: "Gujarat", country: "India" },
  "Alappuzha": { lat: 9.4981, lng: 76.3388, state: "Kerala", country: "India" },
  "Amravati": { lat: 20.9374, lng: 77.7796, state: "Maharashtra", country: "India" },
  "Ananthapur": { lat: 14.6819, lng: 77.6006, state: "Andhra Pradesh", country: "India" },
  "Ariyalur": { lat: 11.1401, lng: 79.0786, state: "Tamil Nadu", country: "India" },
  "Bangalore": { lat: 12.9716, lng: 77.5946, state: "Karnataka", country: "India" },
  "Belgaum": { lat: 15.8497, lng: 74.4977, state: "Karnataka", country: "India" },
  "Bidar": { lat: 17.9104, lng: 77.5199, state: "Karnataka", country: "India" },
  "Bongaigaon": { lat: 26.5030, lng: 90.5578, state: "Assam", country: "India" },
  "Chengalpattu": { lat: 12.6819, lng: 79.9888, state: "Tamil Nadu", country: "India" },
  "Chennai": { lat: 13.0827, lng: 80.2707, state: "Tamil Nadu", country: "India" },
  "Chittoor": { lat: 13.2172, lng: 79.1003, state: "Andhra Pradesh", country: "India" },
  "Coimbatore": { lat: 11.0168, lng: 76.9558, state: "Tamil Nadu", country: "India" },
  "Cuddalore": { lat: 11.7480, lng: 79.7714, state: "Tamil Nadu", country: "India" },
  "Cuddapah": { lat: 14.4673, lng: 78.8242, state: "Andhra Pradesh", country: "India" },
  "Cuttack": { lat: 20.4625, lng: 85.8828, state: "Odisha", country: "India" },
  "Dakshina Kannada": { lat: 12.9141, lng: 74.8560, state: "Karnataka", country: "India" },
  "Dharmapuri": { lat: 12.1211, lng: 78.1582, state: "Tamil Nadu", country: "India" },
  "Dharwad": { lat: 15.4589, lng: 75.0078, state: "Karnataka", country: "India" },
  "Dindigul": { lat: 10.3673, lng: 77.9803, state: "Tamil Nadu", country: "India" },
  "Ernakulam": { lat: 9.9816, lng: 76.2999, state: "Kerala", country: "India" },
  "Erode": { lat: 11.3410, lng: 77.7172, state: "Tamil Nadu", country: "India" },
  "Ganjam": { lat: 19.3149, lng: 84.7941, state: "Odisha", country: "India" },
  "Ghaziabad": { lat: 28.6692, lng: 77.4538, state: "Uttar Pradesh", country: "India" },
  "Golaghat": { lat: 26.5167, lng: 93.9667, state: "Assam", country: "India" },
  "Gulbarga": { lat: 17.3297, lng: 76.8343, state: "Karnataka", country: "India" },
  "Guntur": { lat: 16.3067, lng: 80.4365, state: "Andhra Pradesh", country: "India" },
  "Gwalior": { lat: 26.2183, lng: 78.1828, state: "Madhya Pradesh", country: "India" },
  "Hailakandi": { lat: 24.6833, lng: 92.5667, state: "Assam", country: "India" },
  "Hyderabad": { lat: 17.3850, lng: 78.4867, state: "Telangana", country: "India" },
  "Idukki": { lat: 9.8497, lng: 76.9806, state: "Kerala", country: "India" },
  "Jodhpur": { lat: 26.2389, lng: 73.0243, state: "Rajasthan", country: "India" },
  "K.V.Rangareddy": { lat: 17.3457, lng: 78.5492, state: "Telangana", country: "India" },
  "Kallakurichi": { lat: 11.7384, lng: 78.9639, state: "Tamil Nadu", country: "India" },
  "Kanchipuram": { lat: 12.8342, lng: 79.7036, state: "Tamil Nadu", country: "India" },
  "Kannur": { lat: 11.8745, lng: 75.3704, state: "Kerala", country: "India" },
  "Kanyakumari": { lat: 8.0883, lng: 77.5385, state: "Tamil Nadu", country: "India" },
  "Karaikal": { lat: 10.9254, lng: 79.8380, state: "Pondicherry", country: "India" },
  "Karur": { lat: 10.9601, lng: 78.0766, state: "Tamil Nadu", country: "India" },
  "Kasargod": { lat: 12.5102, lng: 74.9852, state: "Kerala", country: "India" },
  "Khorda": { lat: 20.1907, lng: 85.6425, state: "Odisha", country: "India" },
  "Kolhapur": { lat: 16.7050, lng: 74.2433, state: "Maharashtra", country: "India" },
  "Kolkata": { lat: 22.5726, lng: 88.3639, state: "West Bengal", country: "India" },
  "Kollam": { lat: 8.8932, lng: 76.6141, state: "Kerala", country: "India" },
  "Kottayam": { lat: 9.5916, lng: 76.5222, state: "Kerala", country: "India" },
  "Kozhikode": { lat: 11.2588, lng: 75.7804, state: "Kerala", country: "India" },
  "Krishna": { lat: 16.5062, lng: 80.6480, state: "Andhra Pradesh", country: "India" },
  "Krishnagiri": { lat: 12.5186, lng: 78.2137, state: "Tamil Nadu", country: "India" },
  "Kurnool": { lat: 15.8281, lng: 78.0373, state: "Andhra Pradesh", country: "India" },
  "Latur": { lat: 18.4088, lng: 76.5604, state: "Maharashtra", country: "India" },
  "Lucknow": { lat: 26.8467, lng: 80.9462, state: "Uttar Pradesh", country: "India" },
  "Madurai": { lat: 9.9252, lng: 78.1198, state: "Tamil Nadu", country: "India" },
  "Mumbai": { lat: 19.0760, lng: 72.8777, state: "Maharashtra", country: "India" },
  "Nagapattinam": { lat: 10.7656, lng: 79.8424, state: "Tamil Nadu", country: "India" },
  "Namakkal": { lat: 11.2189, lng: 78.1674, state: "Tamil Nadu", country: "India" },
  "Nellore": { lat: 14.4426, lng: 79.9865, state: "Andhra Pradesh", country: "India" },
  "Nilgiris": { lat: 11.4102, lng: 76.6950, state: "Tamil Nadu", country: "India" },
  "North 24 Parganas": { lat: 22.6168, lng: 88.4029, state: "West Bengal", country: "India" },
  "Palakkad": { lat: 10.7867, lng: 76.6548, state: "Kerala", country: "India" },
  "Pathanamthitta": { lat: 9.2648, lng: 76.7870, state: "Kerala", country: "India" },
  "Perambalur": { lat: 11.2333, lng: 78.8833, state: "Tamil Nadu", country: "India" },
  "Pondicherry": { lat: 11.9416, lng: 79.8083, state: "Pondicherry", country: "India" },
  "Prakasam": { lat: 15.5057, lng: 80.0499, state: "Andhra Pradesh", country: "India" },
  "Pudukkottai": { lat: 10.3833, lng: 78.8000, state: "Tamil Nadu", country: "India" },
  "Pune": { lat: 18.5204, lng: 73.8567, state: "Maharashtra", country: "India" },
  "Raichur": { lat: 16.2076, lng: 77.3463, state: "Karnataka", country: "India" },
  "Rajsamand": { lat: 25.0747, lng: 73.8828, state: "Rajasthan", country: "India" },
  "Ramanathapuram": { lat: 9.3639, lng: 78.8395, state: "Tamil Nadu", country: "India" },
  "Ranchi": { lat: 23.3441, lng: 85.3096, state: "Jharkhand", country: "India" },
  "Salem": { lat: 11.6643, lng: 78.1460, state: "Tamil Nadu", country: "India" },
  "Sambalpur": { lat: 21.4669, lng: 83.9812, state: "Odisha", country: "India" },
  "Sivaganga": { lat: 9.8433, lng: 78.4809, state: "Tamil Nadu", country: "India" },
  "Solapur": { lat: 17.6599, lng: 75.9064, state: "Maharashtra", country: "India" },
  "South West Delhi": { lat: 28.5921, lng: 77.0460, state: "Delhi", country: "India" },
  "Surat": { lat: 21.1702, lng: 72.8311, state: "Gujarat", country: "India" },
  "Tenkasi": { lat: 8.9593, lng: 77.3149, state: "Tamil Nadu", country: "India" },
  "Thane": { lat: 19.2183, lng: 72.9781, state: "Maharashtra", country: "India" },
  "Thanjavur": { lat: 10.7870, lng: 79.1378, state: "Tamil Nadu", country: "India" },
  "Theni": { lat: 10.0104, lng: 77.4768, state: "Tamil Nadu", country: "India" },
  "Thiruvananthapuram": { lat: 8.5241, lng: 76.9366, state: "Kerala", country: "India" },
  "Thrissur": { lat: 10.5276, lng: 76.2144, state: "Kerala", country: "India" },
  "Tinsukia": { lat: 27.4922, lng: 95.3558, state: "Assam", country: "India" },
  "Tiruchirappalli": { lat: 10.7905, lng: 78.7047, state: "Tamil Nadu", country: "India" },
  "Tirunelveli": { lat: 8.7139, lng: 77.7567, state: "Tamil Nadu", country: "India" },
  "Tirupur": { lat: 11.1085, lng: 77.3411, state: "Tamil Nadu", country: "India" },
  "Tiruvallur": { lat: 13.1432, lng: 79.9059, state: "Tamil Nadu", country: "India" },
  "Tiruvannamalai": { lat: 12.2253, lng: 79.0747, state: "Tamil Nadu", country: "India" },
  "Tiruvarur": { lat: 10.7725, lng: 79.6365, state: "Tamil Nadu", country: "India" },
  "Tumkur": { lat: 13.3379, lng: 77.1173, state: "Karnataka", country: "India" },
  "Tuticorin": { lat: 8.7642, lng: 78.1348, state: "Tamil Nadu", country: "India" },
  "Udupi": { lat: 13.3409, lng: 74.7421, state: "Karnataka", country: "India" },
  "Vellore": { lat: 12.9165, lng: 79.1325, state: "Tamil Nadu", country: "India" },
  "Villupuram": { lat: 11.9401, lng: 79.4861, state: "Tamil Nadu", country: "India" },
  "Virudhunagar": { lat: 9.5680, lng: 77.9624, state: "Tamil Nadu", country: "India" },
  "Visakhapatnam": { lat: 17.6868, lng: 83.2185, state: "Andhra Pradesh", country: "India" },
  "Wayanad": { lat: 11.6103, lng: 76.0827, state: "Kerala", country: "India" },
  "West Tripura": { lat: 23.8315, lng: 91.2868, state: "Tripura", country: "India" },
  "Agra": { lat: 27.1767, lng: 78.0081, state: "Uttar Pradesh", country: "India" },
  "Ahmed Nagar": { lat: 19.0948, lng: 74.748, state: "Maharashtra", country: "India" },
  "Akola": { lat: 20.7002, lng: 77.0082, state: "Maharashtra", country: "India" },
  "Alirajpur": { lat: 22.3041, lng: 74.3541, state: "Madhya Pradesh", country: "India" },
  "Ambala": { lat: 30.3782, lng: 76.7767, state: "Haryana", country: "India" },
  "Aurangabad": { lat: 19.8762, lng: 75.3433, state: "Maharashtra", country: "India" },
  "Balaghat": { lat: 21.808, lng: 80.184, state: "Madhya Pradesh", country: "India" },
  "Bardhaman": { lat: 23.2324, lng: 87.8615, state: "West Bengal", country: "India" },
  "Bellary": { lat: 15.1394, lng: 76.9214, state: "Karnataka", country: "India" },
  "Bhopal": { lat: 23.2599, lng: 77.4126, state: "Madhya Pradesh", country: "India" },
  "Bhutan": { lat: 27.5142, lng: 90.4336, state: "Thimphu", country: "Bhutan" },
  "Budgam": { lat: 34.0157, lng: 74.7176, state: "Jammu & Kashmir", country: "India" },
  "Buxar": { lat: 25.5647, lng: 83.9777, state: "Bihar", country: "India" },
  "Cachar": { lat: 24.8333, lng: 92.7667, state: "Assam", country: "India" },
  "Central Delhi": { lat: 28.6448, lng: 77.2167, state: "Delhi", country: "India" },
  "Chhindwara": { lat: 22.0574, lng: 78.9382, state: "Madhya Pradesh", country: "India" },
  "Davangere": { lat: 14.4644, lng: 75.9218, state: "Karnataka", country: "India" },
  "Dibrugarh": { lat: 27.4728, lng: 94.912, state: "Assam", country: "India" },
  "Durg": { lat: 21.1904, lng: 81.2849, state: "Chhattisgarh", country: "India" },
  "East Godavari": { lat: 16.9891, lng: 82.2475, state: "Andhra Pradesh", country: "India" },
  "East Singhbhum": { lat: 22.8046, lng: 86.2029, state: "Jharkhand", country: "India" },
  "Faridabad": { lat: 28.4089, lng: 77.3178, state: "Haryana", country: "India" },
  "Gandhi Nagar": { lat: 23.2156, lng: 72.6369, state: "Gujarat", country: "India" },
  "Gautam Buddha Nagar": { lat: 28.5355, lng: 77.391, state: "Uttar Pradesh", country: "India" },
  "Hanumangarh": { lat: 29.5815, lng: 74.3197, state: "Rajasthan", country: "India" },
  "Hisar": { lat: 29.1492, lng: 75.7217, state: "Haryana", country: "India" },
  "Imphal West": { lat: 24.817, lng: 93.9368, state: "Manipur", country: "India" },
  "Indore": { lat: 22.7196, lng: 75.8577, state: "Madhya Pradesh", country: "India" },
  "Jaipur": { lat: 26.9124, lng: 75.7873, state: "Rajasthan", country: "India" },
  "Jalandhar": { lat: 31.326, lng: 75.5762, state: "Punjab", country: "India" },
  "Jalgaon": { lat: 21.0077, lng: 75.5626, state: "Maharashtra", country: "India" },
  "Jalna": { lat: 19.841, lng: 75.8864, state: "Maharashtra", country: "India" },
  "Kamrup": { lat: 26.1833, lng: 91.6833, state: "Assam", country: "India" },
  "Kanpur Nagar": { lat: 26.4499, lng: 80.3319, state: "Uttar Pradesh", country: "India" },
  "Karim Nagar": { lat: 18.4386, lng: 79.1288, state: "Telangana", country: "India" },
  "Karnal": { lat: 29.6857, lng: 76.9905, state: "Haryana", country: "India" },
  "Kenya": { lat: -1.2921, lng: 36.8219, state: "Nairobi", country: "Kenya" },
  "Khagaria": { lat: 25.5028, lng: 86.4828, state: "Bihar", country: "India" },
  "Koppal": { lat: 15.3506, lng: 76.1549, state: "Karnataka", country: "India" },
  "Kurukshetra": { lat: 29.9695, lng: 76.8783, state: "Haryana", country: "India" },
  "Lakhisarai": { lat: 25.1742, lng: 86.0945, state: "Bihar", country: "India" },
  "Ludhiana": { lat: 30.901, lng: 75.8573, state: "Punjab", country: "India" },
  "Mahabub Nagar": { lat: 16.7488, lng: 78.0035, state: "Telangana", country: "India" },
  "Mahe": { lat: 11.7002, lng: 75.5347, state: "Pondicherry", country: "India" },
  "Malappuram": { lat: 11.0732, lng: 76.074, state: "Kerala", country: "India" },
  "Mathura": { lat: 27.4924, lng: 77.6737, state: "Uttar Pradesh", country: "India" },
  "Medak": { lat: 18.0461, lng: 78.2638, state: "Telangana", country: "India" },
  "Meerut": { lat: 28.9845, lng: 77.7064, state: "Uttar Pradesh", country: "India" },
  "Mudhalipatti": { lat: 11.15, lng: 78.2, state: "Tamil Nadu", country: "India" },
  "Nagpur": { lat: 21.1458, lng: 79.0882, state: "Maharashtra", country: "India" },
  "Nalgonda": { lat: 17.0577, lng: 79.2683, state: "Telangana", country: "India" },
  "Nanded": { lat: 19.1383, lng: 77.321, state: "Maharashtra", country: "India" },
  "Nashik": { lat: 19.9975, lng: 73.7898, state: "Maharashtra", country: "India" },
  "Neemuch": { lat: 24.4735, lng: 74.872, state: "Madhya Pradesh", country: "India" },
  "Nizamabad": { lat: 18.6725, lng: 78.0941, state: "Telangana", country: "India" },
  "North Goa": { lat: 15.553, lng: 73.8744, state: "Goa", country: "India" },
  "Parbhani": { lat: 19.2608, lng: 76.7748, state: "Maharashtra", country: "India" },
  "Patna": { lat: 25.5941, lng: 85.1376, state: "Bihar", country: "India" },
  "Puri": { lat: 19.8135, lng: 85.8312, state: "Odisha", country: "India" },
  "Rajkot": { lat: 22.3039, lng: 70.8022, state: "Gujarat", country: "India" },
  "Sabarkantha": { lat: 23.63, lng: 72.96, state: "Gujarat", country: "India" },
  "Sangli": { lat: 16.8524, lng: 74.5815, state: "Maharashtra", country: "India" },
  "Sangrur": { lat: 30.2458, lng: 75.842, state: "Punjab", country: "India" },
  "Satara": { lat: 17.6805, lng: 74.0183, state: "Maharashtra", country: "India" },
  "Satna": { lat: 24.6005, lng: 80.8322, state: "Madhya Pradesh", country: "India" },
  "Shimoga": { lat: 13.9299, lng: 75.5681, state: "Karnataka", country: "India" },
  "Sonipat": { lat: 28.9931, lng: 77.0151, state: "Haryana", country: "India" },
  "South 24 Parganas": { lat: 22.1352, lng: 88.4016, state: "West Bengal", country: "India" },
  "South Delhi": { lat: 28.4817, lng: 77.1873, state: "Delhi", country: "India" },
  "South Tripura": { lat: 23.2323, lng: 91.4726, state: "Tripura", country: "India" },
  "Srikakulam": { lat: 18.2949, lng: 83.8938, state: "Andhra Pradesh", country: "India" },
  "Srinagar": { lat: 34.0837, lng: 74.7973, state: "Jammu & Kashmir", country: "India" },
  "Tirupathi": { lat: 13.6288, lng: 79.4192, state: "Andhra Pradesh", country: "India" },
  "Tiruppuvanam": { lat: 9.845, lng: 78.267, state: "Tamil Nadu", country: "India" },
  "Valsad": { lat: 20.5992, lng: 72.9342, state: "Gujarat", country: "India" },
  "Varanasi": { lat: 25.3176, lng: 82.9739, state: "Uttar Pradesh", country: "India" },
  "West Godavari": { lat: 16.7107, lng: 81.0952, state: "Andhra Pradesh", country: "India" },
  "West Midnapore": { lat: 22.4257, lng: 87.3199, state: "West Bengal", country: "India" },
  "West Siang": { lat: 28.218, lng: 94.7278, state: "Arunachal Pradesh", country: "India" },
  "Yadgir": { lat: 16.77, lng: 77.13, state: "Karnataka", country: "India" },
  "Yamuna Nagar": { lat: 30.129, lng: 77.2674, state: "Haryana", country: "India" },
  "Yavatmal": { lat: 20.3888, lng: 78.1204, state: "Maharashtra", country: "India" },
};

export interface EmployeeDistrictRecord {
  district: string;
  admin: number;
  doctors: number;
  aop: number;
  support: number;
}

export const EMPLOYEE_DISTRICT_RECORDS: EmployeeDistrictRecord[] = [
  { district: "Ahmedabad", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Alappuzha", admin: 0, doctors: 2, aop: 0, support: 0 },
  { district: "Amravati", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Ananthapur", admin: 0, doctors: 2, aop: 4, support: 0 },
  { district: "Ariyalur", admin: 3, doctors: 0, aop: 7, support: 0 },
  { district: "Bangalore", admin: 0, doctors: 9, aop: 0, support: 0 },
  { district: "Belgaum", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Bidar", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Bongaigaon", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Chengalpattu", admin: 0, doctors: 0, aop: 1, support: 0 },
  { district: "Chennai", admin: 13, doctors: 25, aop: 2, support: 0 },
  { district: "Chittoor", admin: 65, doctors: 15, aop: 80, support: 14 },
  { district: "Coimbatore", admin: 95, doctors: 55, aop: 66, support: 54 },
  { district: "Cuddalore", admin: 21, doctors: 11, aop: 125, support: 38 },
  { district: "Cuddapah", admin: 0, doctors: 2, aop: 5, support: 0 },
  { district: "Cuttack", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Dakshina Kannada", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Dharmapuri", admin: 0, doctors: 2, aop: 11, support: 0 },
  { district: "Dharwad", admin: 0, doctors: 2, aop: 0, support: 0 },
  { district: "Dindigul", admin: 19, doctors: 2, aop: 211, support: 5 },
  { district: "Ernakulam", admin: 0, doctors: 8, aop: 0, support: 0 },
  { district: "Erode", admin: 3, doctors: 6, aop: 19, support: 0 },
  { district: "Ganjam", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Ghaziabad", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Golaghat", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Gulbarga", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Guntur", admin: 0, doctors: 4, aop: 0, support: 0 },
  { district: "Gwalior", admin: 0, doctors: 2, aop: 0, support: 0 },
  { district: "Hailakandi", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Hyderabad", admin: 0, doctors: 6, aop: 0, support: 0 },
  { district: "Idukki", admin: 0, doctors: 0, aop: 2, support: 0 },
  { district: "Jodhpur", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "K.V.Rangareddy", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Kallakurichi", admin: 0, doctors: 0, aop: 1, support: 0 },
  { district: "Kanchipuram", admin: 15, doctors: 17, aop: 31, support: 7 },
  { district: "Kannur", admin: 0, doctors: 3, aop: 0, support: 0 },
  { district: "Kanyakumari", admin: 2, doctors: 3, aop: 13, support: 1 },
  { district: "Karaikal", admin: 1, doctors: 0, aop: 3, support: 1 },
  { district: "Karur", admin: 0, doctors: 3, aop: 11, support: 0 },
  { district: "Kasargod", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Khorda", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Kolhapur", admin: 0, doctors: 2, aop: 0, support: 0 },
  { district: "Kolkata", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Kollam", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Kottayam", admin: 0, doctors: 4, aop: 0, support: 0 },
  { district: "Kozhikode", admin: 0, doctors: 5, aop: 0, support: 0 },
  { district: "Krishna", admin: 0, doctors: 3, aop: 0, support: 0 },
  { district: "Krishnagiri", admin: 1, doctors: 2, aop: 16, support: 1 },
  { district: "Kurnool", admin: 0, doctors: 1, aop: 1, support: 0 },
  { district: "Latur", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Lucknow", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Madurai", admin: 292, doctors: 76, aop: 298, support: 79 },
  { district: "Mumbai", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Nagapattinam", admin: 2, doctors: 1, aop: 43, support: 1 },
  { district: "Namakkal", admin: 3, doctors: 4, aop: 21, support: 1 },
  { district: "Nellore", admin: 0, doctors: 9, aop: 0, support: 0 },
  { district: "Nilgiris", admin: 4, doctors: 0, aop: 9, support: 0 },
  { district: "North 24 Parganas", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Palakkad", admin: 2, doctors: 1, aop: 0, support: 1 },
  { district: "Pathanamthitta", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Perambalur", admin: 0, doctors: 1, aop: 5, support: 0 },
  { district: "Pondicherry", admin: 60, doctors: 24, aop: 18, support: 17 },
  { district: "Prakasam", admin: 0, doctors: 0, aop: 1, support: 0 },
  { district: "Pudukkottai", admin: 3, doctors: 0, aop: 43, support: 0 },
  { district: "Pune", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Raichur", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Rajsamand", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Ramanathapuram", admin: 5, doctors: 0, aop: 56, support: 2 },
  { district: "Ranchi", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Salem", admin: 22, doctors: 17, aop: 56, support: 4 },
  { district: "Sambalpur", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Sivaganga", admin: 10, doctors: 1, aop: 123, support: 1 },
  { district: "Solapur", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "South West Delhi", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Surat", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Tenkasi", admin: 0, doctors: 0, aop: 3, support: 0 },
  { district: "Thane", admin: 0, doctors: 2, aop: 0, support: 0 },
  { district: "Thanjavur", admin: 17, doctors: 3, aop: 33, support: 6 },
  { district: "Theni", admin: 21, doctors: 4, aop: 120, support: 7 },
  { district: "Thiruvananthapuram", admin: 0, doctors: 2, aop: 0, support: 0 },
  { district: "Thrissur", admin: 0, doctors: 7, aop: 0, support: 0 },
  { district: "Tinsukia", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Tiruchirappalli", admin: 5, doctors: 4, aop: 36, support: 4 },
  { district: "Tirunelveli", admin: 69, doctors: 22, aop: 397, support: 19 },
  { district: "Tirupur", admin: 1, doctors: 0, aop: 0, support: 0 },
  { district: "Tiruvallur", admin: 37, doctors: 17, aop: 27, support: 14 },
  { district: "Tiruvannamalai", admin: 3, doctors: 2, aop: 70, support: 3 },
  { district: "Tiruvarur", admin: 2, doctors: 1, aop: 19, support: 1 },
  { district: "Tumkur", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "Tuticorin", admin: 19, doctors: 6, aop: 114, support: 4 },
  { district: "Udupi", admin: 1, doctors: 1, aop: 0, support: 0 },
  { district: "Vellore", admin: 5, doctors: 3, aop: 48, support: 2 },
  { district: "Villupuram", admin: 10, doctors: 2, aop: 123, support: 1 },
  { district: "Virudhunagar", admin: 11, doctors: 0, aop: 141, support: 1 },
  { district: "Visakhapatnam", admin: 1, doctors: 3, aop: 0, support: 0 },
  { district: "Wayanad", admin: 0, doctors: 1, aop: 0, support: 0 },
  { district: "West Tripura", admin: 0, doctors: 2, aop: 0, support: 0 },
];

export interface TraineeDistrictRecord {
  district: string;
  admin: number;
  doctors: number;
  post_graduates: number;
  aop: number;
  support: number;
}

export const TRAINEE_DISTRICT_RECORDS: TraineeDistrictRecord[] = [
  { district: "Agra", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Ahmed Nagar", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "Ahmedabad", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Akola", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Alappuzha", admin: 0, doctors: 7, post_graduates: 3, aop: 0, support: 0 },
  { district: "Alirajpur", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Ambala", admin: 0, doctors: 2, post_graduates: 1, aop: 0, support: 0 },
  { district: "Amravati", admin: 0, doctors: 1, post_graduates: 2, aop: 0, support: 0 },
  { district: "Ananthapur", admin: 0, doctors: 0, post_graduates: 2, aop: 5, support: 0 },
  { district: "Ariyalur", admin: 0, doctors: 0, post_graduates: 0, aop: 17, support: 0 },
  { district: "Aurangabad", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Balaghat", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Bangalore", admin: 0, doctors: 8, post_graduates: 0, aop: 0, support: 0 },
  { district: "Bardhaman", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "Bellary", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Bhopal", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Bhutan", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Budgam", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Buxar", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "Cachar", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "Central Delhi", admin: 0, doctors: 1, post_graduates: 1, aop: 0, support: 0 },
  { district: "Chennai", admin: 0, doctors: 12, post_graduates: 8, aop: 6, support: 0 },
  { district: "Chhindwara", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Chittoor", admin: 2, doctors: 10, post_graduates: 2, aop: 135, support: 0 },
  { district: "Coimbatore", admin: 5, doctors: 13, post_graduates: 5, aop: 25, support: 10 },
  { district: "Cuddalore", admin: 2, doctors: 3, post_graduates: 1, aop: 123, support: 0 },
  { district: "Cuddapah", admin: 0, doctors: 2, post_graduates: 2, aop: 16, support: 0 },
  { district: "Dakshina Kannada", admin: 0, doctors: 1, post_graduates: 1, aop: 0, support: 0 },
  { district: "Davangere", admin: 0, doctors: 3, post_graduates: 0, aop: 0, support: 0 },
  { district: "Dharmapuri", admin: 1, doctors: 1, post_graduates: 1, aop: 16, support: 1 },
  { district: "Dharwad", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Dibrugarh", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Dindigul", admin: 2, doctors: 1, post_graduates: 0, aop: 174, support: 0 },
  { district: "Durg", admin: 0, doctors: 0, post_graduates: 2, aop: 0, support: 0 },
  { district: "East Godavari", admin: 0, doctors: 2, post_graduates: 0, aop: 0, support: 0 },
  { district: "East Singhbhum", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "Ernakulam", admin: 0, doctors: 10, post_graduates: 4, aop: 0, support: 0 },
  { district: "Erode", admin: 0, doctors: 4, post_graduates: 4, aop: 14, support: 0 },
  { district: "Faridabad", admin: 0, doctors: 1, post_graduates: 2, aop: 0, support: 0 },
  { district: "Gandhi Nagar", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "Gautam Buddha Nagar", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Ghaziabad", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "Gulbarga", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Guntur", admin: 0, doctors: 7, post_graduates: 0, aop: 2, support: 0 },
  { district: "Gwalior", admin: 1, doctors: 0, post_graduates: 2, aop: 0, support: 0 },
  { district: "Hanumangarh", admin: 0, doctors: 0, post_graduates: 2, aop: 0, support: 0 },
  { district: "Hisar", admin: 0, doctors: 1, post_graduates: 1, aop: 0, support: 0 },
  { district: "Hyderabad", admin: 0, doctors: 9, post_graduates: 3, aop: 0, support: 0 },
  { district: "Idukki", admin: 0, doctors: 2, post_graduates: 1, aop: 1, support: 0 },
  { district: "Imphal West", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Indore", admin: 0, doctors: 2, post_graduates: 0, aop: 0, support: 0 },
  { district: "Jaipur", admin: 0, doctors: 2, post_graduates: 2, aop: 0, support: 0 },
  { district: "Jalandhar", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "Jalgaon", admin: 0, doctors: 2, post_graduates: 0, aop: 0, support: 0 },
  { district: "Jalna", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "K.V.Rangareddy", admin: 0, doctors: 2, post_graduates: 0, aop: 0, support: 0 },
  { district: "Kallakurichi", admin: 0, doctors: 0, post_graduates: 0, aop: 1, support: 0 },
  { district: "Kallakurichi", admin: 0, doctors: 0, post_graduates: 0, aop: 1, support: 0 },
  { district: "Kamrup", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Kanchipuram", admin: 5, doctors: 5, post_graduates: 6, aop: 17, support: 0 },
  { district: "Kannur", admin: 0, doctors: 5, post_graduates: 0, aop: 0, support: 0 },
  { district: "Kanpur Nagar", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Kanyakumari", admin: 2, doctors: 3, post_graduates: 1, aop: 24, support: 0 },
  { district: "Karaikal", admin: 0, doctors: 0, post_graduates: 0, aop: 3, support: 0 },
  { district: "Karim Nagar", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "Karnal", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Karur", admin: 0, doctors: 2, post_graduates: 0, aop: 12, support: 0 },
  { district: "Kasargod", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "Kenya", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Khagaria", admin: 0, doctors: 1, post_graduates: 1, aop: 0, support: 0 },
  { district: "Kolhapur", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "Kollam", admin: 0, doctors: 7, post_graduates: 5, aop: 0, support: 0 },
  { district: "Koppal", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "Kottayam", admin: 0, doctors: 4, post_graduates: 4, aop: 0, support: 0 },
  { district: "Kozhikode", admin: 0, doctors: 9, post_graduates: 1, aop: 0, support: 0 },
  { district: "Krishna", admin: 0, doctors: 2, post_graduates: 0, aop: 1, support: 0 },
  { district: "Krishnagiri", admin: 0, doctors: 1, post_graduates: 1, aop: 29, support: 0 },
  { district: "Kurnool", admin: 0, doctors: 3, post_graduates: 1, aop: 0, support: 0 },
  { district: "Kurukshetra", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "Lakhisarai", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "Latur", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Lucknow", admin: 0, doctors: 3, post_graduates: 1, aop: 0, support: 0 },
  { district: "Ludhiana", admin: 0, doctors: 1, post_graduates: 1, aop: 0, support: 0 },
  { district: "Madurai", admin: 22, doctors: 16, post_graduates: 10, aop: 130, support: 1 },
  { district: "Mahabub Nagar", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Mahe", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "Malappuram", admin: 0, doctors: 7, post_graduates: 0, aop: 0, support: 0 },
  { district: "Mathura", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Medak", admin: 0, doctors: 1, post_graduates: 1, aop: 0, support: 0 },
  { district: "Meerut", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Mumbai", admin: 0, doctors: 8, post_graduates: 9, aop: 0, support: 0 },
  { district: "Nagapattinam", admin: 1, doctors: 0, post_graduates: 1, aop: 46, support: 0 },
  { district: "Nagpur", admin: 0, doctors: 4, post_graduates: 4, aop: 0, support: 0 },
  { district: "Nalgonda", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Namakkal", admin: 0, doctors: 2, post_graduates: 5, aop: 15, support: 0 },
  { district: "Nanded", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Nashik", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "Neemuch", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Nellore", admin: 0, doctors: 3, post_graduates: 0, aop: 6, support: 0 },
  { district: "Nilgiris", admin: 1, doctors: 0, post_graduates: 0, aop: 8, support: 0 },
  { district: "Nizamabad", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "North Goa", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "Palakkad", admin: 0, doctors: 3, post_graduates: 1, aop: 1, support: 0 },
  { district: "Parbhani", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Pathanamthitta", admin: 0, doctors: 3, post_graduates: 3, aop: 0, support: 0 },
  { district: "Patna", admin: 0, doctors: 1, post_graduates: 1, aop: 0, support: 0 },
  { district: "Perambalur", admin: 0, doctors: 0, post_graduates: 0, aop: 5, support: 0 },
  { district: "Pondicherry", admin: 11, doctors: 10, post_graduates: 0, aop: 4, support: 0 },
  { district: "Prakasam", admin: 0, doctors: 4, post_graduates: 1, aop: 2, support: 0 },
  { district: "Pudukkottai", admin: 1, doctors: 0, post_graduates: 2, aop: 63, support: 0 },
  { district: "Pune", admin: 0, doctors: 5, post_graduates: 11, aop: 0, support: 0 },
  { district: "Puri", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Rajkot", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Ramanathapuram", admin: 2, doctors: 1, post_graduates: 0, aop: 50, support: 5 },
  { district: "Ranchi", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Sabarkantha", admin: 0, doctors: 2, post_graduates: 0, aop: 0, support: 0 },
  { district: "Salem", admin: 19, doctors: 8, post_graduates: 4, aop: 43, support: 0 },
  { district: "Sangli", admin: 0, doctors: 2, post_graduates: 0, aop: 0, support: 0 },
  { district: "Sangrur", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Satara", admin: 0, doctors: 1, post_graduates: 1, aop: 0, support: 0 },
  { district: "Satna", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "Shimoga", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "Sivaganga", admin: 3, doctors: 0, post_graduates: 2, aop: 78, support: 0 },
  { district: "Sonipat", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "South 24 Parganas", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "South Delhi", admin: 0, doctors: 2, post_graduates: 0, aop: 0, support: 0 },
  { district: "South Tripura", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "South West Delhi", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Srikakulam", admin: 0, doctors: 2, post_graduates: 0, aop: 0, support: 0 },
  { district: "Srinagar", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Surat", admin: 0, doctors: 5, post_graduates: 1, aop: 0, support: 0 },
  { district: "Tenkasi", admin: 0, doctors: 0, post_graduates: 0, aop: 1, support: 0 },
  { district: "Thane", admin: 0, doctors: 2, post_graduates: 3, aop: 0, support: 0 },
  { district: "Thanjavur", admin: 5, doctors: 6, post_graduates: 2, aop: 37, support: 0 },
  { district: "Theni", admin: 0, doctors: 1, post_graduates: 2, aop: 101, support: 0 },
  { district: "Thiruvananthapuram", admin: 0, doctors: 12, post_graduates: 11, aop: 0, support: 0 },
  { district: "Thrissur", admin: 0, doctors: 6, post_graduates: 3, aop: 0, support: 0 },
  { district: "Tiruchirappalli", admin: 1, doctors: 11, post_graduates: 3, aop: 60, support: 2 },
  { district: "Tirunelveli", admin: 2, doctors: 7, post_graduates: 3, aop: 224, support: 4 },
  { district: "Tirupathi", admin: 0, doctors: 0, post_graduates: 0, aop: 2, support: 0 },
  { district: "Tiruvallur", admin: 6, doctors: 10, post_graduates: 0, aop: 45, support: 1 },
  { district: "Tiruvannamalai", admin: 1, doctors: 1, post_graduates: 0, aop: 81, support: 0 },
  { district: "Tiruvarur", admin: 1, doctors: 0, post_graduates: 0, aop: 17, support: 0 },
  { district: "Tuticorin", admin: 1, doctors: 0, post_graduates: 0, aop: 85, support: 2 },
  { district: "Udupi", admin: 1, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Valsad", admin: 0, doctors: 1, post_graduates: 2, aop: 0, support: 0 },
  { district: "Varanasi", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "Vellore", admin: 0, doctors: 1, post_graduates: 1, aop: 88, support: 1 },
  { district: "Villupuram", admin: 2, doctors: 1, post_graduates: 1, aop: 94, support: 0 },
  { district: "Virudhunagar", admin: 2, doctors: 1, post_graduates: 0, aop: 101, support: 0 },
  { district: "Visakhapatnam", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "Wayanad", admin: 0, doctors: 2, post_graduates: 0, aop: 0, support: 0 },
  { district: "West Godavari", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "West Midnapore", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { district: "West Siang", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "Yadgir", admin: 0, doctors: 3, post_graduates: 0, aop: 0, support: 0 },
  { district: "Yamuna Nagar", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { district: "Yavatmal", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
];


export interface StateStaffData {
  state: string;
  lat: number;
  lng: number;
  country: string;
  admin: number;
  doctors: number;
  post_graduates: number;
  aop: number;
  support: number;
}

export const TRAINEE_STATE_RECORDS: StateStaffData[] = [
  { state: "Tamil Nadu", lat: 11.1271, lng: 78.6569, country: "India", admin: 87, doctors: 101, post_graduates: 70, aop: 1751, support: 27 },
  { state: "Andhra Pradesh", lat: 15.4129, lng: 79.2400, country: "India", admin: 2, doctors: 40, post_graduates: 16, aop: 249, support: 0 },
  { state: "Pondicherry", lat: 11.9416, lng: 79.8083, country: "India", admin: 11, doctors: 10, post_graduates: 1, aop: 8, support: 0 },
  { state: "Kerala", lat: 10.4505, lng: 76.2711, country: "India", admin: 0, doctors: 62, post_graduates: 51, aop: 2, support: 0 },
  { state: "Maharashtra", lat: 19.5515, lng: 75.7139, country: "India", admin: 0, doctors: 28, post_graduates: 35, aop: 0, support: 0 },
  { state: "Karnataka", lat: 14.3173, lng: 75.7139, country: "India", admin: 1, doctors: 18, post_graduates: 3, aop: 0, support: 0 },
  { state: "Telangana", lat: 17.8124, lng: 79.0193, country: "India", admin: 0, doctors: 11, post_graduates: 9, aop: 0, support: 0 },
  { state: "Gujarat", lat: 22.2587, lng: 71.1924, country: "India", admin: 0, doctors: 8, post_graduates: 5, aop: 0, support: 0 },
  { state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, country: "India", admin: 0, doctors: 7, post_graduates: 3, aop: 0, support: 0 },
  { state: "Madhya Pradesh", lat: 22.9734, lng: 78.6569, country: "India", admin: 1, doctors: 6, post_graduates: 3, aop: 0, support: 0 },
  { state: "Haryana", lat: 29.0588, lng: 76.0856, country: "India", admin: 0, doctors: 5, post_graduates: 6, aop: 0, support: 0 },
  { state: "Delhi", lat: 28.7041, lng: 77.1025, country: "India", admin: 0, doctors: 4, post_graduates: 1, aop: 0, support: 0 },
  { state: "Bihar", lat: 25.0961, lng: 85.3131, country: "India", admin: 0, doctors: 2, post_graduates: 4, aop: 0, support: 0 },
  { state: "Rajasthan", lat: 27.0238, lng: 74.2179, country: "India", admin: 0, doctors: 2, post_graduates: 4, aop: 0, support: 0 },
  { state: "Assam", lat: 26.2006, lng: 92.9376, country: "India", admin: 0, doctors: 2, post_graduates: 1, aop: 0, support: 0 },
  { state: "Jammu & Kashmir", lat: 33.7782, lng: 74.7973, country: "India", admin: 0, doctors: 2, post_graduates: 0, aop: 0, support: 0 },
  { state: "Punjab", lat: 31.1471, lng: 75.3412, country: "India", admin: 0, doctors: 2, post_graduates: 2, aop: 0, support: 0 },
  { state: "West Bengal", lat: 23.5868, lng: 87.8550, country: "India", admin: 0, doctors: 1, post_graduates: 2, aop: 0, support: 0 },
  { state: "Chhattisgarh", lat: 21.2787, lng: 81.8661, country: "India", admin: 0, doctors: 0, post_graduates: 2, aop: 0, support: 0 },
  { state: "Arunachal Pradesh", lat: 28.2180, lng: 94.7278, country: "India", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { state: "Goa", lat: 15.2993, lng: 74.1240, country: "India", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { state: "Jharkhand", lat: 23.6102, lng: 85.3096, country: "India", admin: 0, doctors: 1, post_graduates: 1, aop: 0, support: 0 },
  { state: "Manipur", lat: 24.6637, lng: 93.9063, country: "India", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { state: "Odisha", lat: 20.3517, lng: 84.8035, country: "India", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { state: "Tripura", lat: 23.9408, lng: 91.9882, country: "India", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { state: "Bhutan", lat: 27.5142, lng: 90.4336, country: "Bhutan", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { state: "Kenya", lat: -1.2921, lng: 36.8219, country: "Kenya", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
];

export interface StaffDotItem extends GeoLocationItem {
  staffGroup: StaffGroup;
  category: StaffCategory;
  districtName: string;
}

export function generateStaffDots(
  group: StaffGroup = "employees",
  activeCategory: StaffCategory | "all" = "all"
): StaffDotItem[] {
  const categories = group === "employees" ? EMPLOYEE_CATEGORIES : TRAINEE_CATEGORIES;
  const targetCategories =
    activeCategory === "all"
      ? (Object.keys(categories) as StaffCategory[])
      : [activeCategory];

  const results: StaffDotItem[] = [];
  const records = group === "employees" ? EMPLOYEE_DISTRICT_RECORDS : TRAINEE_DISTRICT_RECORDS;
  const goldenAngle = 2.39996323;

  targetCategories.forEach((catKey, catIdx) => {
    const catMeta = categories[catKey];
    if (!catMeta) return;

    records.forEach((rec) => {
      const count = rec[catKey as keyof (EmployeeDistrictRecord | TraineeDistrictRecord)] as number;
      if (!count || count <= 0) return;

      const distCoords = DISTRICT_COORDINATES[rec.district];
      if (!distCoords) return;

      const maxRadius = Math.min(0.06, 0.0035 * Math.sqrt(count));
      const catAngleShift = catIdx * (Math.PI / 2);

      for (let i = 0; i < count; i++) {
        let latOffset = 0;
        let lngOffset = 0;

        if (count > 1) {
          const angle = i * goldenAngle + catAngleShift;
          const r = (Math.sqrt(i + 0.5) / Math.sqrt(count)) * maxRadius + 0.002;
          latOffset = r * Math.sin(angle);
          lngOffset = r * Math.cos(angle) * 1.25;
        }

        results.push({
          id: `staff-${group}-${catKey}-${rec.district.replace(/\s+/g, "_")}-${i}`,
          name: `${count} ${rec.district}`,
          rawName: rec.district,
          entityId: "staffs",
          subcategoryId: group,
          country: distCoords.country,
          state: distCoords.state,
          city: rec.district,
          latitude: distCoords.lat + latOffset,
          longitude: distCoords.lng + lngOffset,
          type: "Staff Dot",
          careType: "community",
          sourceStatus: "source-supplied",
          staffGroup: group,
          category: catKey,
          districtName: rec.district,
          metrics: {
            "Staff Count": count,
            "Category": catMeta.name,
            "District": rec.district,
          },
          metadata: {
            color: catMeta.color,
            staffGroup: group,
            category: catKey,
            categoryName: catMeta.name,
            districtName: rec.district,
            districtCount: count,
            country: distCoords.country,
            state: distCoords.state,
          },
        });
      }
    });
  });

  return results;
}

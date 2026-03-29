export interface Phone {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  chip: string;
  ram: number;
  storage: number;
  battery: number;
  camera: number;
  screen: number;
  os: string;
  year: number;
  scores: {
    performance: number;
    camera: number;
    battery: number;
    value: number;
  };
  priceHistory: { date: string; price: number }[];
  tag?: string;
}

export const phones: Phone[] = [
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    price: 129990,
    image: "📱",
    chip: "Apple A18 Pro",
    ram: 8,
    storage: 256,
    battery: 4685,
    camera: 48,
    screen: 6.9,
    os: "iOS 18",
    year: 2024,
    tag: "Топ",
    scores: { performance: 98, camera: 97, battery: 88, value: 72 },
    priceHistory: [
      { date: "2024-09", price: 139990 },
      { date: "2024-11", price: 134990 },
      { date: "2025-01", price: 129990 },
      { date: "2025-03", price: 129990 },
    ],
  },
  {
    id: 2,
    name: "Samsung Galaxy S25 Ultra",
    brand: "Samsung",
    price: 119990,
    image: "📱",
    chip: "Snapdragon 8 Elite",
    ram: 12,
    storage: 256,
    battery: 5000,
    camera: 200,
    screen: 6.9,
    os: "Android 15",
    year: 2025,
    tag: "Новинка",
    scores: { performance: 97, camera: 99, battery: 90, value: 75 },
    priceHistory: [
      { date: "2025-01", price: 129990 },
      { date: "2025-02", price: 124990 },
      { date: "2025-03", price: 119990 },
    ],
  },
  {
    id: 3,
    name: "Google Pixel 9 Pro",
    brand: "Google",
    price: 89990,
    image: "📱",
    chip: "Google Tensor G4",
    ram: 16,
    storage: 128,
    battery: 4700,
    camera: 50,
    screen: 6.3,
    os: "Android 15",
    year: 2024,
    tag: "Лучшая камера",
    scores: { performance: 88, camera: 96, battery: 82, value: 80 },
    priceHistory: [
      { date: "2024-08", price: 99990 },
      { date: "2024-10", price: 94990 },
      { date: "2025-01", price: 89990 },
      { date: "2025-03", price: 89990 },
    ],
  },
  {
    id: 4,
    name: "Xiaomi 14 Ultra",
    brand: "Xiaomi",
    price: 84990,
    image: "📱",
    chip: "Snapdragon 8 Gen 3",
    ram: 16,
    storage: 512,
    battery: 5000,
    camera: 50,
    screen: 6.73,
    os: "Android 14",
    year: 2024,
    tag: "Выгодно",
    scores: { performance: 95, camera: 94, battery: 91, value: 90 },
    priceHistory: [
      { date: "2024-02", price: 99990 },
      { date: "2024-06", price: 92990 },
      { date: "2024-10", price: 87990 },
      { date: "2025-03", price: 84990 },
    ],
  },
  {
    id: 5,
    name: "OnePlus 13",
    brand: "OnePlus",
    price: 59990,
    image: "📱",
    chip: "Snapdragon 8 Elite",
    ram: 12,
    storage: 256,
    battery: 6000,
    camera: 50,
    screen: 6.82,
    os: "Android 15",
    year: 2025,
    scores: { performance: 96, camera: 85, battery: 98, value: 92 },
    priceHistory: [
      { date: "2025-01", price: 69990 },
      { date: "2025-02", price: 64990 },
      { date: "2025-03", price: 59990 },
    ],
  },
  {
    id: 6,
    name: "Samsung Galaxy A55",
    brand: "Samsung",
    price: 34990,
    image: "📱",
    chip: "Exynos 1480",
    ram: 8,
    storage: 128,
    battery: 5000,
    camera: 50,
    screen: 6.6,
    os: "Android 14",
    year: 2024,
    tag: "Бюджет",
    scores: { performance: 70, camera: 75, battery: 88, value: 95 },
    priceHistory: [
      { date: "2024-03", price: 44990 },
      { date: "2024-07", price: 39990 },
      { date: "2024-11", price: 36990 },
      { date: "2025-03", price: 34990 },
    ],
  },
  {
    id: 7,
    name: "Realme GT 6",
    brand: "Realme",
    price: 44990,
    image: "📱",
    chip: "Snapdragon 8s Gen 3",
    ram: 12,
    storage: 256,
    battery: 5500,
    camera: 50,
    screen: 6.78,
    os: "Android 14",
    year: 2024,
    scores: { performance: 88, camera: 78, battery: 92, value: 93 },
    priceHistory: [
      { date: "2024-06", price: 54990 },
      { date: "2024-10", price: 49990 },
      { date: "2025-03", price: 44990 },
    ],
  },
  {
    id: 8,
    name: "iPhone 15",
    brand: "Apple",
    price: 74990,
    image: "📱",
    chip: "Apple A16 Bionic",
    ram: 6,
    storage: 128,
    battery: 3877,
    camera: 48,
    screen: 6.1,
    os: "iOS 18",
    year: 2023,
    scores: { performance: 90, camera: 88, battery: 75, value: 77 },
    priceHistory: [
      { date: "2023-09", price: 99990 },
      { date: "2024-01", price: 89990 },
      { date: "2024-06", price: 79990 },
      { date: "2025-03", price: 74990 },
    ],
  },
];

export const brands = ["Все", ...Array.from(new Set(phones.map((p) => p.brand)))];

// Jira field definitions and options

export const PLATFORMS = [
  'PS4',
  'PS5',
  'XB1',
  'XSX',
  'XSS',
  'Switch',
  'PC',
  'Android',
  'iOS',
  'Mac'
];

export const HOW_FOUND_OPTIONS = [
  'Playtesting',
  'Automation',
  'Ad Hoc Testing',
  'Regression Testing',
  'Exploratory Testing',
  'User Report'
];

export const EXPERIENCES_IMPACTED = [
  'Battle Royale',
  'Sparks',
  'Juno',
  'Rocket Racing',
  'LEGO Fortnite',
  'Festival',
  'Creative',
  'Save the World',
  'Lobby/Frontend'
];

export const TEST_TEAMS = [
  'EPAM',
  'Lionbridge',
  'Epic Internal',
  'Community'
];

export const BUG_TAGS = [
  { value: 'NCL', label: '[NCL] Network Connection Lost' },
  { value: 'Crash', label: '[Crash] Application Crash' },
  { value: 'CDE', label: '[CDE] Content Download Error' },
  { value: 'MME', label: '[MME] Matchmaking Error' },
  { value: 'ELS', label: '[Eternal Loading Screen]' },
  { value: 'Hang', label: '[Hang] Application Hang' },
  { value: 'JSE', label: '[JSE] Join Session Error' },
  { value: 'Softlock', label: '[Softlock] Player Stuck' },
  { value: 'UI', label: '[UI] UI Issue' },
  { value: 'Audio', label: '[Audio] Audio Issue' },
  { value: 'Animation', label: '[Animation] Animation Issue' },
  { value: 'VFX', label: '[VFX] Visual Effects Issue' }
];

export const SEVERITY_LEVELS = {
  1: 'Game Breaker',
  2: 'Major Function',
  3: 'Minor Function',
  4: 'Superficial'
};

export const SEVERITY_DESCRIPTIONS = {
  1: 'Impide jugar completamente (crashes, UI locks, desconexiones repetitivas)',
  2: 'Gran impacto pero se puede jugar (armas que no funcionan, daño incorrecto)',
  3: 'Pequeño impacto, se puede evitar (UI overlap, placeholders)',
  4: 'Solo visual, no afecta gameplay (z-fighting, glitches cosméticos)'
};

export const COMPONENT_CATEGORIES = [
  // BR Categories
  'BR - Animation - Cosmetics',
  'BR - Animation - Character',
  'BR - Animation - Weapon',
  'BR - Animation - Vehicle',
  'BR - Art - Environment',
  'BR - Art - UI',
  'BR - Art - VFX',
  'BR - Art - Lighting',
  'BR - Gameplay - Movement',
  'BR - Gameplay - Combat',
  'BR - Gameplay - Interaction',
  'BR - Gameplay - Inventory',
  'BR - Gameplay - Building',
  'BR - Network',
  'BR - UI - HUD',
  'BR - UI - Menus',
  'BR - UI - Settings',
  'BR - Audio - SFX',
  'BR - Audio - Music',
  'BR - Audio - Voice',
  'BR - Performance',

  // Other modes
  'Juno - Gameplay',
  'Juno - UI',
  'Juno - Art',
  'Sparks - Gameplay',
  'Sparks - UI',
  'LEGO - Gameplay',
  'LEGO - Building',
  'Festival - Gameplay',
  'Festival - Audio',
  'Rocket Racing - Gameplay',
  'Rocket Racing - Vehicles',
  'Creative - Tools',
  'Creative - Islands',
  'Lobby - Frontend',
  'Lobby - Social'
];

export const DEVICE_SPECS_PRESETS = {
  // PlayStation
  'PS5': 'PlayStation 5 (AMD Zen 2 CPU 8-core @ 3.5GHz, AMD RDNA 2 GPU 10.28 TFLOPS, 16GB GDDR6, 825GB SSD)',
  'PS5 Digital': 'PlayStation 5 Digital Edition (AMD Zen 2 CPU 8-core @ 3.5GHz, AMD RDNA 2 GPU 10.28 TFLOPS, 16GB GDDR6, 825GB SSD)',
  'PS4 Pro': 'PlayStation 4 Pro (AMD Jaguar CPU 8-core @ 2.1GHz, AMD Radeon GPU 4.2 TFLOPS, 8GB GDDR5, 1TB HDD)',
  'PS4': 'PlayStation 4 (AMD Jaguar CPU 8-core @ 1.6GHz, AMD Radeon GPU 1.84 TFLOPS, 8GB GDDR5, 500GB HDD)',

  // Xbox
  'Xbox Series X': 'Xbox Series X (AMD Zen 2 CPU 8-core @ 3.8GHz, AMD RDNA 2 GPU 12 TFLOPS, 16GB GDDR6, 1TB NVMe SSD)',
  'Xbox Series S': 'Xbox Series S (AMD Zen 2 CPU 8-core @ 3.6GHz, AMD RDNA 2 GPU 4 TFLOPS, 10GB GDDR6, 512GB NVMe SSD)',
  'Xbox One X': 'Xbox One X (AMD Jaguar CPU 8-core @ 2.3GHz, AMD Radeon GPU 6 TFLOPS, 12GB GDDR5, 1TB HDD)',
  'Xbox One S': 'Xbox One S (AMD Jaguar CPU 8-core @ 1.75GHz, AMD Radeon GPU 1.4 TFLOPS, 8GB DDR3, 500GB HDD)',
  'Xbox One': 'Xbox One (AMD Jaguar CPU 8-core @ 1.75GHz, AMD Radeon GPU 1.31 TFLOPS, 8GB DDR3, 500GB HDD)',

  // Nintendo Switch
  'Switch OLED': 'Nintendo Switch OLED (NVIDIA Tegra X1+ CPU 4-core @ 1.02GHz, 4GB RAM, 64GB Storage, 7" OLED 1280x720)',
  'Switch': 'Nintendo Switch (NVIDIA Tegra X1 CPU 4-core @ 1.02GHz, 4GB RAM, 32GB Storage, 6.2" LCD 1280x720)',
  'Switch Lite': 'Nintendo Switch Lite (NVIDIA Tegra X1 CPU 4-core @ 1.02GHz, 4GB RAM, 32GB Storage, 5.5" LCD 1280x720)',

  // PC (custom specs from your team)
  'PC High': 'PC - High End (RTX 3080+, 32GB RAM)',
  'PC Mid': 'PC - Mid Range (GTX 1660, 16GB RAM)',
  'PC Low': 'PC - Low End (GTX 1050, 8GB RAM)',

  // Mobile - iOS
  'iPhone 15 Pro Max': 'iPhone 15 Pro Max (A17 Pro, 8GB RAM, iOS 17+)',
  'iPhone 15 Pro': 'iPhone 15 Pro (A17 Pro, 8GB RAM, iOS 17+)',
  'iPhone 15': 'iPhone 15 (A16 Bionic, 6GB RAM, iOS 17+)',
  'iPhone 14 Pro': 'iPhone 14 Pro (A16 Bionic, 6GB RAM, iOS 16+)',
  'iPhone 14': 'iPhone 14 (A15 Bionic, 6GB RAM, iOS 16+)',
  'iPhone 13 Pro': 'iPhone 13 Pro (A15 Bionic, 6GB RAM, iOS 15+)',
  'iPhone 13': 'iPhone 13 (A15 Bionic, 4GB RAM, iOS 15+)',
  'iPhone 12': 'iPhone 12 (A14 Bionic, 4GB RAM, iOS 14+)',
  'iPhone 11': 'iPhone 11 (A13 Bionic, 4GB RAM, iOS 13+)',
  'iPad Pro 12.9"': 'iPad Pro 12.9" (M2 Chip, 8GB RAM, iPadOS 16+)',
  'iPad Pro 11"': 'iPad Pro 11" (M2 Chip, 8GB RAM, iPadOS 16+)',
  'iPad Air': 'iPad Air 5th Gen (M1 Chip, 8GB RAM, iPadOS 15+)',

  // Mobile - Android
  'Samsung S24 Ultra': 'Samsung Galaxy S24 Ultra (Snapdragon 8 Gen 3, 12GB RAM, Android 14)',
  'Samsung S23 Ultra': 'Samsung Galaxy S23 Ultra (Snapdragon 8 Gen 2, 12GB RAM, Android 13)',
  'Samsung S23': 'Samsung Galaxy S23 (Snapdragon 8 Gen 2, 8GB RAM, Android 13)',
  'Google Pixel 8 Pro': 'Google Pixel 8 Pro (Tensor G3, 12GB RAM, Android 14)',
  'Google Pixel 8': 'Google Pixel 8 (Tensor G3, 8GB RAM, Android 14)',
  'OnePlus 11': 'OnePlus 11 (Snapdragon 8 Gen 2, 16GB RAM, Android 13)',

  'Custom': 'Custom Specs'
};

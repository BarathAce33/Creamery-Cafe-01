export const menuCategories = [
  { id: 'all', label: 'All Offerings', icon: 'Sparkles' },
  { id: 'milkshakes', label: 'Legendary Milkshakes', icon: 'Milk' },
  { id: 'burgers', label: 'Burgers & Sandwiches', icon: 'Sandwich' },
  { id: 'creams', label: 'Fresh Creams & Desserts', icon: 'IceCream' },
  { id: 'starters', label: 'Gourmet Starters & Momos', icon: 'UtensilsCrossed' },
  { id: 'beverages', label: 'Refreshers & Cold Brews', icon: 'Coffee' },
];

export const menuItems = [
  {
    id: 'shake-1',
    category: 'milkshakes',
    name: 'Gold Standard Lotus Biscoff Shake',
    tagline: 'Client Bestseller • Pure Indulgence',
    description: 'Belgian Lotus Biscoff speculoos crumble blended with artisanal vanilla bean ice cream, caramel drizzle, and gold shimmer flakes.',
    price: 220,
    isVeg: true,
    isBestseller: true,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
    customizations: [
      { name: 'Extra Biscoff Crumble', price: 30 },
      { name: 'Double Scoop Gelato', price: 40 },
      { name: 'Less Sugar / No Syrup', price: 0 }
    ]
  },
  {
    id: 'shake-2',
    category: 'milkshakes',
    name: 'Classic Chocolate Hazelnut Fudge',
    tagline: 'Rich Nutella & Roasted Hazelnut',
    description: 'Ultra-thick Nutella blend, dark chocolate ganache swirl, crushed roasted hazelnuts, topped with artisanal whipped cream.',
    price: 240,
    isVeg: true,
    isBestseller: true,
    rating: 4.95,
    reviewsCount: 198,
    image: '/chocolate_hazelnut_shake.png',
    customizations: [
      { name: 'Extra Nutella Drizzle', price: 35 },
      { name: 'Ferrero Rocher Topping', price: 45 }
    ]
  },
  {
    id: 'shake-3',
    category: 'milkshakes',
    name: 'Royal Sitaphal Cream Shake',
    tagline: 'Fresh Seasonal Custard Apple',
    description: 'Hand-picked custard apple pulp folded into fresh churned heavy cream and whole milk with a hint of cardamom.',
    price: 230,
    isVeg: true,
    isBestseller: true,
    rating: 4.88,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80',
    customizations: [
      { name: 'Extra Custard Apple Pulp', price: 40 }
    ]
  },
  {
    id: 'shake-4',
    category: 'milkshakes',
    name: 'Tender Coconut Gold Blast',
    tagline: 'Coimbatore Fresh Specialty',
    description: 'Pure tender coconut malai, fresh tender coconut water gelato, coconut chips, served chilled and super refreshing.',
    price: 190,
    isVeg: true,
    isBestseller: false,
    rating: 4.85,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=600&q=80',
    customizations: [
      { name: 'Extra Tender Malai Scoop', price: 30 }
    ]
  },
  {
    id: 'shake-5',
    category: 'milkshakes',
    name: 'Ferrero Rocher Deluxe Shake',
    tagline: 'Decadent Hazelnut Wafer Blast',
    description: 'Whole Ferrero Rocher pralines crushed into rich cocoa gelato, hazelnut syrup, crunchy wafer flakes.',
    price: 250,
    isVeg: true,
    isBestseller: true,
    rating: 4.97,
    reviewsCount: 230,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
    customizations: [
      { name: 'Extra Ferrero Rocher Piece', price: 50 }
    ]
  },
  {
    id: 'burger-1',
    category: 'burgers',
    name: 'Creamery Signature BBQ Chicken Burger',
    tagline: 'Smokey & Juiciest Patty',
    description: 'Char-broiled chicken patty soaked in house smoky BBQ sauce, caramelized onions, melted double cheddar in toasted brioche.',
    price: 230,
    isVeg: false,
    isBestseller: true,
    rating: 4.89,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    customizations: [
      { name: 'Extra Cheese Slice', price: 25 },
      { name: 'Add Fried Egg', price: 20 },
      { name: 'Make it a Combo (Fies + Drink)', price: 90 }
    ]
  },
  {
    id: 'burger-2',
    category: 'burgers',
    name: 'Double Cheese Crisp Veg Burger',
    tagline: 'Crispy Herb Potato & Corn',
    description: 'Crispy golden potato-herb patty topped with double cheddar cheese, lettuce, gherkins, and signature secret mayo.',
    price: 190,
    isVeg: true,
    isBestseller: false,
    rating: 4.78,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    customizations: [
      { name: 'Extra Cheese Slice', price: 25 },
      { name: 'Jalapeño Kick', price: 15 }
    ]
  },
  {
    id: 'burger-3',
    category: 'burgers',
    name: 'Paneer Tikka Fusion Sandwich',
    tagline: 'Charcoal Grilled Cottage Cheese',
    description: 'Fresh malai paneer cubes marinated in clay-oven spices, grilled with bell peppers and mint chutney in artisan sourdough.',
    price: 180,
    isVeg: true,
    isBestseller: true,
    rating: 4.82,
    reviewsCount: 104,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    customizations: [
      { name: 'Extra Paneer', price: 30 }
    ]
  },
  {
    id: 'cream-1',
    category: 'creams',
    name: 'Fresh Strawberry Cream Pot',
    tagline: 'Seasonal Mahabaleshwar Strawberries',
    description: 'Generous chunks of fresh sweet strawberries layered in rich churned sweet cream, topped with strawberry reduction.',
    price: 220,
    isVeg: true,
    isBestseller: true,
    rating: 4.93,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    customizations: [
      { name: 'Extra Berry Chunk Layer', price: 40 }
    ]
  },
  {
    id: 'cream-2',
    category: 'creams',
    name: 'Alphonso Mango & Berry Sundae',
    tagline: 'Tropical Fresh Cream Delight',
    description: 'Ratnagiri Alphonso mango cubes, fresh blueberries, double vanilla scoop, almond slivers and honey drizzle.',
    price: 240,
    isVeg: true,
    isBestseller: false,
    rating: 4.87,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
    customizations: [
      { name: 'Extra Almond Flakes', price: 20 }
    ]
  },
  {
    id: 'starter-1',
    category: 'starters',
    name: 'Steamed Paneer Momos (8 Pcs)',
    tagline: 'Soft Himalayan Dumplings',
    description: 'Thin-skinned dumplings stuffed with seasoned cottage cheese, herbs, served with fire-spiced red garlic Schezwan dip.',
    price: 160,
    isVeg: true,
    isBestseller: true,
    rating: 4.84,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=600&q=80',
    customizations: [
      { name: 'Fried / Pan-fried Style', price: 20 },
      { name: 'Extra Schezwan Sauce', price: 15 }
    ]
  },
  {
    id: 'starter-2',
    category: 'starters',
    name: 'Crispy Golden Chicken Fingers',
    tagline: 'Peelamedu Youth Favorite',
    description: 'Panko breadcrumb crusted juicy tender chicken strips served with honey mustard and garlic dip.',
    price: 210,
    isVeg: false,
    isBestseller: true,
    rating: 4.91,
    reviewsCount: 178,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
    customizations: [
      { name: 'Peri-Peri Seasoning Dust', price: 15 },
      { name: 'Extra Garlic Dip', price: 20 }
    ]
  },
  {
    id: 'beverage-1',
    category: 'beverages',
    name: 'Electric Virgin Mojito',
    tagline: 'Crisp Lime & Mint Zest',
    description: 'Muddled fresh Persian limes, crushed garden mint, blue curacao shimmer syrup, topped with effervescent soda.',
    price: 140,
    isVeg: true,
    isBestseller: false,
    rating: 4.79,
    reviewsCount: 92,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    customizations: [
      { name: 'Extra Lime Kick', price: 10 }
    ]
  }
];

export const cafeInfo = {
  name: "Creamery Café",
  subheading: "THE CLASSIC CAFÉ • THE GOLD STANDARD IN MILKSHAKES",
  address: "124, Ram Lakshman Nagar, Peelamedu, Coimbatore, Tamil Nadu 641004",
  mapCoordinates: { lat: 11.0264, lng: 77.0019 },
  phone: "+91 98422 98765",
  whatsappNumber: "919842298765",
  instagram: "@creamery_cbe",
  instagramUrl: "https://www.instagram.com/creamery_cbe",
  googleMapsUrl: "https://share.google/ws5fVnMo9QNMw0CHS",
  openingHours: "11:00 AM – 11:30 PM (Mon - Sun)",
  rating: "4.9",
  reviewsTotal: "1,250+"
};

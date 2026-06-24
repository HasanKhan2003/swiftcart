const createImage = (seed) =>
  `https://picsum.photos/seed/${encodeURIComponent(
    seed
  )}/640/640`;

const createProduct = ({
  id,
  title,
  price,
  category,
  description,
  seed,
}) => ({
  id,
  title,
  price,
  category,
  description,
  image: createImage(seed || title),
  quantity: 1,
});

export const fallbackProducts = [
  createProduct({
    id: 1,
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
    price: 64.0,
    category: "electronics",
    description:
      "Portable storage with a compact footprint and simple plug-and-play setup.",
    seed: "electronics-1",
  }),
  createProduct({
    id: 2,
    title: "Acer SB220Q bi 21.5 inches Full HD IPS Ultra-Thin",
    price: 599.0,
    category: "electronics",
    description:
      "A slim display built for clean visuals and everyday use.",
    seed: "electronics-2",
  }),
  createProduct({
    id: 3,
    title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 109.0,
    category: "electronics",
    description:
      "Fast storage for quick boot times and dependable performance.",
    seed: "electronics-3",
  }),
  createProduct({
    id: 4,
    title: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache",
    price: 109.0,
    category: "electronics",
    description:
      "A reliable SSD option for compact systems and upgrades.",
    seed: "electronics-4",
  }),
  createProduct({
    id: 5,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    category: "men's clothing",
    description:
      "Everyday carry with a roomy main compartment and durable build.",
    seed: "mens-1",
  }),
  createProduct({
    id: 6,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    category: "men's clothing",
    description:
      "Soft casual wear with a slim profile and easy fit.",
    seed: "mens-2",
  }),
  createProduct({
    id: 7,
    title: "Mens Cotton Jacket",
    price: 55.99,
    category: "men's clothing",
    description:
      "A classic jacket for layered everyday wear.",
    seed: "mens-3",
  }),
  createProduct({
    id: 8,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    category: "men's clothing",
    description:
      "A lightweight staple with a clean silhouette.",
    seed: "mens-4",
  }),
  createProduct({
    id: 9,
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695.0,
    category: "jewelery",
    description:
      "A statement bracelet with a detailed artisan look.",
    seed: "jewelery-1",
  }),
  createProduct({
    id: 10,
    title: "Solid Gold Petite Micropave",
    price: 168.0,
    category: "jewelery",
    description:
      "Elegant jewelry with a bright, polished finish.",
    seed: "jewelery-2",
  }),
  createProduct({
    id: 11,
    title: "White Gold Plated Princess",
    price: 9.99,
    category: "jewelery",
    description:
      "A refined ring style with a bright metal tone.",
    seed: "jewelery-3",
  }),
  createProduct({
    id: 12,
    title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    price: 10.99,
    category: "jewelery",
    description:
      "Modern jewelry with a warm rose gold finish.",
    seed: "jewelery-4",
  }),
  createProduct({
    id: 13,
    title: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 29.95,
    category: "women's clothing",
    description:
      "A statement jacket with an edge and everyday wearability.",
    seed: "womens-1",
  }),
  createProduct({
    id: 14,
    title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    price: 39.99,
    category: "women's clothing",
    description:
      "Lightweight outerwear for changing weather.",
    seed: "womens-2",
  }),
  createProduct({
    id: 15,
    title: "Opna Women's Short Sleeve Moisture",
    price: 7.95,
    category: "women's clothing",
    description:
      "Casual everyday wear with a relaxed fit.",
    seed: "womens-3",
  }),
  createProduct({
    id: 16,
    title: "MBJ Women's Solid Short Sleeve Boat Neck V",
    price: 9.85,
    category: "women's clothing",
    description:
      "Simple, versatile styling for a clean wardrobe staple.",
    seed: "womens-4",
  }),
  createProduct({
    id: 17,
    title: "DANVOUY Womens T Shirt Casual Cotton Short",
    price: 12.99,
    category: "women's clothing",
    description:
      "A casual cotton tee designed for everyday wear.",
    seed: "womens-5",
  }),
];

export const slugify = (value) =>
  String(value)
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const buildCategories = (products) => {
  const seen = new Map();

  for (const product of products) {
    const slug = slugify(product.category);

    if (!seen.has(slug)) {
      seen.set(slug, {
        slug,
        name: product.category,
        image: product.image,
      });
    }
  }

  return [...seen.values()];
};

import { createServer } from "node:http";

import {
  buildCategories,
  fallbackProducts,
  slugify,
} from "./data/products.js";

const PORT = Number(process.env.PORT || 3001);
const SOURCE_URL = "https://fakestoreapi.com/products";

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  res.end(JSON.stringify(payload));
};

const normalizeProduct = (product, index) => ({
  id: product.id ?? index + 1,
  title: product.title ?? "Product",
  price: Number(product.price ?? 0),
  description: product.description ?? "",
  category: product.category ?? "uncategorized",
  image: product.image ?? "",
  quantity: 1,
});

const loadProducts = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch(SOURCE_URL, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(
        `Unexpected response ${response.status}`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data) || !data.length) {
      throw new Error("No product data received");
    }

    return data.map(normalizeProduct);
  } catch {
    return fallbackProducts;
  } finally {
    clearTimeout(timeout);
  }
};

const state = {
  products: await loadProducts(),
};

state.categories = buildCategories(state.products);

const getCategoryBySlug = (slug) =>
  state.categories.find((category) => category.slug === slug);

const getProductsByCategorySlug = (slug) =>
  state.products.filter(
    (product) => slugify(product.category) === slug
  );

const server = createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  const requestUrl = new URL(
    req.url || "/",
    `http://${req.headers.host || "localhost"}`
  );
  const { pathname } = requestUrl;

  if (req.method === "GET" && pathname === "/api/products") {
    sendJson(res, 200, state.products);
    return;
  }

  if (req.method === "GET" && pathname === "/api/categories") {
    sendJson(res, 200, state.categories);
    return;
  }

  const categoryMatch = pathname.match(
    /^\/api\/categories\/([^/]+)$/
  );
  if (req.method === "GET" && categoryMatch) {
    const category = getCategoryBySlug(
      decodeURIComponent(categoryMatch[1])
    );

    if (!category) {
      sendJson(res, 404, {
        message: "Category not found",
      });
      return;
    }

    sendJson(res, 200, category);
    return;
  }

  const productsByCategoryMatch = pathname.match(
    /^\/api\/products\/category\/([^/]+)$/
  );
  if (req.method === "GET" && productsByCategoryMatch) {
    const slug = decodeURIComponent(
      productsByCategoryMatch[1]
    );
    const category = getCategoryBySlug(slug);

    if (!category) {
      sendJson(res, 404, {
        message: "Category not found",
      });
      return;
    }

    sendJson(
      res,
      200,
      getProductsByCategorySlug(slug)
    );
    return;
  }

  sendJson(res, 404, {
    message: "Not found",
  });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(
    `API server running on http://127.0.0.1:${PORT}`
  );
});

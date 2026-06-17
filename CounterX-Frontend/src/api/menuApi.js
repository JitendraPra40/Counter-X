import api from "../services/api";

// Map backend Menu entity fields → frontend-friendly shape
const mapMenuItem = (item) => ({
  id: item.menuId,
  name: item.itemName,
  description: item.description || "",
  price: item.price,
  category: item.category,       // e.g. "BREAKFAST"
  available: item.available,
  image: item.imagePath || null,
});

// Categories must match backend enum: BREAKFAST, MEALS, SNACKS, DRINKS, DESSERT
const CATEGORIES = ["BREAKFAST", "MEALS", "SNACKS", "DRINKS", "DESSERT"];

/** Returns ["All", "BREAKFAST", "MEALS", ...] */
export const getCategories = async () => {
  return ["All", ...CATEGORIES];
};

/**
 * Fetch available menu items.
 * @param {string} category – "All" or one of CATEGORIES
 * @param {string} search   – optional search term (client-side filtered)
 */
export const getMenuItems = async (category = "All", search = "") => {
  let data;
  if (!category || category === "All") {
    const res = await api.get("/api/menu/available");
    data = res.data;
  } else {
    const res = await api.get(`/api/menu/available/category/${category}`);
    data = res.data;
  }

  const items = data.map(mapMenuItem);

  // Client-side search filter
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    return items.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        (i.description && i.description.toLowerCase().includes(q))
    );
  }

  return items;
};

/** Fetch a single menu item by id */
export const getMenuItemById = async (id) => {
  const { data } = await api.get(`/api/menu/${id}`);
  return mapMenuItem(data);
};

/** Fetch available items by category */
export const getMenuByCategory = async (category) => {
  const { data } = await api.get(`/api/menu/available/category/${category}`);
  return data.map(mapMenuItem);
};
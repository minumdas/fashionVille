const API_URL = "http://localhost:9090/api/public";

export const fetchProductsByCategory = async (category) => {
    try {
        console.log(`[API] Fetching products for category: ${category}`);
        const response = await fetch(`${API_URL}/products/category/${category}`);

        console.log(`[API] Response status: ${response.status} for category: ${category}`);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`[API] Received ${data.length} products for category: ${category}`, data);
        return data;
    } catch (error) {
        console.error(`[API] Failed to fetch products for category ${category}:`, error);
        return [];
    }
};

export const getAllProducts = async () => {
    try {
        console.log('[API] Fetching all products...');
        const response = await fetch(`${API_URL}/products`);

        console.log(`[API] Response status: ${response.status} for all products`);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`[API] Received ${data.length} products total`, data);
        return data;
    } catch (error) {
        console.error("[API] Failed to fetch all products:", error);
        return [];
    }
};

export const fetchCategories = async () => {
    try {
        console.log('[API] Fetching categories...');
        const response = await fetch(`${API_URL}/categories`);

        console.log(`[API] Categories response status: ${response.status}`);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`[API] Received ${data.length} categories`, data);
        return data;
    } catch (error) {
        console.error("[API] Failed to fetch categories:", error);
        console.error("[API] Error details:", error.message);
        return [];
    }
};

export const fetchCategoriesByType = async (type) => {
    try {
        console.log(`[API] Fetching categories for type: ${type}`);
        const response = await fetch(`${API_URL}/categories/type/${type}`);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`[API] Received ${data.length} categories for type: ${type}`, data);
        return data;
    } catch (error) {
        console.error(`[API] Failed to fetch categories for type ${type}:`, error);
        return [];
    }
};

export const getProductById = async (id) => {
    try {
        console.log(`[API] Fetching product with id: ${id}`);
        const response = await fetch(`${API_URL}/products/${id}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`[API] Failed to fetch product ${id}:`, error);
        return null;
    }
};

const CART_API_URL = "http://localhost:9090/api/cart";

export const getCart = async (username) => {
    try {
        console.log(`[API] Fetching cart for user: ${username}`);
        const response = await fetch(`${CART_API_URL}/${username}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`[API] Failed to fetch cart for ${username}:`, error);
        return { items: [] };
    }
};

export const addToCart = async (username, productId, quantity = 1) => {
    try {
        console.log(`[API] Adding product ${productId} to cart for user: ${username}`);
        const response = await fetch(`${CART_API_URL}/add?username=${username}&productId=${productId}&quantity=${quantity}`, {
            method: 'POST'
        });
        if (!response.ok) {
            let errorMessage = `Error: ${response.status} ${response.statusText}`;
            try {
                const errorData = await response.text();
                if (errorData) errorMessage = errorData;
            } catch (e) { }
            throw new Error(errorMessage);
        }
        return { success: true };
    } catch (error) {
        console.error(`[API] Failed to add to cart:`, error);
        return { success: false, error: error.message };
    }
};

export const clearCart = async (username) => {
    try {
        console.log(`[API] Clearing cart for user: ${username}`);
        const response = await fetch(`${CART_API_URL}/clear/${username}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return true;
    } catch (error) {
        console.error(`[API] Failed to clear cart:`, error);
        return false;
    }
};

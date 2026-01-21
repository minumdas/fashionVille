import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart as apiAddToCart, clearCart as apiClearCart, removeItemFromCart } from '../utils/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(false);

    // For now, let's use a default user since full auth integration is pending
    // We can get this from localStorage or session later
    const username = localStorage.getItem('username') || 'guest';

    const fetchCart = async () => {
        if (!username) return;
        setLoading(true);
        try {
            const data = await getCart(username);
            setCart(data);
        } catch (error) {
            console.error('Failed to fetch cart:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [username]);

    const addToCart = async (productId, quantity = 1) => {
        const result = await apiAddToCart(username, productId, quantity);
        if (result.success) {
            await fetchCart(); // Refresh cart from server
        }
        return result;
    };

    const clearCart = async () => {
        const success = await apiClearCart(username);
        if (success) {
            setCart({ items: [] });
        }
        return success;
    };

    const removeFromCart = async (productId) => {
        const success = await removeItemFromCart(username, productId);
        if (success) {
            await fetchCart();
        }
        return success;
    };

    const updateQuantity = async (productId, delta) => {
        const result = await apiAddToCart(username, productId, delta);
        if (result.success) {
            await fetchCart();
        }
        return result;
    };

    const cartCount = cart.items.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, loading, addToCart, clearCart, fetchCart, cartCount, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

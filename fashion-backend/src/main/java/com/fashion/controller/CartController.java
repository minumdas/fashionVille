package com.fashion.controller;

import com.fashion.entity.Cart;
import com.fashion.entity.CartItem;
import com.fashion.entity.Product;
import com.fashion.entity.User;
import com.fashion.repository.CartItemRepository;
import com.fashion.repository.CartRepository;
import com.fashion.repository.ProductRepository;
import com.fashion.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{username}")
    public ResponseEntity<?> getCart(@PathVariable String username) {
        User user = userRepository.findByUsername(username).orElseGet(() -> {
            User newUser = new User();
            newUser.setUsername(username);
            newUser.setPassword("password"); // Default password for auto-created users
            return userRepository.save(newUser);
        });

        Cart cart = cartRepository.findByUser(user).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUser(user);
            return cartRepository.save(newCart);
        });

        return ResponseEntity.ok(cart);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestParam String username, @RequestParam Long productId,
            @RequestParam Integer quantity) {
        User user = userRepository.findByUsername(username).orElseGet(() -> {
            User newUser = new User();
            newUser.setUsername(username);
            newUser.setPassword("password");
            return userRepository.save(newUser);
        });

        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Product not found");
        }

        Product product = productOpt.get();

        Cart cart = cartRepository.findByUser(user).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUser(user);
            return cartRepository.save(newCart);
        });

        // Check if item already exists in cart
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            int newQuantity = item.getQuantity() + quantity;
            if (newQuantity <= 0) {
                cart.getItems().remove(item);
                cartItemRepository.delete(item);
            } else {
                item.setQuantity(newQuantity);
            }
        } else if (quantity > 0) {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(quantity);
            cart.getItems().add(newItem);
        }

        cartRepository.save(cart);
        return ResponseEntity.ok("Cart updated successfully");
    }

    @PostMapping("/remove")
    public ResponseEntity<?> removeFromCart(@RequestParam String username, @RequestParam Long productId) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null)
            return ResponseEntity.badRequest().body("User not found");

        Cart cart = cartRepository.findByUser(user).orElse(null);
        if (cart == null)
            return ResponseEntity.ok("Cart already empty");

        Optional<CartItem> itemToRemove = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();

        if (itemToRemove.isPresent()) {
            CartItem item = itemToRemove.get();
            cart.getItems().remove(item);
            cartItemRepository.delete(item);
            cartRepository.save(cart);
            return ResponseEntity.ok("Item removed from cart");
        }

        return ResponseEntity.ok("Item not found in cart");
    }

    @DeleteMapping("/clear/{username}")
    public ResponseEntity<?> clearCart(@PathVariable String username) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            return ResponseEntity.ok("Cart already empty (user not found)");
        }

        User user = userOpt.get();
        Optional<Cart> cartOpt = cartRepository.findByUser(user);

        if (cartOpt.isPresent()) {
            Cart cart = cartOpt.get();
            cart.getItems().clear();
            cartRepository.save(cart);
        }

        return ResponseEntity.ok("Cart cleared successfully");
    }
}

package com.fashion.controller;

import com.fashion.entity.Category;
import com.fashion.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/public")
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/categories/type/{type}")
    public List<Category> getCategoriesByType(@PathVariable String type) {
        return categoryRepository.findByType(type);
    }
}

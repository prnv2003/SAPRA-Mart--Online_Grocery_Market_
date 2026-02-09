package com.sapramart.controller;

import com.sapramart.model.Product;
import com.sapramart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // ➕ Add product
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    // 📄 Get all products
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}

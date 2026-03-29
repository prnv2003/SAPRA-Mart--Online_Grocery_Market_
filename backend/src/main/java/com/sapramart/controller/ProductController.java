package com.sapramart.controller;

import com.sapramart.model.Product;
import com.sapramart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // ✅ GET ALL
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // ✅ ADD PRODUCT
    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody Product product) {

        // 🔥 CHECK DUPLICATE
        Optional<Product> existing = productRepository.findByName(product.getName());

        if (existing.isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Product already exists"));
        }

        Product saved = productRepository.save(product);

        return ResponseEntity.ok(Map.of(
                "message", "Product added successfully",
                "data", saved));
    }

    // ✅ UPDATE PRODUCT
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        product.setId(id);
        return productRepository.save(product);
    }

    // ✅ DELETE PRODUCT
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }
}

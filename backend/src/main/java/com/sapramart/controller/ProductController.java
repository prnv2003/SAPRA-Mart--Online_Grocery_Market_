package com.sapramart.controller;

import com.sapramart.model.Product;
import com.sapramart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.io.File;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // ✅ GET ALL PRODUCTS
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // ✅ GET BY CATEGORY
    @GetMapping("/category/{category}")
    public List<Product> getByCategory(@PathVariable String category) {
        return productRepository.findByCategory(category);
    }

    // ✅ ADD PRODUCT WITH IMAGE (ONLY THIS API)
    @PostMapping("/add")
    public ResponseEntity<?> addProduct(
            @RequestParam String name,
            @RequestParam String category,
            @RequestParam int price,
            @RequestParam int quantity,
            @RequestParam("image") MultipartFile file) {

        try {

            // 🔥 Duplicate check
            Optional<Product> existing = productRepository.findByName(name);
            if (existing.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", "Product already exists"));
            }

            // 🔥 Save image
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

            String uploadDir = "uploads/";
            File uploadPath = new File(uploadDir);
            if (!uploadPath.exists())
                uploadPath.mkdirs();

            file.transferTo(new File(uploadDir + fileName));

            // 🔥 Save product
            Product p = new Product();
            p.setName(name);
            p.setCategory(category);
            p.setPrice(price);
            p.setQuantity(quantity);
            p.setImage(fileName);

            productRepository.save(p);

            return ResponseEntity.ok(Map.of(
                    "message", "Product added successfully",
                    "data", p));

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error saving product"));
        }
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }

    // ✅ UPDATE (without image for now)
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        product.setId(id);
        return productRepository.save(product);
    }
}
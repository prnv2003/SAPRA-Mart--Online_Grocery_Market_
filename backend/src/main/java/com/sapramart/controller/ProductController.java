package com.sapramart.controller;

import com.sapramart.model.Product;
import com.sapramart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

// import java.util.*;
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

    // ✅ GET ALL
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/category/{category}")
    public List<Product> getByCategory(@PathVariable String category) {
        return productRepository.findByCategory(category);
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

        if (product.getName() == null || product.getName().isEmpty()) {
            return ResponseEntity.badRequest().body("Product name required");
        }

        if (product.getCategory() == null || product.getCategory().isEmpty()) {
            return ResponseEntity.badRequest().body("Category required");
        }

        if (product.getPrice() <= 0) {
            return ResponseEntity.badRequest().body("Valid price required");
        }

        if (product.getQuantity() < 0) {
            return ResponseEntity.badRequest().body("Valid quantity required");
        }

        Product saved = productRepository.save(product);

        return ResponseEntity.ok(Map.of(
                "message", "Product added successfully",
                "data", saved));
    }

    @PostMapping("/add")
    public Product addProduct(
            @RequestParam String name,
            @RequestParam String category,
            @RequestParam int price,
            @RequestParam int quantity,
            @RequestParam("image") MultipartFile file) throws IOException {

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        String uploadDir = "uploads/";
        File uploadPath = new File(uploadDir);
        if (!uploadPath.exists())
            uploadPath.mkdirs();

        file.transferTo(new File(uploadDir + fileName));

        Product p = new Product();
        p.setName(name);
        p.setCategory(category);
        p.setPrice(price);
        p.setQuantity(quantity);
        p.setImage(fileName);

        return productRepository.save(p);
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

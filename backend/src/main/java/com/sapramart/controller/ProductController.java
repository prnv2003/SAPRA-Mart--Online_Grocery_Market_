package com.sapramart.controller;

import com.sapramart.model.Product;
import com.sapramart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.File;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // GET ALL
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // GET CATEGORY
    @GetMapping("/category/{category}")
    public List<Product> getByCategory(@PathVariable String category) {
        return productRepository.findByCategory(category);
    }

    // ADD PRODUCT
    @PostMapping("/add")
    public Product addProduct(
            @RequestParam String name,
            @RequestParam String category,
            @RequestParam double price,
            @RequestParam int quantity,
            @RequestParam(value = "image", required = false) MultipartFile file) throws IOException {

        Product p = new Product();

        p.setName(name);
        p.setCategory(category);
        p.setPrice(price);
        p.setQuantity(quantity);

        if (file != null && !file.isEmpty()) {

            String uploadDir = System.getProperty("user.dir") + File.separator + "uploads";
            File folder = new File(uploadDir);

            if (!folder.exists())
                folder.mkdirs();

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

            File destination = new File(folder, fileName);

            file.transferTo(destination);

            p.setImage(fileName);
        }

        return productRepository.save(p);
    }

    // UPDATE PRODUCT
    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String category,
            @RequestParam double price,
            @RequestParam int quantity,
            @RequestParam(value = "image", required = false) MultipartFile file) throws IOException {

        Product existing = productRepository.findById(id).orElseThrow();

        existing.setName(name);
        existing.setCategory(category);
        existing.setPrice(price);
        existing.setQuantity(quantity);

        // If new image selected
        if (file != null && !file.isEmpty()) {

            String uploadDir = System.getProperty("user.dir") + File.separator + "uploads";

            File folder = new File(uploadDir);
            if (!folder.exists())
                folder.mkdirs();

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

            File destination = new File(folder, fileName);

            file.transferTo(destination);

            existing.setImage(fileName);
        }

        return productRepository.save(existing);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }
}
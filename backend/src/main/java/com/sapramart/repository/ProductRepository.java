package com.sapramart.repository;

import java.util.Optional;

import com.sapramart.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // 🔥 CHECK IF PRODUCT EXISTS
    Optional<Product> findByName(String name);
}
package com.sapramart.controller;

import com.sapramart.model.User;
import com.sapramart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // ================= SIGNUP =================
    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody User user) {

        Map<String, Object> response = new HashMap<>();

        // ✅ CHECK IF EMAIL ALREADY EXISTS
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            response.put("success", false);
            response.put("message", "Email already registered");
            return ResponseEntity.ok(response);
        }

        // 🔐 Encrypt password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        response.put("success", true);
        response.put("message", "User registered successfully");
        return ResponseEntity.ok(response);
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {

        Map<String, Object> response = new HashMap<>();

        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser == null) {
            response.put("success", false);
            response.put("message", "Invalid email or password");
            return ResponseEntity.ok(response);
        }

        // 🔐 BCrypt password comparison
        if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            response.put("success", false);
            response.put("message", "Invalid email or password");
            return ResponseEntity.ok(response);
        }

        response.put("success", true);
        response.put("message", "Login successful");
        return ResponseEntity.ok(response);
    }
}

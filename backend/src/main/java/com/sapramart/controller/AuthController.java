package com.sapramart.controller;

import com.sapramart.config.JwtUtil;
import com.sapramart.model.User;
import com.sapramart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // ================= SIGNUP =================
    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody User user) {

        Map<String, Object> response = new HashMap<>();

        user.setRole("CUSTOMER");

        // ✅ CHECK IF EMAIL ALREADY EXISTS
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
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
    public ResponseEntity<?> login(@RequestBody User user) {

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            User dbUser = existingUser.get();

            if (passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {

                String role = dbUser.getRole() != null ? dbUser.getRole() : "USER";

                String token = jwtUtil.generateToken(
                        dbUser.getEmail(),
                        role);

                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "token", token,
                        "role", role));
            }
        }

        return ResponseEntity.status(401).body(Map.of(
                "success", false,
                "message", "Invalid email or password"));
    }
}

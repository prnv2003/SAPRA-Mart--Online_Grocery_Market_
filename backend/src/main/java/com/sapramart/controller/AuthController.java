package com.sapramart.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.sapramart.model.User;
import com.sapramart.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ================= SIGNUP =================

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {

        user.setEmail(user.getEmail().trim().toLowerCase());

        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("User registered successfully");

        } catch (org.springframework.dao.DataIntegrityViolationException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Email already registered");
        }
    }

    // ================= LOGIN =================

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {

        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser == null) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body("Invalid email or password");
        }

        if (!existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body("Invalid email or password");
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Login successful");
    }
}

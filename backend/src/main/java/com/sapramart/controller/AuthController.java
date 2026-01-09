package com.sapramart.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sapramart.model.User;
import com.sapramart.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // SIGNUP API
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        System.out.println("Signup request received: " + user.getEmail());
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // LOGIN API
    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser != null &&
                existingUser.getPassword().equals(user.getPassword())) {
            return "Login successful";
        }
        return "Invalid credentials";
    }
}

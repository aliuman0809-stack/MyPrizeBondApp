package com.prizebond.prize_bond_backend.controller;

import com.prizebond.prize_bond_backend.entity.User;
import com.prizebond.prize_bond_backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private final UserService service;

    public AuthController(UserService service) { this.service = service; }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try { return ResponseEntity.ok(service.register(user)); }
        catch (Exception e) { return ResponseEntity.badRequest().body(Map.of("error", e.getMessage())); }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req) {
        try {
            User user = service.login(req.get("email"), req.get("pin"));
            return ResponseEntity.ok(Map.of("user", user, "message", "Login successful"));
        } catch (Exception e) { return ResponseEntity.badRequest().body(Map.of("error", e.getMessage())); }
    }
}
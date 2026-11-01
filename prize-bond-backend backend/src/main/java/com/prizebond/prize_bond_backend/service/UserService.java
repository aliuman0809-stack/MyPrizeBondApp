package com.prizebond.prize_bond_backend.service;

import com.prizebond.prize_bond_backend.entity.User;
import com.prizebond.prize_bond_backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(User user) {
        user.setApproved(false);
        if (user.getRole() == null) user.setRole("USER");
        return userRepository.save(user);
    }

    public User login(String email, String pin) {
        User user = userRepository.findByEmailAndPin(email, pin)
                .orElseThrow(() -> new RuntimeException("Invalid Email or PIN"));
        if (!user.isApproved() && !"ADMIN".equalsIgnoreCase(user.getRole())) {
            throw new RuntimeException("Account pending for Admin approval.");
        }
        return user;
    }

    // NAYA: Approve aur Get All methods
    public User approveUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setApproved(true);
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
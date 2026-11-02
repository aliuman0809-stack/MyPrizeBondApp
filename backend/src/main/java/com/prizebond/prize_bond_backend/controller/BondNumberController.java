package com.prizebond.prize_bond_backend.controller;

import com.prizebond.prize_bond_backend.entity.BondNumber;
import com.prizebond.prize_bond_backend.entity.DrawWinner;
import com.prizebond.prize_bond_backend.repository.DrawWinnerRepository;
import com.prizebond.prize_bond_backend.service.BondNumberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bonds")
@CrossOrigin(origins = "*")
public class BondNumberController {
    private final BondNumberService service;
    private final DrawWinnerRepository drawWinnerRepository;

    public BondNumberController(BondNumberService service, DrawWinnerRepository drawWinnerRepository) {
        this.service = service;
        this.drawWinnerRepository = drawWinnerRepository;
    }

    @GetMapping
    public List<BondNumber> getAll() { return service.getAll(); }

    @PostMapping("/generate")
    public List<BondNumber> generate(@RequestBody Map<String, Long> req) {
        return service.generateBonds(req.get("seriesId"), req.get("totalBonds").intValue());
    }

    @PostMapping("/draw/{seriesId}")
    public ResponseEntity<?> draw(@PathVariable Long seriesId) {
        try {
            BondNumber winner = service.drawWinner(seriesId);
            return ResponseEntity.ok(Map.of("winner", winner, "message", "Winner Selected!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // NAYA: Winners History endpoint
    @GetMapping("/winners")
    public List<DrawWinner> getWinners() {
        return drawWinnerRepository.findAll();
    }
}
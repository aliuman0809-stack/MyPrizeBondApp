package com.prizebond.prize_bond_backend.controller;

import com.prizebond.prize_bond_backend.entity.BondSeries;
import com.prizebond.prize_bond_backend.service.BondSeriesService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bond-series")
@CrossOrigin(origins = "*")
public class BondSeriesController {
    private final BondSeriesService service;

    public BondSeriesController(BondSeriesService service) { this.service = service; }

    @GetMapping
    public List<BondSeries> getAll() { return service.getAll(); }

    @PostMapping("/generate")
    public List<BondSeries> generate(@RequestBody Map<String, Integer> req) {
        return service.generate(req.get("denomination"), req.get("totalSeries"));
    }
}
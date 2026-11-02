package com.prizebond.prize_bond_backend.service;

import com.prizebond.prize_bond_backend.entity.BondSeries;
import com.prizebond.prize_bond_backend.repository.BondSeriesRepository;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class BondSeriesService {
    private final BondSeriesRepository repository;

    public BondSeriesService(BondSeriesRepository repository) {
        this.repository = repository;
    }

    public List<BondSeries> getAll() { return repository.findAll(); }

    public List<BondSeries> generate(Integer denomination, Integer totalSeries) {
        List<BondSeries> list = new ArrayList<>();
        for (int i = 0; i < totalSeries; i++) {
            BondSeries series = new BondSeries();
            series.setDenomination(denomination);
            series.setSeriesName("SR-" + denomination + "-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase());
            list.add(series);
        }
        return repository.saveAll(list);
    }
}
package com.prizebond.prize_bond_backend.service;

import com.prizebond.prize_bond_backend.entity.BondNumber;
import com.prizebond.prize_bond_backend.entity.DrawWinner;
import com.prizebond.prize_bond_backend.repository.BondNumberRepository;
import com.prizebond.prize_bond_backend.repository.DrawWinnerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BondNumberService {

    private final BondNumberRepository repository;
    private final DrawWinnerRepository drawWinnerRepository;

    public BondNumberService(BondNumberRepository repository, DrawWinnerRepository drawWinnerRepository) {
        this.repository = repository;
        this.drawWinnerRepository = drawWinnerRepository;
    }

    public List<BondNumber> generateBonds(Long seriesId, int total) {
        List<BondNumber> list = new ArrayList<>();
        for (int i = 1; i <= total; i++) {
            BondNumber bond = new BondNumber();
            bond.setSeriesId(seriesId);
            bond.setSerialNumber(String.format("%06d", i));
            list.add(bond);
        }
        return repository.saveAll(list);
    }

    @Transactional
    public BondNumber drawWinner(Long seriesId) {
        Optional<BondNumber> winnerOpt = repository.findRandomBond(seriesId);
        if (winnerOpt.isEmpty()) throw new RuntimeException("No bonds left in this series!");

        BondNumber winner = winnerOpt.get();
        winner.setPicked(true);

        DrawWinner history = new DrawWinner();
        history.setBondNumber(winner.getSerialNumber());
        history.setSeriesId(winner.getSeriesId());
        history.setPrizeAmount(10000.0);
        drawWinnerRepository.save(history);

        return repository.save(winner);
    }

    public List<BondNumber> getAll() { return repository.findAll(); }
}
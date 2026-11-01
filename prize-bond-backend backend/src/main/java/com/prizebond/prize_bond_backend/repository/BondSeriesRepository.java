package com.prizebond.prize_bond_backend.repository;

import com.prizebond.prize_bond_backend.entity.BondSeries;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BondSeriesRepository extends JpaRepository<BondSeries, Long> {
}
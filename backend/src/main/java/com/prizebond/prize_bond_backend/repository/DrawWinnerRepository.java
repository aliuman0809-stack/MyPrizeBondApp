package com.prizebond.prize_bond_backend.repository;

import com.prizebond.prize_bond_backend.entity.DrawWinner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrawWinnerRepository extends JpaRepository<DrawWinner, Long> {
}
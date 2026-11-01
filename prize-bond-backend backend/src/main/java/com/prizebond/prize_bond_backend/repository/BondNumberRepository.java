package com.prizebond.prize_bond_backend.repository;

import com.prizebond.prize_bond_backend.entity.BondNumber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface BondNumberRepository extends JpaRepository<BondNumber, Long> {
    // Random Bond Pick (PostgreSQL)
    @Query(value = "SELECT * FROM bond_numbers WHERE series_id = :seriesId AND is_picked = false ORDER BY RANDOM() LIMIT 1", nativeQuery = true)
    Optional<BondNumber> findRandomBond(@Param("seriesId") Long seriesId);
}
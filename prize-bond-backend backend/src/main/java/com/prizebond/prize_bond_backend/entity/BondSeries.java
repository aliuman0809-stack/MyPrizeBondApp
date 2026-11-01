package com.prizebond.prize_bond_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "bond_series")
public class BondSeries {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String seriesName;
    private Integer denomination;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSeriesName() { return seriesName; }
    public void setSeriesName(String seriesName) { this.seriesName = seriesName; }
    public Integer getDenomination() { return denomination; }
    public void setDenomination(Integer denomination) { this.denomination = denomination; }
}
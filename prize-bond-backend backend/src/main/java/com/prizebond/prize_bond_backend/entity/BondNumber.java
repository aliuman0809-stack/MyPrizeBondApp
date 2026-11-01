package com.prizebond.prize_bond_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "bond_numbers")
public class BondNumber {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String serialNumber;
    private Long seriesId;
    private boolean isPicked = false;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSerialNumber() { return serialNumber; }
    public void setSerialNumber(String serialNumber) { this.serialNumber = serialNumber; }
    public Long getSeriesId() { return seriesId; }
    public void setSeriesId(Long seriesId) { this.seriesId = seriesId; }
    public boolean isPicked() { return isPicked; }
    public void setPicked(boolean picked) { isPicked = picked; }
}
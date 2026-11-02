package com.prizebond.prize_bond_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "draw_winners")
public class DrawWinner {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bondNumber;
    private Long seriesId;
    private Double prizeAmount;
    private LocalDateTime drawDate = LocalDateTime.now();

    public Long getId() { return id; }
    public String getBondNumber() { return bondNumber; }
    public void setBondNumber(String bondNumber) { this.bondNumber = bondNumber; }
    public Long getSeriesId() { return seriesId; }
    public void setSeriesId(Long seriesId) { this.seriesId = seriesId; }
    public Double getPrizeAmount() { return prizeAmount; }
    public void setPrizeAmount(Double prizeAmount) { this.prizeAmount = prizeAmount; }
    public LocalDateTime getDrawDate() { return drawDate; }
}
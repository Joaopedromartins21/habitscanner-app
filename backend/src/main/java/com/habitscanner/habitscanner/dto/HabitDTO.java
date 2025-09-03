package com.habitscanner.habitscanner.dto;

import com.habitscanner.habitscanner.model.HabitFrequency;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class HabitDTO {
    private Long id;
    private String name;
    private String description;
    private String userId;
    private LocalDate startDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private HabitFrequency frequency;
    private Boolean active;
    private Integer currentStreak;
    private Integer longestStreak;
    private Double completionRate;
    
    // Constructors
    public HabitDTO() {}
    
    public HabitDTO(Long id, String name, String description, String userId, LocalDate startDate, 
                   LocalDateTime createdAt, LocalDateTime updatedAt, HabitFrequency frequency, Boolean active) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.userId = userId;
        this.startDate = startDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.frequency = frequency;
        this.active = active;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public LocalDate getStartDate() {
        return startDate;
    }
    
    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public HabitFrequency getFrequency() {
        return frequency;
    }
    
    public void setFrequency(HabitFrequency frequency) {
        this.frequency = frequency;
    }
    
    public Boolean getActive() {
        return active;
    }
    
    public void setActive(Boolean active) {
        this.active = active;
    }
    
    public Integer getCurrentStreak() {
        return currentStreak;
    }
    
    public void setCurrentStreak(Integer currentStreak) {
        this.currentStreak = currentStreak;
    }
    
    public Integer getLongestStreak() {
        return longestStreak;
    }
    
    public void setLongestStreak(Integer longestStreak) {
        this.longestStreak = longestStreak;
    }
    
    public Double getCompletionRate() {
        return completionRate;
    }
    
    public void setCompletionRate(Double completionRate) {
        this.completionRate = completionRate;
    }
}


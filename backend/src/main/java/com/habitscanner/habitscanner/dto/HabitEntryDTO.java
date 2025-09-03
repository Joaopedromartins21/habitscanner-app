package com.habitscanner.habitscanner.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class HabitEntryDTO {
    private Long id;
    private Long habitId;
    private String habitName;
    private LocalDate date;
    private Boolean completed;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructors
    public HabitEntryDTO() {}
    
    public HabitEntryDTO(Long id, Long habitId, String habitName, LocalDate date, Boolean completed, 
                        String notes, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.habitId = habitId;
        this.habitName = habitName;
        this.date = date;
        this.completed = completed;
        this.notes = notes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getHabitId() {
        return habitId;
    }
    
    public void setHabitId(Long habitId) {
        this.habitId = habitId;
    }
    
    public String getHabitName() {
        return habitName;
    }
    
    public void setHabitName(String habitName) {
        this.habitName = habitName;
    }
    
    public LocalDate getDate() {
        return date;
    }
    
    public void setDate(LocalDate date) {
        this.date = date;
    }
    
    public Boolean getCompleted() {
        return completed;
    }
    
    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
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
}


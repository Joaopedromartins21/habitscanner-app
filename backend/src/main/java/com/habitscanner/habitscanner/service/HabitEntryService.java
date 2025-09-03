package com.habitscanner.habitscanner.service;

import com.habitscanner.habitscanner.dto.HabitEntryDTO;
import com.habitscanner.habitscanner.model.Habit;
import com.habitscanner.habitscanner.model.HabitEntry;
import com.habitscanner.habitscanner.repository.HabitRepository;
import com.habitscanner.habitscanner.repository.HabitEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HabitEntryService {
    
    @Autowired
    private HabitEntryRepository habitEntryRepository;
    
    @Autowired
    private HabitRepository habitRepository;
    
    public List<HabitEntryDTO> getEntriesByHabitId(Long habitId, String userId) {
        Optional<Habit> habit = habitRepository.findById(habitId);
        if (habit.isPresent() && habit.get().getUserId().equals(userId)) {
            List<HabitEntry> entries = habitEntryRepository.findByHabitId(habitId);
            return entries.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        }
        return List.of();
    }
    
    public List<HabitEntryDTO> getEntriesByUserIdAndDate(String userId, LocalDate date) {
        List<HabitEntry> entries = habitEntryRepository.findByUserIdAndDate(userId, date);
        return entries.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<HabitEntryDTO> getEntriesByUserIdAndDateRange(String userId, LocalDate startDate, LocalDate endDate) {
        List<HabitEntry> entries = habitEntryRepository.findByUserIdAndDateBetween(userId, startDate, endDate);
        return entries.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<HabitEntryDTO> createOrUpdateEntry(Long habitId, HabitEntryDTO entryDTO, String userId) {
        Optional<Habit> habit = habitRepository.findById(habitId);
        if (!habit.isPresent() || !habit.get().getUserId().equals(userId)) {
            return Optional.empty();
        }
        
        Optional<HabitEntry> existingEntry = habitEntryRepository.findByHabitIdAndDate(habitId, entryDTO.getDate());
        
        HabitEntry entry;
        if (existingEntry.isPresent()) {
            // Update existing entry
            entry = existingEntry.get();
            entry.setCompleted(entryDTO.getCompleted());
            entry.setNotes(entryDTO.getNotes());
        } else {
            // Create new entry
            entry = new HabitEntry(
                habit.get(),
                entryDTO.getDate(),
                entryDTO.getCompleted(),
                entryDTO.getNotes()
            );
        }
        
        HabitEntry savedEntry = habitEntryRepository.save(entry);
        return Optional.of(convertToDTO(savedEntry));
    }
    
    public boolean deleteEntry(Long entryId, String userId) {
        Optional<HabitEntry> entry = habitEntryRepository.findById(entryId);
        if (entry.isPresent() && entry.get().getHabit().getUserId().equals(userId)) {
            habitEntryRepository.delete(entry.get());
            return true;
        }
        return false;
    }
    
    public Long getCompletedEntriesCount(String userId, LocalDate startDate, LocalDate endDate) {
        return habitEntryRepository.countCompletedEntriesByUserIdAndDateBetween(userId, startDate, endDate);
    }
    
    private HabitEntryDTO convertToDTO(HabitEntry entry) {
        return new HabitEntryDTO(
            entry.getId(),
            entry.getHabit().getId(),
            entry.getHabit().getName(),
            entry.getDate(),
            entry.getCompleted(),
            entry.getNotes(),
            entry.getCreatedAt(),
            entry.getUpdatedAt()
        );
    }
}


package com.habitscanner.habitscanner.service;

import com.habitscanner.habitscanner.dto.HabitDTO;
import com.habitscanner.habitscanner.model.Habit;
import com.habitscanner.habitscanner.model.HabitEntry;
import com.habitscanner.habitscanner.repository.HabitRepository;
import com.habitscanner.habitscanner.repository.HabitEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HabitService {
    
    @Autowired
    private HabitRepository habitRepository;
    
    @Autowired
    private HabitEntryRepository habitEntryRepository;
    
    public List<HabitDTO> getAllHabitsByUserId(String userId) {
        List<Habit> habits = habitRepository.findActiveHabitsByUserIdOrderByCreatedAtDesc(userId);
        return habits.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<HabitDTO> getHabitById(Long id, String userId) {
        Optional<Habit> habit = habitRepository.findById(id);
        if (habit.isPresent() && habit.get().getUserId().equals(userId)) {
            return Optional.of(convertToDTO(habit.get()));
        }
        return Optional.empty();
    }
    
    public HabitDTO createHabit(HabitDTO habitDTO) {
        Habit habit = new Habit(
            habitDTO.getName(),
            habitDTO.getDescription(),
            habitDTO.getUserId(),
            habitDTO.getStartDate(),
            habitDTO.getFrequency()
        );
        
        Habit savedHabit = habitRepository.save(habit);
        return convertToDTO(savedHabit);
    }
    
    public Optional<HabitDTO> updateHabit(Long id, HabitDTO habitDTO, String userId) {
        Optional<Habit> existingHabit = habitRepository.findById(id);
        
        if (existingHabit.isPresent() && existingHabit.get().getUserId().equals(userId)) {
            Habit habit = existingHabit.get();
            habit.setName(habitDTO.getName());
            habit.setDescription(habitDTO.getDescription());
            habit.setFrequency(habitDTO.getFrequency());
            habit.setActive(habitDTO.getActive());
            
            Habit updatedHabit = habitRepository.save(habit);
            return Optional.of(convertToDTO(updatedHabit));
        }
        
        return Optional.empty();
    }
    
    public boolean deleteHabit(Long id, String userId) {
        Optional<Habit> habit = habitRepository.findById(id);
        if (habit.isPresent() && habit.get().getUserId().equals(userId)) {
            habit.get().setActive(false);
            habitRepository.save(habit.get());
            return true;
        }
        return false;
    }
    
    public Long getActiveHabitsCount(String userId) {
        return habitRepository.countActiveHabitsByUserId(userId);
    }
    
    private HabitDTO convertToDTO(Habit habit) {
        HabitDTO dto = new HabitDTO(
            habit.getId(),
            habit.getName(),
            habit.getDescription(),
            habit.getUserId(),
            habit.getStartDate(),
            habit.getCreatedAt(),
            habit.getUpdatedAt(),
            habit.getFrequency(),
            habit.getActive()
        );
        
        // Calculate statistics
        dto.setCurrentStreak(calculateCurrentStreak(habit));
        dto.setLongestStreak(calculateLongestStreak(habit));
        dto.setCompletionRate(calculateCompletionRate(habit));
        
        return dto;
    }
    
    private Integer calculateCurrentStreak(Habit habit) {
        List<HabitEntry> entries = habitEntryRepository.findByHabitId(habit.getId());
        if (entries.isEmpty()) return 0;
        
        // Sort entries by date descending
        entries.sort((a, b) -> b.getDate().compareTo(a.getDate()));
        
        int streak = 0;
        LocalDate currentDate = LocalDate.now();
        
        for (HabitEntry entry : entries) {
            if (entry.getDate().equals(currentDate) && entry.getCompleted()) {
                streak++;
                currentDate = currentDate.minusDays(1);
            } else if (entry.getDate().equals(currentDate) && !entry.getCompleted()) {
                break;
            } else if (entry.getDate().isBefore(currentDate)) {
                break;
            }
        }
        
        return streak;
    }
    
    private Integer calculateLongestStreak(Habit habit) {
        List<HabitEntry> entries = habitEntryRepository.findByHabitId(habit.getId());
        if (entries.isEmpty()) return 0;
        
        // Sort entries by date ascending
        entries.sort((a, b) -> a.getDate().compareTo(b.getDate()));
        
        int longestStreak = 0;
        int currentStreak = 0;
        LocalDate previousDate = null;
        
        for (HabitEntry entry : entries) {
            if (entry.getCompleted()) {
                if (previousDate == null || entry.getDate().equals(previousDate.plusDays(1))) {
                    currentStreak++;
                } else {
                    currentStreak = 1;
                }
                longestStreak = Math.max(longestStreak, currentStreak);
            } else {
                currentStreak = 0;
            }
            previousDate = entry.getDate();
        }
        
        return longestStreak;
    }
    
    private Double calculateCompletionRate(Habit habit) {
        List<HabitEntry> entries = habitEntryRepository.findByHabitId(habit.getId());
        if (entries.isEmpty()) return 0.0;
        
        long completedEntries = entries.stream()
                .mapToLong(entry -> entry.getCompleted() ? 1 : 0)
                .sum();
        
        return (double) completedEntries / entries.size() * 100;
    }
}


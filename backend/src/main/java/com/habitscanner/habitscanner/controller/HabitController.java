package com.habitscanner.habitscanner.controller;

import com.habitscanner.habitscanner.dto.HabitDTO;
import com.habitscanner.habitscanner.service.HabitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/habits")
@CrossOrigin(origins = "*")
public class HabitController {
    
    @Autowired
    private HabitService habitService;
    
    private String getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null ? authentication.getName() : null;
    }
    
    @GetMapping
    public ResponseEntity<List<HabitDTO>> getAllHabits() {
        String userId = getCurrentUserId();
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        List<HabitDTO> habits = habitService.getAllHabitsByUserId(userId);
        return ResponseEntity.ok(habits);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<HabitDTO> getHabitById(@PathVariable Long id) {
        String userId = getCurrentUserId();
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        Optional<HabitDTO> habit = habitService.getHabitById(id, userId);
        
        if (habit.isPresent()) {
            return ResponseEntity.ok(habit.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<HabitDTO> createHabit(@RequestBody HabitDTO habitDTO) {
        String userId = getCurrentUserId();
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        habitDTO.setUserId(userId);
        
        HabitDTO createdHabit = habitService.createHabit(habitDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdHabit);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<HabitDTO> updateHabit(@PathVariable Long id, @RequestBody HabitDTO habitDTO) {
        String userId = getCurrentUserId();
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        Optional<HabitDTO> updatedHabit = habitService.updateHabit(id, habitDTO, userId);
        
        if (updatedHabit.isPresent()) {
            return ResponseEntity.ok(updatedHabit.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHabit(@PathVariable Long id) {
        String userId = getCurrentUserId();
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        boolean deleted = habitService.deleteHabit(id, userId);
        
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> getActiveHabitsCount() {
        String userId = getCurrentUserId();
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        Long count = habitService.getActiveHabitsCount(userId);
        return ResponseEntity.ok(count);
    }
}


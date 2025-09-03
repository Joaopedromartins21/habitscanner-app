package com.habitscanner.habitscanner.controller;

import com.habitscanner.habitscanner.dto.HabitDTO;
import com.habitscanner.habitscanner.service.HabitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/habits")
@CrossOrigin(origins = "*")
public class HabitController {
    
    @Autowired
    private HabitService habitService;
    
    @GetMapping
    public ResponseEntity<List<HabitDTO>> getAllHabits(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        String userId = principal.getAttribute("sub");
        List<HabitDTO> habits = habitService.getAllHabitsByUserId(userId);
        return ResponseEntity.ok(habits);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<HabitDTO> getHabitById(@PathVariable Long id, @AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        String userId = principal.getAttribute("sub");
        Optional<HabitDTO> habit = habitService.getHabitById(id, userId);
        
        if (habit.isPresent()) {
            return ResponseEntity.ok(habit.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<HabitDTO> createHabit(@RequestBody HabitDTO habitDTO, @AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        String userId = principal.getAttribute("sub");
        habitDTO.setUserId(userId);
        
        HabitDTO createdHabit = habitService.createHabit(habitDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdHabit);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<HabitDTO> updateHabit(@PathVariable Long id, @RequestBody HabitDTO habitDTO, @AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        String userId = principal.getAttribute("sub");
        Optional<HabitDTO> updatedHabit = habitService.updateHabit(id, habitDTO, userId);
        
        if (updatedHabit.isPresent()) {
            return ResponseEntity.ok(updatedHabit.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHabit(@PathVariable Long id, @AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        String userId = principal.getAttribute("sub");
        boolean deleted = habitService.deleteHabit(id, userId);
        
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> getActiveHabitsCount(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        String userId = principal.getAttribute("sub");
        Long count = habitService.getActiveHabitsCount(userId);
        return ResponseEntity.ok(count);
    }
}


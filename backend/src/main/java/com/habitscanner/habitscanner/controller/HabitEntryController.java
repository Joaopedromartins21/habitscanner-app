package com.habitscanner.habitscanner.controller;

import com.habitscanner.habitscanner.dto.HabitEntryDTO;
import com.habitscanner.habitscanner.service.HabitEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/entries")
@CrossOrigin(origins = "*")
public class HabitEntryController {
    
    @Autowired
    private HabitEntryService habitEntryService;
    
    @GetMapping("/habit/{habitId}")
    public ResponseEntity<List<HabitEntryDTO>> getEntriesByHabitId(@PathVariable Long habitId, @AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        String userId = principal.getAttribute("sub");
        List<HabitEntryDTO> entries = habitEntryService.getEntriesByHabitId(habitId, userId);
        return ResponseEntity.ok(entries);
    }
    
    @GetMapping("/date/{date}")
    public ResponseEntity<List<HabitEntryDTO>> getEntriesByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        String userId = principal.getAttribute("sub");
        List<HabitEntryDTO> entries = habitEntryService.getEntriesByUserIdAndDate(userId, date);
        return ResponseEntity.ok(entries);
    }
    
    @GetMapping("/range")
    public ResponseEntity<List<HabitEntryDTO>> getEntriesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        String userId = principal.getAttribute("sub");
        List<HabitEntryDTO> entries = habitEntryService.getEntriesByUserIdAndDateRange(userId, startDate, endDate);
        return ResponseEntity.ok(entries);
    }
    
    @PostMapping("/habit/{habitId}")
    public ResponseEntity<HabitEntryDTO> createOrUpdateEntry(
            @PathVariable Long habitId,
            @RequestBody HabitEntryDTO entryDTO,
            @AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        String userId = principal.getAttribute("sub");
        Optional<HabitEntryDTO> entry = habitEntryService.createOrUpdateEntry(habitId, entryDTO, userId);
        
        if (entry.isPresent()) {
            return ResponseEntity.ok(entry.get());
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{entryId}")
    public ResponseEntity<Void> deleteEntry(@PathVariable Long entryId, @AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        String userId = principal.getAttribute("sub");
        boolean deleted = habitEntryService.deleteEntry(entryId, userId);
        
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/completed/count")
    public ResponseEntity<Long> getCompletedEntriesCount(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        String userId = principal.getAttribute("sub");
        Long count = habitEntryService.getCompletedEntriesCount(userId, startDate, endDate);
        return ResponseEntity.ok(count);
    }
}


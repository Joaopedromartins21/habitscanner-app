package com.habitscanner.habitscanner.repository;

import com.habitscanner.habitscanner.model.HabitEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface HabitEntryRepository extends JpaRepository<HabitEntry, Long> {
    
    List<HabitEntry> findByHabitId(Long habitId);
    
    List<HabitEntry> findByHabitIdAndDateBetween(Long habitId, LocalDate startDate, LocalDate endDate);
    
    Optional<HabitEntry> findByHabitIdAndDate(Long habitId, LocalDate date);
    
    @Query("SELECT he FROM HabitEntry he WHERE he.habit.userId = :userId AND he.date = :date")
    List<HabitEntry> findByUserIdAndDate(@Param("userId") String userId, @Param("date") LocalDate date);
    
    @Query("SELECT he FROM HabitEntry he WHERE he.habit.userId = :userId AND he.date BETWEEN :startDate AND :endDate")
    List<HabitEntry> findByUserIdAndDateBetween(@Param("userId") String userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT COUNT(he) FROM HabitEntry he WHERE he.habit.userId = :userId AND he.completed = true AND he.date BETWEEN :startDate AND :endDate")
    Long countCompletedEntriesByUserIdAndDateBetween(@Param("userId") String userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}


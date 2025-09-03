package com.habitscanner.habitscanner.repository;

import com.habitscanner.habitscanner.model.Habit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HabitRepository extends JpaRepository<Habit, Long> {
    
    List<Habit> findByUserIdAndActiveTrue(String userId);
    
    List<Habit> findByUserId(String userId);
    
    @Query("SELECT h FROM Habit h WHERE h.userId = :userId AND h.active = true ORDER BY h.createdAt DESC")
    List<Habit> findActiveHabitsByUserIdOrderByCreatedAtDesc(@Param("userId") String userId);
    
    @Query("SELECT COUNT(h) FROM Habit h WHERE h.userId = :userId AND h.active = true")
    Long countActiveHabitsByUserId(@Param("userId") String userId);
}


import React, { createContext, useContext, useState, useEffect } from 'react';
import { habitService } from '../services/habitService';
import { useAuth } from './AuthContext';

const HabitContext = createContext();

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchHabits();
    }
  }, [user]);

  const fetchHabits = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await habitService.getAllHabits();
      setHabits(data);
    } catch (err) {
      setError('Failed to fetch habits');
      console.error('Error fetching habits:', err);
    } finally {
      setLoading(false);
    }
  };

  const createHabit = async (habitData) => {
    try {
      const newHabit = await habitService.createHabit(habitData);
      setHabits(prev => [newHabit, ...prev]);
      return newHabit;
    } catch (err) {
      setError('Failed to create habit');
      throw err;
    }
  };

  const updateHabit = async (id, habitData) => {
    try {
      const updatedHabit = await habitService.updateHabit(id, habitData);
      setHabits(prev => prev.map(habit => 
        habit.id === id ? updatedHabit : habit
      ));
      return updatedHabit;
    } catch (err) {
      setError('Failed to update habit');
      throw err;
    }
  };

  const deleteHabit = async (id) => {
    try {
      await habitService.deleteHabit(id);
      setHabits(prev => prev.filter(habit => habit.id !== id));
    } catch (err) {
      setError('Failed to delete habit');
      throw err;
    }
  };

  const value = {
    habits,
    loading,
    error,
    fetchHabits,
    createHabit,
    updateHabit,
    deleteHabit,
  };

  return (
    <HabitContext.Provider value={value}>
      {children}
    </HabitContext.Provider>
  );
};


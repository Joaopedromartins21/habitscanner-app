import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;

export const habitService = {
  async getAllHabits() {
    const response = await axios.get('/api/habits');
    return response.data;
  },

  async getHabitById(id) {
    const response = await axios.get(`/api/habits/${id}`);
    return response.data;
  },

  async createHabit(habitData) {
    const response = await axios.post('/api/habits', habitData);
    return response.data;
  },

  async updateHabit(id, habitData) {
    const response = await axios.put(`/api/habits/${id}`, habitData);
    return response.data;
  },

  async deleteHabit(id) {
    await axios.delete(`/api/habits/${id}`);
  },

  async getActiveHabitsCount() {
    const response = await axios.get('/api/habits/count');
    return response.data;
  },
};

export const habitEntryService = {
  async getEntriesByHabitId(habitId) {
    const response = await axios.get(`/api/entries/habit/${habitId}`);
    return response.data;
  },

  async getEntriesByDate(date) {
    const response = await axios.get(`/api/entries/date/${date}`);
    return response.data;
  },

  async getEntriesByDateRange(startDate, endDate) {
    const response = await axios.get(`/api/entries/range?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  },

  async createOrUpdateEntry(habitId, entryData) {
    const response = await axios.post(`/api/entries/habit/${habitId}`, entryData);
    return response.data;
  },

  async deleteEntry(entryId) {
    await axios.delete(`/api/entries/${entryId}`);
  },

  async getCompletedEntriesCount(startDate, endDate) {
    const response = await axios.get(`/api/entries/completed/count?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  },
};


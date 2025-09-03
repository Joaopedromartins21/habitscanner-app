import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  IconButton,
  Button,
} from '@mui/material';
import { useHabits } from '../contexts/HabitContext';
import { habitEntryService } from '../services/habitService';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';

const Dashboard = () => {
  const { habits } = useHabits();
  const [todayEntries, setTodayEntries] = useState([]);
  const [stats, setStats] = useState({
    totalHabits: 0,
    completedToday: 0,
    currentStreak: 0,
    weeklyCompletion: 0,
  });

  useEffect(() => {
    fetchTodayEntries();
    calculateStats();
  }, [habits]);

  const fetchTodayEntries = async () => {
    try {
      const today = dayjs().format('YYYY-MM-DD');
      const entries = await habitEntryService.getEntriesByDate(today);
      setTodayEntries(entries);
    } catch (error) {
      console.error('Error fetching today entries:', error);
    }
  };

  const calculateStats = async () => {
    if (habits.length === 0) return;

    try {
      const today = dayjs();
      const weekStart = today.startOf('week').format('YYYY-MM-DD');
      const weekEnd = today.endOf('week').format('YYYY-MM-DD');
      
      const weeklyCompleted = await habitEntryService.getCompletedEntriesCount(weekStart, weekEnd);
      const totalWeeklyPossible = habits.length * 7;
      
      const completedToday = todayEntries.filter(entry => entry.completed).length;
      
      // Calculate average current streak
      const avgStreak = habits.reduce((sum, habit) => sum + (habit.currentStreak || 0), 0) / habits.length;

      setStats({
        totalHabits: habits.length,
        completedToday,
        currentStreak: Math.round(avgStreak),
        weeklyCompletion: totalWeeklyPossible > 0 ? Math.round((weeklyCompleted / totalWeeklyPossible) * 100) : 0,
      });
    } catch (error) {
      console.error('Error calculating stats:', error);
    }
  };

  const toggleHabitCompletion = async (habitId, completed) => {
    try {
      const today = dayjs().format('YYYY-MM-DD');
      await habitEntryService.createOrUpdateEntry(habitId, {
        date: today,
        completed: !completed,
        notes: '',
      });
      fetchTodayEntries();
    } catch (error) {
      console.error('Error toggling habit completion:', error);
    }
  };

  const getHabitCompletionStatus = (habitId) => {
    const entry = todayEntries.find(entry => entry.habitId === habitId);
    return entry ? entry.completed : false;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Acompanhe seu progresso diário e mantenha seus hábitos em dia
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Total de Hábitos
                  </Typography>
                  <Typography variant="h4">
                    {stats.totalHabits}
                  </Typography>
                </Box>
                <TrendingUpIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Concluídos Hoje
                  </Typography>
                  <Typography variant="h4">
                    {stats.completedToday}/{stats.totalHabits}
                  </Typography>
                </Box>
                <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Streak Médio
                  </Typography>
                  <Typography variant="h4">
                    {stats.currentStreak} dias
                  </Typography>
                </Box>
                <CalendarTodayIcon color="warning" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Conclusão Semanal
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {stats.weeklyCompletion}%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={stats.weeklyCompletion} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Today's Habits */}
      <Paper sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5">
            Hábitos de Hoje
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            href="/habits"
          >
            Adicionar Hábito
          </Button>
        </Box>

        {habits.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Typography variant="body1" color="text.secondary">
              Você ainda não tem hábitos cadastrados.
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              href="/habits"
              sx={{ mt: 2 }}
            >
              Criar Primeiro Hábito
            </Button>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {habits.map((habit) => {
              const isCompleted = getHabitCompletionStatus(habit.id);
              return (
                <Grid item xs={12} key={habit.id}>
                  <Card 
                    variant="outlined"
                    sx={{
                      bgcolor: isCompleted ? 'success.light' : 'background.paper',
                      borderColor: isCompleted ? 'success.main' : 'divider',
                    }}
                  >
                    <CardContent>
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center" gap={2}>
                          <IconButton
                            onClick={() => toggleHabitCompletion(habit.id, isCompleted)}
                            color={isCompleted ? 'success' : 'default'}
                          >
                            {isCompleted ? (
                              <CheckCircleIcon />
                            ) : (
                              <RadioButtonUncheckedIcon />
                            )}
                          </IconButton>
                          <Box>
                            <Typography variant="h6" sx={{ 
                              textDecoration: isCompleted ? 'line-through' : 'none',
                              color: isCompleted ? 'text.secondary' : 'text.primary'
                            }}>
                              {habit.name}
                            </Typography>
                            {habit.description && (
                              <Typography variant="body2" color="text.secondary">
                                {habit.description}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Chip
                            label={`${habit.currentStreak || 0} dias`}
                            size="small"
                            color={habit.currentStreak > 0 ? 'primary' : 'default'}
                          />
                          <Chip
                            label={habit.frequency}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default Dashboard;


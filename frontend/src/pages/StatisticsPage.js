import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useHabits } from '../contexts/HabitContext';
import { habitEntryService } from '../services/habitService';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import dayjs from 'dayjs';

const StatisticsPage = () => {
  const { habits } = useHabits();
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [stats, setStats] = useState({
    totalEntries: 0,
    completedEntries: 0,
    completionRate: 0,
    bestStreak: 0,
    habitStats: [],
  });

  useEffect(() => {
    calculateStatistics();
  }, [habits, selectedPeriod]);

  const calculateStatistics = async () => {
    if (habits.length === 0) return;

    try {
      const now = dayjs();
      let startDate, endDate;

      switch (selectedPeriod) {
        case 'week':
          startDate = now.startOf('week');
          endDate = now.endOf('week');
          break;
        case 'month':
          startDate = now.startOf('month');
          endDate = now.endOf('month');
          break;
        case 'year':
          startDate = now.startOf('year');
          endDate = now.endOf('year');
          break;
        default:
          startDate = now.startOf('week');
          endDate = now.endOf('week');
      }

      const entries = await habitEntryService.getEntriesByDateRange(
        startDate.format('YYYY-MM-DD'),
        endDate.format('YYYY-MM-DD')
      );

      const completedEntries = entries.filter(entry => entry.completed).length;
      const totalEntries = entries.length;
      const completionRate = totalEntries > 0 ? (completedEntries / totalEntries) * 100 : 0;

      // Calculate habit-specific statistics
      const habitStats = habits.map(habit => {
        const habitEntries = entries.filter(entry => entry.habitId === habit.id);
        const habitCompleted = habitEntries.filter(entry => entry.completed).length;
        const habitTotal = habitEntries.length;
        const habitRate = habitTotal > 0 ? (habitCompleted / habitTotal) * 100 : 0;

        return {
          id: habit.id,
          name: habit.name,
          completed: habitCompleted,
          total: habitTotal,
          rate: habitRate,
          currentStreak: habit.currentStreak || 0,
          longestStreak: habit.longestStreak || 0,
        };
      });

      const bestStreak = Math.max(...habits.map(h => h.longestStreak || 0), 0);

      setStats({
        totalEntries,
        completedEntries,
        completionRate,
        bestStreak,
        habitStats,
      });
    } catch (error) {
      console.error('Error calculating statistics:', error);
    }
  };

  const getPeriodLabel = () => {
    const labels = {
      week: 'Esta Semana',
      month: 'Este Mês',
      year: 'Este Ano',
    };
    return labels[selectedPeriod];
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Estatísticas
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Analise seu progresso e desempenho nos hábitos
        </Typography>
      </Box>

      {/* Period Selector */}
      <Box mb={4}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Período</InputLabel>
          <Select
            value={selectedPeriod}
            label="Período"
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <MenuItem value="week">Esta Semana</MenuItem>
            <MenuItem value="month">Este Mês</MenuItem>
            <MenuItem value="year">Este Ano</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {habits.length === 0 ? (
        <Box textAlign="center" py={8}>
          <TrendingUpIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Nenhum dado disponível
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Crie alguns hábitos e comece a rastreá-los para ver suas estatísticas
          </Typography>
        </Box>
      ) : (
        <>
          {/* Summary Cards */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Taxa de Conclusão
                      </Typography>
                      <Typography variant="h4">
                        {stats.completionRate.toFixed(1)}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {getPeriodLabel()}
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
                        Entradas Concluídas
                      </Typography>
                      <Typography variant="h4">
                        {stats.completedEntries}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        de {stats.totalEntries} total
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
                        Melhor Streak
                      </Typography>
                      <Typography variant="h4">
                        {stats.bestStreak}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        dias consecutivos
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
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Hábitos Ativos
                      </Typography>
                      <Typography variant="h4">
                        {habits.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        em acompanhamento
                      </Typography>
                    </Box>
                    <TrendingUpIcon color="info" sx={{ fontSize: 40 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Detailed Statistics Table */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Desempenho por Hábito - {getPeriodLabel()}
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Hábito</TableCell>
                    <TableCell align="center">Concluído</TableCell>
                    <TableCell align="center">Total</TableCell>
                    <TableCell align="center">Taxa (%)</TableCell>
                    <TableCell align="center">Streak Atual</TableCell>
                    <TableCell align="center">Melhor Streak</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stats.habitStats.map((habit) => (
                    <TableRow key={habit.id}>
                      <TableCell component="th" scope="row">
                        <Typography variant="body1" fontWeight="medium">
                          {habit.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">{habit.completed}</TableCell>
                      <TableCell align="center">{habit.total}</TableCell>
                      <TableCell align="center">
                        <Typography
                          color={habit.rate >= 80 ? 'success.main' : habit.rate >= 60 ? 'warning.main' : 'error.main'}
                          fontWeight="medium"
                        >
                          {habit.rate.toFixed(1)}%
                        </Typography>
                      </TableCell>
                      <TableCell align="center">{habit.currentStreak} dias</TableCell>
                      <TableCell align="center">{habit.longestStreak} dias</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}
    </Container>
  );
};

export default StatisticsPage;


import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useHabits } from '../contexts/HabitContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import dayjs from 'dayjs';

const HabitsPage = () => {
  const { habits, createHabit, updateHabit, deleteHabit } = useHabits();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequency: 'DAILY',
    startDate: dayjs(),
  });

  const handleOpenDialog = (habit = null) => {
    if (habit) {
      setEditingHabit(habit);
      setFormData({
        name: habit.name,
        description: habit.description || '',
        frequency: habit.frequency,
        startDate: dayjs(habit.startDate),
      });
    } else {
      setEditingHabit(null);
      setFormData({
        name: '',
        description: '',
        frequency: 'DAILY',
        startDate: dayjs(),
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingHabit(null);
  };

  const handleSubmit = async () => {
    try {
      const habitData = {
        ...formData,
        startDate: formData.startDate.format('YYYY-MM-DD'),
        active: true,
      };

      if (editingHabit) {
        await updateHabit(editingHabit.id, habitData);
      } else {
        await createHabit(habitData);
      }
      
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving habit:', error);
    }
  };

  const handleDelete = async (habitId) => {
    if (window.confirm('Tem certeza que deseja excluir este hábito?')) {
      try {
        await deleteHabit(habitId);
      } catch (error) {
        console.error('Error deleting habit:', error);
      }
    }
  };

  const getFrequencyLabel = (frequency) => {
    const labels = {
      DAILY: 'Diário',
      WEEKLY: 'Semanal',
      MONTHLY: 'Mensal',
    };
    return labels[frequency] || frequency;
  };

  const getFrequencyColor = (frequency) => {
    const colors = {
      DAILY: 'primary',
      WEEKLY: 'secondary',
      MONTHLY: 'warning',
    };
    return colors[frequency] || 'default';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Meus Hábitos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gerencie seus hábitos e acompanhe seu progresso
        </Typography>
      </Box>

      {habits.length === 0 ? (
        <Box textAlign="center" py={8}>
          <TrendingUpIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Nenhum hábito encontrado
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Comece criando seu primeiro hábito para começar a rastrear seu progresso
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Criar Primeiro Hábito
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {habits.map((habit) => (
            <Grid item xs={12} sm={6} md={4} key={habit.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {habit.name}
                  </Typography>
                  {habit.description && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {habit.description}
                    </Typography>
                  )}
                  <Box mt={2} mb={2}>
                    <Chip
                      label={getFrequencyLabel(habit.frequency)}
                      color={getFrequencyColor(habit.frequency)}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={`Streak: ${habit.currentStreak || 0} dias`}
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Iniciado em: {dayjs(habit.startDate).format('DD/MM/YYYY')}
                  </Typography>
                  {habit.completionRate !== undefined && (
                    <Typography variant="body2" color="text.secondary">
                      Taxa de conclusão: {habit.completionRate.toFixed(1)}%
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(habit)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(habit.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => handleOpenDialog()}
      >
        <AddIcon />
      </Fab>

      {/* Add/Edit Habit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingHabit ? 'Editar Hábito' : 'Novo Hábito'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Nome do Hábito"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Descrição (opcional)"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Frequência</InputLabel>
              <Select
                value={formData.frequency}
                label="Frequência"
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              >
                <MenuItem value="DAILY">Diário</MenuItem>
                <MenuItem value="WEEKLY">Semanal</MenuItem>
                <MenuItem value="MONTHLY">Mensal</MenuItem>
              </Select>
            </FormControl>
            <DatePicker
              label="Data de Início"
              value={formData.startDate}
              onChange={(newValue) => setFormData({ ...formData, startDate: newValue })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!formData.name.trim()}
          >
            {editingHabit ? 'Salvar' : 'Criar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HabitsPage;


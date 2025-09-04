import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await login();
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Falha no login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Card sx={{ width: '100%', boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box textAlign="center" mb={4}>
            <TrackChangesIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
              HabitScanner
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Sua plataforma de rastreamento de hábitos
            </Typography>
          </Box>

          <Box mb={4}>
            <Typography variant="body1" color="text.secondary" textAlign="center">
              Transforme sua vida através do poder dos hábitos. Monitore, analise e 
              desenvolva hábitos saudáveis de forma consistente.
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box textAlign="center">
            <Button
              variant="contained"
              size="large"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <GoogleIcon />}
              onClick={handleLogin}
              disabled={loading}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                textTransform: 'none',
                borderRadius: 2,
              }}
            >
              {loading ? 'Entrando...' : 'Entrar com Google'}
            </Button>
          </Box>

          <Box mt={4}>
            <Paper elevation={0} sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Recursos principais:
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                <Typography component="li" variant="body2" gutterBottom>
                  Rastreamento diário de hábitos
                </Typography>
                <Typography component="li" variant="body2" gutterBottom>
                  Estatísticas e análises detalhadas
                </Typography>
                <Typography component="li" variant="body2" gutterBottom>
                  Visualização de progresso e streaks
                </Typography>
                <Typography component="li" variant="body2">
                  Interface intuitiva e responsiva
                </Typography>
              </Box>
            </Paper>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;


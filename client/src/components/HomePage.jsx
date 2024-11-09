import React from 'react';
import {
  Box,
  Button,
  Grid2,
  Typography,
} from '@mui/material';

import ExerciseCard from './ExerciseCard.jsx';

const HomePage = ({
  user, exercises, fetchRandomExercises, switchIcon,
}) => {
  const userName = user ? user.nameFirst : '';
  const displayBadge = user ? user.displayBadge : '';

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom align="center" marginTop="2rem">
      {'Welcome to the Hyperbolic Time Chamber,'} {userName} {switchIcon(displayBadge)}
      </Typography>
      <Box display="flex" justifyContent="center" gap={2} margin="20px 0">
        <Button
          variant='contained'
          color='primary'
          onClick={() => fetchRandomExercises()}
          sx={{ display: 'block' }}
        >
          Get Some Exercises
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={() => fetchRandomExercises('/api/exercises/biceps')}
          sx={{ display: 'block' }}
        >
          Get Some Biceps Exercises
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={() => fetchRandomExercises('/api/exercises/quads')}
          sx={{ display: 'block' }}
        >
          Get Some Quads Exercises
        </Button>
      </Box>
      {exercises.length > 0 ? (
          <Grid2 container spacing={2} justifyContent="center" alignItems="stretch">
            {exercises.map((exercise, index) => (
              <Grid2 xs={12} sm={6} md={4} key={index}>
                <ExerciseCard exercise={ exercise } user={ user }/>
              </Grid2>
            ))}
          </Grid2>
      ) : (
        <Typography variant="h6">
        Get Some Exercises!
      </Typography>
      )}
    </div>
  );
};

export default HomePage;

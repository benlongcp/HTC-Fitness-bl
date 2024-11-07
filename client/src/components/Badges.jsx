import React, { useState } from 'react';
import {
  Divider,
  Box,
  FormControl,
  Select,
  MenuItem,
  Typography,
  ListItemIcon,
} from '@mui/material';
import { GiFireSilhouette, GiFireDash, GiFireFlower } from 'react-icons/gi';
import { SlFire } from 'react-icons/sl';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';

const Badges = ({ user, fetchUser }) => {
  const { badges, displayBadge } = user;
  const [selectedBadge, setSelectedBadge] = useState(displayBadge || '');

  const achievements = [
    {
      name: 'New User',
      description: 'User account is created',
      icon: 'SlFire',
      goal: 1,
      progress: 1,
    },
    {
      name: 'Fitness Master',
      description: 'User has completed 10 exercises',
      icon: 'GiFireDash',
      goal: 10,
      progress: user.completedExercises || 0,
    },
    {
      name: 'Fitness God',
      description: 'User has completed 20 exercises',
      icon: 'GiFireSilhouette',
      goal: 20,
      progress: user.completedExercises || 0,
    },
    {
      name: 'Exercise Saver',
      description: 'User has saved 10 exercises',
      icon: 'GiFireFlower',
      goal: 10,
      progress: user.saved_exercises.length || 0,
    },
  ];

  const handleBadgeChange = (event) => {
    const newBadge = event.target.value;
    setSelectedBadge(newBadge);
    axios.patch(`/api/badges/displayBadge/${newBadge}`)
      .then(() => {
        fetchUser();
      })
      .catch((err) => {
        console.error('Failed to change user\'s display badge');
      });
  };
  const calculateProgress = (progress, goal) => Math.min((progress / goal) * 100, 100);

  const switchIcon = (achievementName) => {
    switch (achievementName) {
      case 'Fitness Master':
        return (<GiFireDash />);
      case 'Fitness God':
        return (<GiFireSilhouette />);
      case 'Exercise Saver':
        return (<GiFireFlower />);
      default:
        return (<SlFire />);
    }
  };

  return (
    <Box height='auto' sx={{ overflowY: 'auto', paddingTop: '20px' }}>
      <Typography variant="h6" align="center">Display Badge</Typography>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
       {switchIcon(selectedBadge)}
      </Box>
      <Box display="flex" justifyContent="center" flexDirection='row' >
        <FormControl sx={{ display: 'flex', width: 'auto' }}>
          <Select
            id="badge-select"
            value={selectedBadge.name || ''}
            onChange={handleBadgeChange}
            displayEmpty
          >
            <MenuItem value="" disabled>Select a badge</MenuItem>
            {badges.map((badge, index) => (
              <MenuItem key={index} value={badge.name} style={{ display: 'flex', alignItems: 'center' }}>
              <ListItemIcon>
                {switchIcon(badge.name)}
              </ListItemIcon>
              {badge.name}
            </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box display='flex' paddingLeft='20px' flexDirection='row' width='100%' alignItems='top' justifyContent='center' sx={{ overflowY: 'auto' }}>
        <Box width='48%'>
          <Typography variant="h6" align="left" paddingLeft='20px' mt={4}>Earned Badges</Typography>
          <Divider width='100%' color='white' />
          <Box display="flex" flexDirection="column" >
            {badges && badges.length > 0 ? (
              badges.map((badge, index) => (
                <Box key={index} mb={1} padding='20px' textAlign="center" alignItems="left" justifyItems='left' justifyContent='left' alignContent='left'>
                  <Typography>{badge.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{badge.description}</Typography>
                  <Typography variant="caption">{new Date(badge.earnedAt).toLocaleDateString()}</Typography>
                  <Box mt={1}>
                    {switchIcon(badge.name)}
                  </Box>
                </Box>
              ))
            ) : (
              <Typography>No badges earned</Typography>
            )}
          </Box>
        </Box>

        <Divider orientation='vertical'
          color='white'
          style={{
            height: '100%',
            width: '3px',
            backgroundColor: 'white',
          }} flexItem
        />
        <Box width='48%' paddingRight='20px' sx={{ alignContent: 'center', alignItems: 'right', justifyItems: 'right' }}>
          <Box display='flex' flexDirection='column' justifyItems='right' width='100%' >
          <Typography variant="h6" align="center" mt={4}>All Badges</Typography>
            <Divider
              display='flex'
              width='100%'
              color='white'
            />
              {achievements.map((achievement, index) => (
                <Box key={index} mb={1} padding='20px' textAlign="center" >
                <Typography>{achievement.name}</Typography>
                <Typography variant="body2" color="textSecondary">{achievement.description}</Typography>
                {
                  switchIcon(achievement.name)
                }
                <Box mt={2}>
                <LinearProgress
                  variant="determinate"
                  value={calculateProgress(achievement.progress, achievement.goal)}
                  sx={{
                    backgroundColor: 'grey.300',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: calculateProgress(achievement.progress, achievement.goal) === 100 ? '#4CAF50' : 'primary.main',
                    },
                  }}
                />
                <Typography variant="caption">{`${achievement.progress}/${achievement.goal} completed`}</Typography>
              </Box>
              </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Badges;

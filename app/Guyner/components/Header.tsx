import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './BoardStyles';

interface HeaderProps {
  message: string;
  currentDifficulty: string;
  highestScore: number;
  onReset: () => void;
  onCycleDifficulty: () => void;
  onSort: () => void;
}

const Header: React.FC<HeaderProps> = ({
  message,
  currentDifficulty,
  highestScore,
  onReset,
  onCycleDifficulty,
  onSort,
}) => {
  const drawButton = (label: string, onPress: () => void, style: any) => {
    return (
      <TouchableOpacity style={style} onPress={onPress}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        {drawButton(`Difficulty: ${currentDifficulty}`, onCycleDifficulty, styles.difficultyButton)}
        <Text style={styles.scoreText}>{message}</Text>
        {drawButton('Reset', onReset, styles.resetButton)}
      </View>
      <View style={styles.headerRow}>
        {drawButton('Sort', onSort, styles.sortButton)}
        <Text style={styles.scoreText}>{message}</Text>
        <Text style={styles.highestScoreText}>High Score: {highestScore}</Text>
      </View>
    </View>
  );
};

export default Header;

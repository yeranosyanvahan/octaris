import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import State from './State';
import styles from './BoardStyles';

const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFA500', '#800080'];
const textColors = ['#000000', '#FFFFFF', '#FFFFFF', '#000000', '#000000', '#FFFFFF'];

interface BoardProps {
  state: State;
  message: string;
  selectedColor: number;
  currentDifficulty: string;
  highestScore: number;
  mode: string;
  onCellClick: (index: number, color: number) => void;
  onPaletteClick: (color: number) => void;
  onReset: () => void;
  onCycleDifficulty: () => void;
  onSort: () => void;
  boardSize?: [number, number]; // New prop for board size (rows, columns)
}

const Board: React.FC<BoardProps> = (props) => {
  const insets = useSafeAreaInsets();
  const { width, height } = Dimensions.get('window');
  const boardSize = props.boardSize || [3, 5];
  const [rows, columns] = boardSize;
  const headerHeight = 150; // Directly setting the header height
  const paletteHeight = 60;
  const cellWidth = width / columns;
  const cellHeight = (height - headerHeight - paletteHeight - insets.top - insets.bottom) / rows;

  const boardColors = colors.slice(0, props.state.ncolors);
  const boardTextColors = textColors;

  const renderItem = ({ item, index }) => {
    const color = item === props.state.highlightedColor ? '#FFFFFF' : boardColors[item];
    const textColor = color === '#FFFFFF' ? '#000000' : boardTextColors[item];
    return (
      <TouchableOpacity
        key={index}
        style={[styles.cell, { backgroundColor: color, width: cellWidth, height: cellHeight }]}
        onPress={() => props.onCellClick(index, props.selectedColor)}
      >
        <Text style={[styles.cellText, { color: textColor }]}>{props.state.clicks[index]}</Text>
      </TouchableOpacity>
    );
  };

  const drawPalette = (state: State, selectedColor: number | null) => {
    const colorCounts = state.get_palette_color_count();
    return (
      <View style={[styles.paletteContainer, { height: paletteHeight }]}>
        {boardColors.map((color, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.paletteColor,
              {
                backgroundColor: i === state.highlightedColor ? '#FFFFFF' : boardColors[i],
                borderWidth: selectedColor === i ? 3 : 0,
                borderColor: selectedColor === i ? '#000' : 'transparent',
              },
            ]}
            onPress={() => props.onPaletteClick(i)}
          >
            <Text style={styles.paletteText}>{colorCounts[i]}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const drawButton = (label: string, onPress: () => void, style: any) => (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  const {
    state,
    message,
    selectedColor,
    currentDifficulty,
    highestScore,
    mode,
    onReset,
    onCycleDifficulty,
    onSort,
  } = props;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top, height: headerHeight }]}>
        <View style={styles.headerRow}>
          {drawButton(`Difficulty: ${currentDifficulty}`, onCycleDifficulty, styles.difficultyButton)}
          <Text style={styles.scoreText}>{message}</Text>
          <Text style={styles.highestScoreText}>High Score: {highestScore}</Text>
        </View>
        <View style={styles.headerRow}>
          {drawButton('Sort', onSort, styles.sortButton)}
          <Text style={styles.modeText}>Mode: {mode}</Text>
          {drawButton('Reset', onReset, styles.resetButton)}
        </View>
      </View>
      <View style={[styles.boardContainer, { height: height - headerHeight - paletteHeight - insets.top - insets.bottom }]}>
        <FlatList
          data={state.cells}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={columns}
          columnWrapperStyle={{ justifyContent: 'center' }}
        />
      </View>
      {drawPalette(state, selectedColor)}
    </SafeAreaView>
  );
};

export default Board;

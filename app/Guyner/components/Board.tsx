import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
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
  onCellClick: (index: number, color: number) => void;
  onPaletteClick: (color: number) => void;
  onReset: () => void;
  onCycleDifficulty: () => void;
  onSort: () => void;
}

class Board extends React.Component<BoardProps> {
  width: number;
  height: number;
  headerHeight: number;
  paletteHeight: number;
  colors: string[];
  textColors: string[];

  constructor(props: BoardProps) {
    super(props);
    const { width, height } = Dimensions.get('window');
    this.width = width;
    this.height = height;
    this.headerHeight = styles.headerHeight.height;
    this.paletteHeight = 60;
    this.colors = colors.slice(0, this.props.state.ncolors);
    this.textColors = textColors;
  }

  drawBoard(state: State) {
    const cellSize = Math.min(this.width, this.height - this.headerHeight - this.paletteHeight) / Math.sqrt(state.n);
    return state.cells.map((cell, index) => {
      const x = index % Math.sqrt(state.n);
      const y = Math.floor(index / Math.sqrt(state.n));
      const color = cell === state.highlightedColor ? '#FFFFFF' : this.colors[cell];
      const textColor = color === '#FFFFFF' ? '#000000' : this.textColors[cell];
      return (
        <TouchableOpacity
          key={index}
          style={[styles.cell, { backgroundColor: color, width: cellSize, height: cellSize }]}
          onPress={() => this.props.onCellClick(index, this.props.selectedColor)}
        >
          <Text style={[styles.cellText, { color: textColor }]}>{state.clicks[index]}</Text>
        </TouchableOpacity>
      );
    });
  }

  drawScore(message: string) {
    return (
      <View style={[styles.scoreContainer, { top: this.headerHeight / 2 - 10 }]}>
        <Text style={styles.scoreText}>{message}</Text>
      </View>
    );
  }

  drawPalette(state: State, selectedColor: number | null) {
    const colorCounts = state.get_palette_color_count();
    return (
      <View style={[styles.paletteContainer, { bottom: 0 }]}>
        {this.colors.map((color, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.paletteColor,
              {
                backgroundColor: i === state.highlightedColor ? '#FFFFFF' : this.colors[i],
                borderWidth: selectedColor === i ? 3 : 0,
                borderColor: selectedColor === i ? '#000' : 'transparent',
              },
            ]}
            onPress={() => this.props.onPaletteClick(i)}
          >
            <Text style={styles.paletteText}>{colorCounts[i]}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  drawButton(label: string, onPress: () => void, style: any) {
    return (
      <TouchableOpacity style={style} onPress={onPress}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { state, message, selectedColor, currentDifficulty, highestScore, onReset, onCycleDifficulty, onSort } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.drawScore(message)}
        <View style={styles.buttonsContainer}>
          {this.drawButton(`Difficulty: ${currentDifficulty}`, onCycleDifficulty, styles.difficultyButton)}
          {this.drawButton('Sort', onSort, styles.sortButton)}
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.highestScoreText}>High Score: {highestScore}</Text>
          {this.drawButton('Reset', onReset, styles.resetButton)}
        </View>
        <View style={styles.boardContainer}>{this.drawBoard(state)}</View>
        {this.drawPalette(state, selectedColor)}
      </ScrollView>
    );
  }
}

export default Board;

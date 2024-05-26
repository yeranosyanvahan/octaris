import React from 'react';
import { View, StyleSheet } from 'react-native';
import Board from './Board';
import State from './State';

class GameScreen extends React.Component {
  state: any;
  boardRef: React.RefObject<Board>;

  constructor(props: any) {
    super(props);
    this.state = {
      state: new State(),
      selectedColor: 0,
      message: 'Score: 0',
      currentDifficulty: 'easy',
      highestScore: 0,
    };
    this.boardRef = React.createRef();
  }

  handleCellClick = (index: number, color: number) => {
    const { state, selectedColor } = this.state;
    state.click(index, color);
    this.setState({
      state,
      message: state.is_game_over() ? `Game Over! Your score is: ${state.score}` : `Score: ${state.score}`,
    });
  };

  handlePaletteClick = (color: number) => {
    this.setState({ selectedColor: color });
  };

  handleReset = () => {
    const { state } = this.state;
    state.reset();
    this.setState({ state, message: 'Score: 0' });
  };

  handleCycleDifficulty = () => {
    // Logic to cycle difficulty
  };

  handleSort = () => {
    const { state } = this.state;
    state.sort();
    this.setState({ state });
  };

  render() {
    const { state, selectedColor, message, currentDifficulty, highestScore } = this.state;
    return (
      <View style={styles.container}>
        <Board
          ref={this.boardRef}
          state={state}
          message={message}
          selectedColor={selectedColor}
          currentDifficulty={currentDifficulty}
          highestScore={highestScore}
          onCellClick={this.handleCellClick}
          onPaletteClick={this.handlePaletteClick}
          onReset={this.handleReset}
          onCycleDifficulty={this.handleCycleDifficulty}
          onSort={this.handleSort}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameScreen;

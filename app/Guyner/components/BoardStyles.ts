import { StyleSheet } from 'react-native';

const buttonHeight = 45;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  boardContainer: {
    width: '100%',
    flex: 1,
    marginBottom: 60, // to ensure the board does not overflow and touches the palette
  },
  paletteContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  cellText: {
    fontSize: 65,
  },
  scoreText: {
    fontSize: 24,
    color: '#FFF',
    textAlign: 'center',
    height: buttonHeight,
    textAlignVertical: 'center',
  },
  paletteColor: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  paletteText: {
    fontSize: 30,
    color: '#000',
  },
  resetButton: {
    margin: 10,
    backgroundColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 80,
    height: buttonHeight,
  },
  difficultyButton: {
    margin: 10,
    backgroundColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 150,
    height: buttonHeight,
  },
  sortButton: {
    margin: 10,
    backgroundColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 80,
    height: buttonHeight,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    height: buttonHeight,
    textAlignVertical: 'center',
  },
  highestScoreText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    height: buttonHeight,
    textAlignVertical: 'center',
  },
  modeText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    height: buttonHeight,
    textAlignVertical: 'center',
  },
  headerHeight: {
    height: 150,
  },
});

export default styles;

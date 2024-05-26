import { StyleSheet } from 'react-native';

const buttonHeight = 30;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  boardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  paletteContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginVertical: 10,
    position: 'absolute',
    width: '100%',
    height: 60,
    bottom: 0,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  cellText: {
    fontSize: 20,
  },
  scoreContainer: {
    position: 'absolute',
    alignSelf: 'center',
  },
  scoreText: {
    fontSize: 24,
    color: '#FFF',
  },
  paletteColor: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 40,
  },
  paletteText: {
    fontSize: 16,
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
  },
  highestScoreText: {
    fontSize: 16,
    color: '#FFF',
  },
  headerHeight: {
    height: 50,
  },
});

export default styles;

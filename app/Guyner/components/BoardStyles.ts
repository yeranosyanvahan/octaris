import { StyleSheet } from 'react-native';

const buttonHeight = 45;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 100, // Adjust the header height here as needed
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  boardScrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paletteContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginVertical: 10,
    width: '100%',
    height: 60,
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
    fontSize: 20,
  },
  scoreText: {
    fontSize: 24,
    color: '#FFF',
    textAlign: 'center',
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
    textAlign: 'center',
  },
  modeText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
  headerHeight: {
    height: 100, // Ensure this matches the header height above
  },
});

export default styles;

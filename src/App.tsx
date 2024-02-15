import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';
import Sound from 'react-native-sound';

function App(): React.JSX.Element {
  //To keep track of whether it is cross or zero
  const [isCross, setIsCross] = useState<boolean>(false);
  //To keep track of match winner or draw
  const [winner, setWinner] = useState<string>('');
  //To keep track of match input data
  const [gameData, setGameData] = useState(new Array(9).fill('empty', 0, 9));

  //Sound effect for O
  const playSoundZero = () => {
    var sound = new Sound('zero_sound.wav', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      // console.log('duration in seconds: ' + sound.getDuration() + 'number of channels: ' + sound.getNumberOfChannels());

      // Play the sound with an onEnd callback
      sound.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  };

  //Sound effect for X
  const playSoundCross = () => {
    var sound = new Sound('cross_sound.wav', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      // console.log('duration in seconds: ' + sound.getDuration() + 'number of channels: ' + sound.getNumberOfChannels());

      // Play the sound with an onEnd callback
      sound.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  };

  //Sound effect on victory
  const playSoundVictory = () => {
    var whoosh = new Sound('victory.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

      // Play the sound with an onEnd callback
      whoosh.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  };

  //Game data reset button
  const resetGame = () => {
    setIsCross(false);
    setWinner('');
    setGameData(new Array(9).fill('empty', 0, 9));
  };

  //Logic which checks for match winner or match draw
  const checkIsWinner = () => {
    if (
      gameData[0] === gameData[1] &&
      gameData[0] === gameData[2] &&
      gameData[0] !== 'empty'
    ) {
      setWinner(`${gameData[0]} won the game !!`);
      playSoundVictory();
    } else if (
      gameData[3] === gameData[4] &&
      gameData[3] === gameData[5] &&
      gameData[3] !== 'empty'
    ) {
      setWinner(`${gameData[3]} won the game !!`);
      playSoundVictory();
    } else if (
      gameData[6] === gameData[7] &&
      gameData[6] === gameData[8] &&
      gameData[6] !== 'empty'
    ) {
      setWinner(`${gameData[6]} won the game !!`);
      playSoundVictory();
    } else if (
      gameData[0] === gameData[3] &&
      gameData[0] === gameData[6] &&
      gameData[0] !== 'empty'
    ) {
      setWinner(`${gameData[0]} won the game !!`);
      playSoundVictory();
    } else if (
      gameData[1] === gameData[4] &&
      gameData[1] === gameData[7] &&
      gameData[1] !== 'empty'
    ) {
      setWinner(`${gameData[1]} won the game !!`);
      playSoundVictory();
    } else if (
      gameData[2] === gameData[5] &&
      gameData[2] === gameData[8] &&
      gameData[2] !== 'empty'
    ) {
      setWinner(`${gameData[2]} won the game !!`);
      playSoundVictory();
    } else if (
      gameData[0] === gameData[4] &&
      gameData[0] === gameData[8] &&
      gameData[0] !== 'empty'
    ) {
      setWinner(`${gameData[0]} won the game !!`);
      playSoundVictory();
    } else if (
      gameData[2] === gameData[4] &&
      gameData[2] === gameData[6] &&
      gameData[2] !== 'empty'
    ) {
      setWinner(`${gameData[2]} won the game !!`);
    } else if (!gameData.includes('empty', 0)) {
      setWinner("It's a draw game !!");
    }
  };

  //Logic to take response inputs from the user
  const onInputData = (itemNumber: number) => {
    if (winner) {
      return Snackbar.show({
        text: winner,
        backgroundColor: '#ffffff',
        textColor: '#000000',
      });
    }

    if (gameData[itemNumber] === 'empty') {
      gameData[itemNumber] = isCross ? 'cross' : 'circle';
      isCross ? playSoundCross() : playSoundZero();
      // playSoundZero();
      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'The position is already filled !!',
        backgroundColor: '#ff6348',
        textColor: '#000000',
      });
    }

    checkIsWinner();
  };
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#353b48" />
      <Text style={styles.headerText}>TIC TAC TOE</Text>
      {/* TOP CONTAINER */}
      {winner ? (
        <View style={[styles.topContainer, styles.topContainerResult]}>
          <Text style={[styles.tcText, styles.resultColor]}>{winner}</Text>
        </View>
      ) : (
        <View
          style={[
            styles.topContainer,
            isCross ? styles.playerX : styles.playerO,
          ]}>
          <Text
            style={[styles.tcText, isCross ? styles.playerX : styles.playerO]}>
            It is Player {isCross ? 'X' : 'O'}'s Turn
          </Text>
        </View>
      )}

      {/* GAME GIRD CONTAINER */}
      <FlatList
        numColumns={3}
        data={gameData}
        style={styles.middleContainer}
        renderItem={({item, index}) => (
          <Pressable
            key={index}
            style={[
              styles.box,
              index === 0 && {borderLeftWidth: 0, borderTopWidth: 0},
              index === 1 && {borderTopWidth: 0},
              index === 2 && {borderRightWidth: 0, borderTopWidth: 0},
              index === 3 && {borderLeftWidth: 0},
              index === 5 && {borderRightWidth: 0},
              index === 6 && {borderLeftWidth: 0, borderBottomWidth: 0},
              index === 7 && {borderBottomWidth: 0},
              index === 8 && {borderRightWidth: 0, borderBottomWidth: 0},
            ]}
            onPress={() => onInputData(index)}>
            <Icons name={item} />
          </Pressable>
        )}
      />

      {/* RESET BUTTON CONTAINER */}
      <Pressable style={styles.reloadBtn} onPress={resetGame}>
        <Text style={styles.reloadText}>
          {winner ? 'Start a new game' : 'Reload the game'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: '#353b48',
    // justifyContent: 'space-around',
  },
  headerText: {
    fontSize: 27,
    textAlign: 'center',
    marginTop: 9,
    marginBottom: 48,
  },
  topContainer: {
    marginHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 15,
    borderWidth: 3,
  },
  topContainerResult: {
    borderColor: '#1289A7',
  },
  // topContainerNormal: {
  //   backgroundColor: '#3c6382',
  // },
  playerO: {
    borderColor: '#A3CB38',
    color: '#A3CB38',
  },
  playerX: {
    borderColor: '#ff4757',
    color: '#ff4757',
  },
  tcText: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
  },
  resultColor: {
    color: '#1289A7',
  },
  middleContainer: {
    alignSelf: 'center',
    marginVertical: 28,
  },
  box: {
    paddingHorizontal: 35,
    paddingVertical: 27,
    borderWidth: 1,
    margin: 5,
  },
  reloadBtn: {
    backgroundColor: '#57606f',
    marginHorizontal: 65,
    paddingVertical: 15,
    borderRadius: 15,
    top: '-32%',
  },
  reloadText: {
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default App;

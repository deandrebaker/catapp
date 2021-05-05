import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Axios from 'axios';

export default function App() {
  const [facts, setFacts] = useState([]);
  const [factIndex, setFactIndex] = useState(-1);

  useEffect(() => {
    (async () => {
      let response = await Axios.get('https://cat-fact.herokuapp.com/facts');
      setFacts(response.data.map(fact => fact.text));
      setFactIndex(0);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {
        factIndex >= 0 ? (
          <>
            <View style={styles.textContainer}>
              <Text>
                {facts[factIndex]}
              </Text>
            </View>
            <Button title="Next" style={styles.button} onPress={() => {
              factIndex < facts.length - 1 ? setFactIndex(factIndex + 1) : setFactIndex(0);
            }} />
          </>
        ) : (
          <Text>Getting Facts...</Text>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    backgroundColor: '#0f0',
    marginBottom: 30
  },
  button: {
    backgroundColor: '#00f'
  }
});

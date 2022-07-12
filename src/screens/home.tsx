import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { ScreenNavigationProps } from '../routes';
import { items } from '../trainData/avaliableStations.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingBottom: 24,
  },
});

type HomeScreenProps = ScreenNavigationProps<'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Home Screen</Text>
    <Button mode="contained" onPress={() => navigation.navigate('Details')}>
      Go to details
    </Button>
  </View>
);

export default HomeScreen;

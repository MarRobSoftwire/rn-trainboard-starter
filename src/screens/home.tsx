import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { ScreenNavigationProps } from '../routes';

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
      Find a train time
    </Button>
  </View>
);

export default HomeScreen;

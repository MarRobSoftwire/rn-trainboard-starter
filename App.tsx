import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import TopBar from './src/components/topBar';
import theme from './src/theme';
import { RootStackParamList } from './src/routes';
import DetailsScreen from './src/screens/details';
import HomeScreen from './src/screens/home';
import 'react-native-gesture-handler';
import { config } from './src/config';
import JourneyScreen from './src/screens/journey';

// This ensures that a valid dotenv config is pulled before allowing the app to run,
// helping to avoid unnoticed runtime crashes due to invalid config.
config;

const Stack = createStackNavigator<RootStackParamList>();

enum Routes {
  HOME = 'Home',
  DETAILS = 'Details',
  JOURNEY = 'Journey',
}

const App: React.FC = () => (
  <PaperProvider theme={theme}>
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName={Routes.HOME}
        screenOptions={{
          header: (props) => <TopBar {...props} />,
        }}
      >
        <Stack.Screen name={Routes.HOME} component={HomeScreen}/>
        <Stack.Screen name={Routes.DETAILS} component={DetailsScreen} />
        <Stack.Screen name={Routes.JOURNEY} component={JourneyScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  </PaperProvider>
);

export default App;

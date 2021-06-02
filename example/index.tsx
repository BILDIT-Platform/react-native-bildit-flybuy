import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

import Reactotron from 'reactotron-react-native';

Reactotron.configure().useReactNative().connect();

console.tron = Reactotron;

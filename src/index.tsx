import { NativeModules } from 'react-native';

type FlybuyType = {
  multiply(a: number, b: number): Promise<number>;
};

const { Flybuy } = NativeModules;

export default Flybuy as FlybuyType;

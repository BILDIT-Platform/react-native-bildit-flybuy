import { Reactotron } from "reactotron-core-client";
import { ReactotronReactNative } from "../reactotron-react-native";
export interface AsyncStorageOptions {
    ignore?: string[];
}
declare const _default: <ReactotronSubtype = ReactotronReactNative>(options: AsyncStorageOptions) => (reactotron: Reactotron<ReactotronSubtype> & ReactotronReactNative) => {
    features: {
        trackAsyncStorage: () => void;
        untrackAsyncStorage: () => void;
    };
};
export default _default;

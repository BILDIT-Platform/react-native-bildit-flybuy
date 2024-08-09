/// <reference types="react" />
import { Reactotron } from "reactotron-core-client";
import asyncStorage, { AsyncStorageOptions } from "./plugins/asyncStorage";
import overlay from "./plugins/overlay";
import openInEditor, { OpenInEditorOptions } from "./plugins/openInEditor";
import trackGlobalErrors, { TrackGlobalErrorsOptions } from "./plugins/trackGlobalErrors";
import networking, { NetworkingOptions } from "./plugins/networking";
import storybook from "./plugins/storybook";
import devTools from "./plugins/devTools";
export interface UseReactNativeOptions {
    errors?: TrackGlobalErrorsOptions | boolean;
    editor?: OpenInEditorOptions | boolean;
    overlay?: boolean;
    asyncStorage?: AsyncStorageOptions | boolean;
    networking?: NetworkingOptions | boolean;
    storybook?: boolean;
    devTools?: boolean;
}
export interface ReactotronReactNative {
    useReactNative: (options?: UseReactNativeOptions) => Reactotron<ReactotronReactNative> & ReactotronReactNative;
    overlay: (App: React.ReactNode) => void;
    storybookSwitcher: (App: React.ReactNode) => (Root: React.ReactNode) => React.ReactNode;
    asyncStorageHandler?: any;
    setAsyncStorageHandler?: (asyncStorage: any) => Reactotron<ReactotronReactNative> & ReactotronReactNative;
}
declare const reactotron: Reactotron<ReactotronReactNative> & ReactotronReactNative;
export { asyncStorage, trackGlobalErrors, openInEditor, overlay, networking, storybook, devTools };
export default reactotron;

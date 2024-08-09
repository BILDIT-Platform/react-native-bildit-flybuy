interface AppDimensions {
    screenWidth?: number;
    screenHeight?: number;
    screenScale?: number;
    screenFontScale?: number;
    windowWidth?: number;
    windowHeight?: number;
    windowScale?: number;
    windowFontScale?: number;
}
export declare function getReactNativeDimensionsWithDimensions(screen: any, win: any): AppDimensions | null;
export default function getReactNativeDimensions(): AppDimensions | null;
export {};

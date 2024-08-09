/// <reference types="react" />
declare const _default: () => () => {
    onCommand: (command: any) => void;
    features: {
        storybookSwitcher: (storybookUi: any) => (WrappedComponent: any) => (props: any) => JSX.Element;
    };
};
/**
 * A plugin which provides .storybookSwitcher() on Reactotron.
 */
export default _default;

/// <reference types="react" />
declare const _default: () => () => {
    /**
     * Fires when any Reactotron message arrives.
     *
     * @param {object} command The Reactotron command object.
     */
    onCommand: (command: any) => void;
    features: {
        overlay: (WrappedComponent: any) => (props: any) => JSX.Element;
    };
};
export default _default;

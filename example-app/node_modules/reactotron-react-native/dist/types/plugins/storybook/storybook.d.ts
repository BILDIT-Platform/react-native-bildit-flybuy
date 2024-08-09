import { Component } from "react";
interface Props {
    storybookUi: any;
    emitter: any;
}
interface State {
    showStorybook: boolean;
}
declare class StorybookSwitcher extends Component<Props, State> {
    /**
     * Creates an instance of FullScreenOverlay.
     *
     * @param {any} props
     * @param {Object} props.emitter An event emitter.
     *
     * @memberOf FullScreenOverlay
     */
    constructor(props: any);
    /**
     * Draw.
     */
    render(): JSX.Element;
}
export default StorybookSwitcher;

export interface OpenInEditorOptions {
    url?: string;
}
declare const _default: (pluginConfig?: OpenInEditorOptions) => () => {
    onCommand: (command: any) => void;
};
export default _default;

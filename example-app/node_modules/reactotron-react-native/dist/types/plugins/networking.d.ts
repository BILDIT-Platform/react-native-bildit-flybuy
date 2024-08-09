import { Reactotron, ReactotronCore } from 'reactotron-core-client';
export interface NetworkingOptions {
    ignoreContentTypes?: RegExp;
    ignoreUrls?: RegExp;
}
declare const _default: <ReactotronSubtype = ReactotronCore>(pluginConfig?: NetworkingOptions) => (reactotron: Reactotron<ReactotronSubtype> & ReactotronSubtype) => {};
export default _default;

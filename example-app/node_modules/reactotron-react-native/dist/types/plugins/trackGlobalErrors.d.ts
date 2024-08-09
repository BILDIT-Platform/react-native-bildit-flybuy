import { Reactotron, ReactotronCore } from "reactotron-core-client";
export interface TrackGlobalErrorsOptions {
    veto?: (frame: any) => boolean;
}
declare const _default: <ReactotronSubtype = ReactotronCore>(options: TrackGlobalErrorsOptions) => (reactotron: Reactotron<ReactotronSubtype> & ReactotronSubtype) => {
    features: {
        reportError: (error: any) => void;
        trackGlobalErrors: () => void;
        untrackGlobalErrors: () => void;
    };
};
export default _default;

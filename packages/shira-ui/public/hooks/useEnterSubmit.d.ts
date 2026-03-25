type Options = {
    when: boolean;
    onEnter: () => void;
    target?: Window | Document | HTMLElement | null;
    preventDefault?: boolean;
    stopPropagation?: boolean;
    ignoreWhenTextarea?: boolean;
    ignoreWithModifier?: boolean;
};
export declare function useEnterSubmit({ when, onEnter, target, preventDefault, stopPropagation, ignoreWhenTextarea, ignoreWithModifier, }: Options): void;
export {};

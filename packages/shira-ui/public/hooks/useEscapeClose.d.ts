type UseEscapeCloseOptions = {
    when: boolean;
    onClose: () => void;
    target?: Document | HTMLElement | Window | null;
    stopPropagation?: boolean;
};
export declare function useEscapeClose({ when, onClose, target, stopPropagation, }: UseEscapeCloseOptions): void;
export {};

export declare enum AttachmentType {
    video = "video",
    audio = "audio",
    image = "image",
    document = "document",
    other = "other"
}
export interface AttachmentProps {
    name: string;
    type: AttachmentType;
}
export declare const Attachment: ({ name, type, }: AttachmentProps) => import("react/jsx-runtime").JSX.Element;

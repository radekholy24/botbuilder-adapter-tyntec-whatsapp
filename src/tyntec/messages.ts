export interface ITyntecBaseMedia {
    url: string;
}

export interface ITyntecMediaMoContent {
    contentType: "media";
    media: ITyntecMoMedia;
}

export interface ITyntecMoMedia {
    caption?: string;
    mediaId?: string;
    type: "audio" | "document" | "image" | "sticker" | "video";
    url: string;
}

export interface ITyntecMoContext {
    isForwarded?: boolean;
    isFrequentlyForwarded?: boolean;
    messageId?: string;
}

export interface ITyntecMoMessage {
    channel: string;
    content: ITyntecMediaMoContent | ITyntecTextMoContent | ITyntecWhatsAppLocationContent;
    context?: ITyntecMoContext;
    event: "MoMessage";
    from: string;
    groupId?: string;
    messageId: string;
    timestamp?: string;
    to?: string;
    whatsapp?: ITyntecWhatsapp;
}

export interface ITyntecTextMoContent {
    contentType: "text";
    text: string;
}

export interface ITyntecWhatsapp {
    senderName?: string;
}

export interface ITyntecWhatsAppAudioContent {
    contentType: "audio";
    audio: ITyntecBaseMedia;
}

export interface ITyntecWhatsAppDocument extends ITyntecBaseMedia {
    caption?: string;
    filename?: string;
}

export interface ITyntecWhatsAppDocumentContent {
    contentType: "document";
    document: ITyntecWhatsAppDocument;
}

export interface ITyntecWhatsAppMessageRequest {
    from: string;
    to: string;
    channel: "whatsapp";
    content: ITyntecWhatsAppAudioContent | ITyntecWhatsAppDocumentContent | ITyntecWhatsAppImageContent | ITyntecWhatsAppStickerContent | ITyntecWhatsAppTemplateContent | ITyntecWhatsAppTextContent | ITyntecWhatsAppVideoContent;
}

export interface ITyntecWhatsAppImage extends ITyntecBaseMedia {
    caption?: string;
}

export interface ITyntecWhatsAppImageContent {
    contentType: "image";
    image: ITyntecWhatsAppImage;
}

export interface ITyntecWhatsAppLocation {
    address?: string;
    latitude: number;
    longitude: number;
    name?: string;
}

export interface ITyntecWhatsAppLocationContent {
    contentType: "location",
    location: ITyntecWhatsAppLocation
}

export interface ITyntecWhatsAppStickerContent {
    contentType: "sticker";
    sticker: ITyntecBaseMedia;
}

export interface ITyntecWhatsAppTemplate {
    templateId: string;
    templateLanguage: string;
    components: ITyntecWhatsAppTemplateComponents;
}

export interface ITyntecWhatsAppTemplateContent {
    contentType: "template";
    template: ITyntecWhatsAppTemplate;
}

export interface ITyntecWhatsAppTemplateTextBodyComponent {
    type: "text";
    text: string;
}

export interface ITyntecWhatsAppTemplateComponents {
    body: ITyntecWhatsAppTemplateTextBodyComponent[];
}

export interface ITyntecWhatsAppTextContent {
    contentType: "text";
    text: string;
}

export interface ITyntecWhatsAppVideo extends ITyntecBaseMedia {
    caption?: string;
}

export interface ITyntecWhatsAppVideoContent {
    contentType: "video";
    video: ITyntecWhatsAppVideo;
}
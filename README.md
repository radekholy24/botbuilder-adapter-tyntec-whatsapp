# Tyntec WhatsApp Adapter

A [Microsoft Bot Framework](https://www.botframework.com/) adapter for handling
connectivity with the tyntec WhatsApp API.

It is a TypeScript library that solves a problem of how to connect bots to the tyntec
WhatsApp API, by providing means for processing incoming WhatsApp messages and sending
outgoing WhatsApp messages.

This project is distributed under the MIT license.


## Installation

```shell
$ npm install botbuilder-adapter-tyntec-whatsapp
```


## Documentation

At the moment, the API of the library consists only of a `TyntecWhatsAppAdapter` class.


### TyntecWhatsAppAdapter

This class implements a Microsoft Bot Framework adapter for handling connectivity with
the tyntec WhatsApp API.

Its **constructor** accepts an object with an `AxiosInstance` property `axiosInstance`, a
string property `tyntecApikey` (your tyntec API key), and optionally a number property
`maxBodySize` (the maximum size of request bodies accepted in
`TyntecWhatsAppAdapter.processActivity`; defaults to 1024).

```typescript
import axios from "axios";
import { TyntecWhatsAppAdapter } from 'botbuilder-adapter-tyntec-whatsapp';

const axiosInstance = axios.create();

const adapter = new TyntecWhatsAppAdapter({
    axiosInstance,
    tyntecApikey: "API_KEY"
});
```

At the moment, `TyntecWhatsAppAdapter` supports only:

* a public `processActivity` method
* a public `sendActivities` method
* a protected `parseTyntecWhatsAppMessageEvent` method


#### processActivity(WebRequest, WebResponse, (context: TurnContext) => Promise<any>)

This method parses the given `WebRequest` containing a tyntec WhatsApp `MoMessage`,
creates a turn context, runs the middleware pipeline and sets the given `WebResponse`.

It is intended to be called from a function handler that services a web server route.
Typically, this route is registered as a tyntec inbound message webhook.

```typescript
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        await myBot.run(context);
    });
});
```

At the moment, `processActivity` supports only:

* `APIEvent.event`: `MoMessage` events
* `MoMessage.content.contentType`: `text` and `media` payload kinds
* `MoMessage.content.media.type`: `audio`, `document`, `image`, `sticker` and `video` media kinds
* `MoMessage.to`: defined receiving accounts


#### sendActivities(TurnContext, Partial<Activity>[])

Asynchronously sends a set of outgoing activities as WhatsApp messages.

It is intended to be called from the turn context and not directly from a bot.

```typescript
export class EchoBot extends ActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            const activity = {
                type: ActivityTypes.Message,
                channelId: "whatsapp",
                from: { id: "+1233423454" },
                conversation: { id: context.activity.from.id },
                channelData: { contentType: "text" },
                text: "A simple text message"
            };
            await context.sendActivity(activity as Activity);
            await next();
        });
    }
}
```

At the moment, `sendActivities` supports only:

* `Activity.attachmentLayout`: undefined attachment layouts
* `Activity.attachments`: at most one attachment
* `Activity.attachments.content`: undefined attachment contents
* `Activity.attachments.contentUrl`: defined attachment content URLs
* `Activity.attachments.thumbnailUrl`: undefined attachment thumbnail URLs
* `Activity.channelData.contentType`: `audio`, `document`, `image`, `sticker`, `template`, `text` and `video` message content types
* `Activity.channelId`: `whatsapp` channel IDs
* `Activity.deliveryMode`: undefined delivery modes
* `Activity.entities`: undefined entities
* `Activity.expiration`: undefined expirations
* `Activity.from`: defined `from` fields
* `Activity.importance`: undefined importance
* `Activity.inputHint`: undefined input hints
* `Activity.listenFor`: undefined listen for
* `Activity.locale`: undefined locale
* `Activity.replyToId`: undefined reply to IDs
* `Activity.semanticAction`: undefined semantic actions
* `Activity.speak`: undefined speaks
* `Activity.suggestedActions`: undefined suggested actions
* `Activity.textFormat`: undefined text formats
* `Activity.type`: `message` types

```typescript
// Text message
const activity = {
    type: ActivityTypes.Message,
    channelId: "whatsapp",
    from: { id: "+1233423454" },
    conversation: { id: context.activity.from.id },
    channelData: { contentType: "text" },
    text: "A simple text message"
};

// Image message
const activity = {
    type: ActivityTypes.Message,
    channelId: "whatsapp",
    from: { id: "+1233423454" },
    conversation: { id: context.activity.from.id },
    channelData: { contentType: "image" },
    text: "An image caption",
    attachments: [
        {
            contentType: "image/png",
            contentUrl: "https://example.com/image.png"
        }
    ]
};

// Audio message
const activity = {
    type: ActivityTypes.Message,
    channelId: "whatsapp",
    from: { id: "+1233423454" },
    conversation: { id: context.activity.from.id },
    channelData: { contentType: "audio" },
    attachments: [
        {
            contentType: "audio/ac3",
            contentUrl: "https://example.com/audio.ac3"
        }
    ]
};

// Video message
const activity = {
    type: ActivityTypes.Message,
    channelId: "whatsapp",
    from: { id: "+1233423454" },
    conversation: { id: context.activity.from.id },
    channelData: { contentType: "video" },
    text: "A video caption",
    attachments: [
        {
            contentType: "video/mp4",
            contentUrl: "https://example.com/video.mp4"
        }
    ]
};

// Document message
const activity = {
    type: ActivityTypes.Message,
    channelId: "whatsapp",
    from: { id: "+1233423454" },
    conversation: { id: context.activity.from.id },
    channelData: { contentType: "document" },
    text: "A document caption",
    attachments: [
        {
            contentType: "application/pdf",
            contentUrl: "https://example.com/document.pdf",
            name: "document.pdf"
        }
    ]
};

// Sticker message
const activity = {
    type: ActivityTypes.Message,
    channelId: "whatsapp",
    from: { id: "+1233423454" },
    conversation: { id: context.activity.from.id },
    channelData: { contentType: "sticker" },
    attachments: [
        {
            contentType: "image/webp",
            contentUrl: "https://example.com/sticker.webp"
        }
    ]
};

// Template message
const activity = {
    type: ActivityTypes.Message,
    channelId: "whatsapp",
    from: { id: "+1233423454" },
    conversation: { id: context.activity.from.id },
    channelData: {
        contentType: "template",
        template: {
            templateId: "template_id",
            templateLanguage: "en",
            components: {
                header: [
                    {
                        type: "image",
                        image: {
                            url: "https://example.com/image.png"
                        }
                    }
                ],
                body: [
                    {
                        type: "text",
                        text: "lorem"
                    }
                ]
            }
        }
    }
};
```

#### parseTyntecWhatsAppMessageEvent(any, any, any, MoMessage)

Maps given parameters from the request URL, values from the request query string, request
headers and a tyntec `MoMessage` to a `Partial<Activity>`.

It is intended to be called by the `processActivity` method.

This method may be overridden in order to add additional checks on the incoming
requests. Particularly, overriding this method may be useful in order to
implement authorization of the requests. For example, the tyntec inbound
message webhook can be registered in such a way that every request contains a
header with a user-defined bearer token. Then, the overriding method can check this
header and throw an error if the token is invalid.

```typescript
class MyAdapter extends TyntecWhatsAppAdapter {
    protected async parseTyntecWhatsAppMessageEvent(params: any, query: any, headers: any, body: ITyntecMoMessage): Promise<Partial<Activity>> {
        if (headers["Authorization"] !== "Bearer mF_9.B5f-4.1JqM") {
            throw new Error("Unauthorized");
        }
        return super.parseTyntecWhatsAppMessageEvent(params, query, headers, body);
    }
}
```

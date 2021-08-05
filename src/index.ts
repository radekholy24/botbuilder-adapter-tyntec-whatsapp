import {Activity, ActivityTypes, BotAdapter, ConversationReference, MessageFactory, ResourceResponse, TurnContext, WebRequest, WebResponse} from "botbuilder";
import {ITyntecWhatsAppMessage} from "./tyntec/messages";
import {TyntecClient} from "./tyntec/client";

export interface ITyntecWhatsAppAdapterSettings {
    tyntecApikey: string;
    wabaNumber: string;
}

export class TyntecWhatsAppAdapter extends BotAdapter {
    wabaNumber: string;
    private tyntecClient: TyntecClient;

    constructor(settings: ITyntecWhatsAppAdapterSettings) {
        super();

        this.tyntecClient = new TyntecClient(settings.tyntecApikey);
        this.wabaNumber = settings.wabaNumber;
    }

    async continueConversation(reference: Partial<ConversationReference>, logic: (revocableContext: TurnContext) => Promise<void>): Promise<void> {
        throw Error("Operation continueConversation not supported.");
    }

    async deleteActivity(context: TurnContext, reference: Partial<ConversationReference>): Promise<void> {
        throw Error("Operation deleteActivity not supported.");
    }

    async processActivity(req: WebRequest, res: WebResponse, logic: (context: TurnContext) => Promise<any>): Promise<void> {
        throw Error("Operation processActivity not supported.");
    }

    async sendActivities(context: TurnContext, activities: Partial<Activity>[]): Promise<ResourceResponse[]> {
        const responses: ResourceResponse[] = [];
        for (const activity of activities) {
            const message = this.composeTyntecWhatsAppMessage(activity);

            const messageId = await this.tyntecClient.sendWhatsAppMessage(message);

            responses.push({id: messageId});
        }
        return responses;
    }

    async updateActivity(context: TurnContext, activity: Partial<Activity>): Promise<ResourceResponse | void> {
        throw Error("Operation updateActivity not supported.");
    }

    protected composeTyntecWhatsAppMessage(activity: Partial<Activity>): ITyntecWhatsAppMessage {
        if (activity.action !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.action not supported: ${activity.action}`);
        }
        if (activity.attachmentLayout !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.attachmentLayout not supported: ${activity.attachmentLayout}`);
        }
        if (activity.attachments !== undefined) {
            throw Error(`TyntecWhatsAppAdapter: Activity.attachments not supported: ${activity.attachments}`);
        }
        if (activity.callerId !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.callerId not supported: ${activity.callerId}`);
        }
        if (activity.code !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.code not supported: ${activity.code}`);
        }
        if (activity.conversation !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.conversation not supported: ${activity.conversation}`);
        }
        if (activity.deliveryMode !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.deliveryMode not supported: ${activity.deliveryMode}`);
        }
        if (activity.entities !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.entities not supported: ${activity.entities}`);
        }
        if (activity.expiration !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.expiration not supported: ${activity.expiration}`);
        }
        if (activity.from !== undefined) {
            throw Error(`TyntecWhatsAppAdapter: Activity.from not supported: ${activity.from}`);
        }
        if (activity.historyDisclosed !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.historyDisclosed not supported: ${activity.historyDisclosed}`);
        }
        if (activity.importance !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.importance not supported: ${activity.importance}`);
        }
        if (activity.inputHint !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.inputHint not supported: ${activity.inputHint}`);
        }
        if (activity.label !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.label not supported: ${activity.label}`);
        }
        if (activity.listenFor !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.listenFor not supported: ${activity.listenFor}`);
        }
        if (activity.membersAdded !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.membersAdded not supported: ${activity.membersAdded}`);
        }
        if (activity.membersRemoved !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.membersRemoved not supported: ${activity.membersRemoved}`);
        }
        if (activity.name !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.name not supported: ${activity.name}`);
        }
        if (activity.reactionsAdded !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.reactionsAdded not supported: ${activity.reactionsAdded}`);
        }
        if (activity.reactionsRemoved !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.reactionsRemoved not supported: ${activity.reactionsRemoved}`);
        }
        if (activity.recipient !== undefined) {
            throw Error(`TyntecWhatsAppAdapter: Activity.recipient not supported: ${activity.recipient}`);
        }
        if (activity.relatesTo !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.relatesTo not supported: ${activity.relatesTo}`);
        }
        if (activity.replyToId !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.replyToId not supported: ${activity.replyToId}`);
        }
        if (activity.semanticAction !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.semanticAction not supported: ${activity.semanticAction}`);
        }
        if (activity.serviceUrl !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.serviceUrl not supported: ${activity.serviceUrl}`);
        }
        if (activity.speak !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.speak not supported: ${activity.speak}`);
        }
        if (activity.suggestedActions !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.suggestedActions not supported: ${activity.suggestedActions}`);
        }
        if (activity.summary !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.summary not supported: ${activity.summary}`);
        }
        if (activity.text !== undefined) {
            throw Error(`TyntecWhatsAppAdapter: Activity.text not supported: ${activity.text}`);
        }
        if (activity.textFormat !== undefined) {
            throw Error(`TyntecWhatsAppAdapter: Activity.textFormat not supported: ${activity.textFormat}`);
        }
        if (activity.textHighlights !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.textHighlights not supported: ${activity.textHighlights}`);
        }
        if (activity.topicName !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.topicName not supported: ${activity.topicName}`);
        }
        if (activity.type !== ActivityTypes.Message) {
            throw Error(`TyntecWhatsAppAdapter: Activity.type other than ${ActivityTypes.Message} not supported: ${activity.type}`);
        }
        if (activity.value !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.value not supported: ${activity.value}`);
        }
        if (activity.valueType !== undefined) {
            console.warn(`TyntecWhatsAppAdapter: Activity.valueType not supported: ${activity.valueType}`);
        }
        return {
            from: this.wabaNumber,
            to: activity.channelData.whatsApp,
            channel: "whatsapp",
            content: {
                contentType: "template",
                template: activity.channelData.template
            }
        };
    }
}
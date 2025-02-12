import { BaseSchema } from "../common/dto/base.dto"

export interface IMessage extends BaseSchema {
    content: string
    senderId: string
    groupId: string
}
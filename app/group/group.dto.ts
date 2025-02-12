import { IMessage } from '../chat/chat.dto'
import { type BaseSchema } from '../common/dto/base.dto'
import { IUser } from '../user/user.dto'



export interface IGroup extends BaseSchema {
    name: string
    users: IUser[]
    messages: IMessage[]
    adminId: string
    isPrivate: boolean
}

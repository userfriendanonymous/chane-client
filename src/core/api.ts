import {
    AuthLoginBody, AuthJoinBody, Block, Channel, CreateRoleBody, CreateChannelBody, GetChannelBlocksQuery,
    DisconnectBlockFromChannelBody, ChangeChannelLabelsBody, ChangeChannelDescriptionBody, ChangeBlockBody,
    ConnectBlockToChannelBody, Role, PinChannelBlockBody, User, AuthMe, ResultResponse, AuthJoinError,
    AuthLoginError, GeneralError, RoleWrappedError, CreateRoleError, LiveMessage, CreateBlockBody
} from '@/core/bindings'
import AXIOS from "axios"

let axios = AXIOS.create({
    withCredentials: true,
    validateStatus: () => true,
})

export type Result<S, E> = {is: 'ok', data: S} | {is: 'err', data: E}
export type ApiResult<T> = Result<T, Error>
export type Error = 'network'

function encodeQueryData(data: Map<string, string>) {
    const result: Array<string> = []
    data.forEach((value, key) => result.push(encodeURIComponent(key) + '=' + encodeURIComponent(data.get(key) ?? '')))
    return result.join('&')
}

function WebSocketPromise(...input: ConstructorParameters<typeof WebSocket>): Promise<WebSocket> {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket(...input)
        function cleanup(){
            ws.onopen = () => {}
            ws.onclose = () => {}
        }
        ws.onopen = (event) => {
            resolve(ws)
            cleanup()
        }
        ws.onclose = (event) => {
            reject()
            cleanup()
        }
    })
}

function isSuccessful(status: number): boolean {
    return status >= 200 && status < 300
}

class Api {
    readonly endpoint: string

    constructor(endpoint: string){
        this.endpoint = endpoint
    }

    private url(url: string){
        return 'http://' + this.endpoint + url
    }

    private async get<T>(...[url, ...input]: Parameters<typeof axios.get>): Promise<T> {
        return (await axios.get(this.url(url), ...input)).data
    }
    private async post<T>(...[url, ...input]: Parameters<typeof axios.post>): Promise<T> {
        return (await axios.post(this.url(url), ...input)).data
    }
    private async put<T>(...[url, ...input]: Parameters<typeof axios.put>): Promise<T> {
        return (await axios.put(this.url(url), ...input)).data
    }
    private ws(...[url, ...input]: ConstructorParameters<typeof WebSocket>): WebSocket {
        return new WebSocket('ws://' + this.endpoint + url, ...input)
    }
    
    async getMyAuth(): Promise<AuthMe>
    {return await this.get('auth/me')}

    async login(body: AuthLoginBody): Promise<ResultResponse<null, AuthLoginError>>
    {return await this.post('auth/login', body)}

    async join(body: AuthJoinBody): Promise<ResultResponse<null, AuthJoinError>>
    {return await this.post('auth/join', body)}

    async createBlock(body: CreateBlockBody): Promise<ResultResponse<string, GeneralError>>
    {return await this.post('blocks/create', body)}

    async getBlock(id: string): Promise<ResultResponse<Block, GeneralError>>
    {return await this.get(`blocks/${id}`)}

    async changeBlock(body: ChangeBlockBody): Promise<ResultResponse<null, GeneralError>>
    {return await this.put('blocks/change', body)}

    async getChannel(id: string): Promise<ResultResponse<Channel, GeneralError>>
    {return await this.get(`channels/${id}`)}

    async createChannel(body: CreateChannelBody): Promise<ResultResponse<string, GeneralError>>
    {return await this.post('channels/create', body)}

    async pinChannelBlock(body: PinChannelBlockBody): Promise<ResultResponse<null, RoleWrappedError>>
    {return await this.put('channels/pin', body)}

    async changeChannelDescription(body: ChangeChannelDescriptionBody): Promise<ResultResponse<null, RoleWrappedError>>
    {return await this.put('channels/description', body)}

    async changeChannelLabels(body: ChangeChannelLabelsBody): Promise<ResultResponse<null, RoleWrappedError>>
    {return await this.put('channels/labels', body)}

    async getChannelBlocks(id: string, query: GetChannelBlocksQuery): Promise<ResultResponse<Block[], RoleWrappedError>>
    {return await this.get(`channels/${id}/blocks`, {params: query})}

    async connectBlockToChannel(body: ConnectBlockToChannelBody): Promise<ResultResponse<null, RoleWrappedError>>
    {return await this.put('channels/connect-block', body)}

    async disconnectBlockFromChannel(body: DisconnectBlockFromChannelBody): Promise<ResultResponse<null, RoleWrappedError>> 
    {return await this.put('channels/disconnect-block', body)}

    async getUser(name: string): Promise<ResultResponse<User, GeneralError>> 
    {return await this.get(`users/${name}`)}

    async getRole(id: string): Promise<ResultResponse<Role, GeneralError>>
    {return await this.get(`roles/${id}`)}

    async createRole(body: CreateRoleBody): Promise<ResultResponse<string, CreateRoleError>> 
    {return await this.post('roles/create', body)}

    async getLiveChannel(id: string, onClose: () => void): Promise<LiveChannel> {
        const ws = this.ws(`live/${id}`)
        ws.onclose = () => {
            onClose()
        }
        ws.onerror = () => {
            onClose()
        }
        return new Promise((resolve) => {
            ws.onopen = () => {
                resolve(new Live<LiveMessage>(call => {
                    ws.onmessage = (e) => {
                        call(e.data)
                    }
                }))
            }
        })
    }
}

const api = new Api('localhost:5000/api/')
export default api

class Live<M> {
    private listeners: Set<(messsage: M) => void> = new Set()
    constructor(gen: (call: (message: M) => void) => void){
        gen((message) => {
            this.listeners.forEach(fn => {
                fn(message)
            })
            this.listeners.clear()
        })
    }

    listen(fn: (message: M) => void){
        this.listeners.add(fn)
    }
}

type LiveChannel = Live<LiveMessage>
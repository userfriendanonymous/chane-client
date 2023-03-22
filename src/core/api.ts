import AXIOS, { AxiosResponse } from "axios"
import {AuthState} from '@/hooks/authStore'

let axios = AXIOS.create({
    withCredentials: true,
    validateStatus: () => true,
})

interface RolePermissions {
    viewBlocks: string[]
    connectBlocks: string[]
    disconnectBlocks: string[]
    pinBlock: string[]
    changeDefaultRole: string[]
    changeDescription: string[]
    pinRoles: string[]
    changeRoles: string[]
    setLabels: boolean
}

export /*pub*/ type Result<S, E> = {type: 'success', data: S} | {type: 'error', data: E} // RUST!!

function encodeQueryData(data: Map<string, string>) {
    const result: Array<string> = []
    data.forEach((value, key) => result.push(encodeURIComponent(key) + '=' + encodeURIComponent(data.get(key) ?? '')))
    return result.join('&')
}

export interface Block {
    id: string,
    content: string,
    owner: string
}

export interface User {
    name: string
}

export interface Channel {
    id: string,
    type: ChannelType,
    roles: Array<{name: string, role: string}>,
    defaultRole: string,
    labels: Array<string>
}

type ChannelType = 'server_hosted' | 'ghosted'

function isSuccessful(status: number): boolean {
    return status >= 200 && status < 300
}

class Api {
    readonly endpoint: string

    constructor(endpoint: string){
        this.endpoint = endpoint
    }

    async getMyAuth(): Promise<Result<AuthState, string>> {
        try {
            const response = await axios.get(this.endpoint + 'auth/me')
            if (isSuccessful(response.status)){
                if (response.data.is == 'valid'){
                    return {type: 'success', data: {is: 'valid', name: response.data.data.name}}
                } else {
                    return {type: 'success', data: {is: 'invalid'}}
                }
            } else {
                return {type: 'error', data: response.data.message}
            }
        } catch(error){
            return {type: 'error', data: 'Network error'}
        }
    }

    async login(name: string, password: string): Promise<Result<null, string>> { // me getting rusty
        try {
            const response = await axios.post(this.endpoint + 'auth/login', {
            name, password
            })
            if (isSuccessful(response.status)){
                return {type: 'success', data: null}
            } else {
                return {type: 'error', data: response.data.message ?? 'Unknown error'}
            }
        } catch(error){
            return {type: 'error', data: 'Network error'}
        }
    }

    async join(name: string, email: string, password: string): Promise<Result<null, string>> { // let's not get serious about typescript. it's a little garbage architecture so it's ok!
        try {
            const response = await axios.post(this.endpoint + 'auth/join', {
                name, email, password
            })
            if (isSuccessful(response.status)){
                return {type: 'success', data: null}
            } else {
                return {type: 'error', data: response.data.message ?? 'Unknown error'}
            }
        } catch(error){
            return {type: 'error', data: 'Network error'}
        }
    }

    async createBlock(content: string): Promise<Result<string, string>> {
        try {
            const response = await axios.post(this.endpoint + 'blocks/', {
                content
            })
            if (isSuccessful(response.status)){
                return {type: 'success', data: response.data.id}
            } else {
                alert(JSON.stringify(response.data))
                return {type: 'error', data: response.data.message ?? 'Unknown error'}
            }
        } catch(error){
            return {type: 'error', data: 'Network error'}
        }
    }

    async getBlock(id: string): Promise<Result<Block, string>> {
        try {
            const response = await axios.get(this.endpoint + `blocks/${id}`)
            if (isSuccessful(response.status)){
                return {type: 'success', data: response.data}
            } else {
                return {type: 'error', data: response.data.message ?? 'Unknown error'}
            }
        } catch(error){
            return {type: 'error', data: 'Network error'}
        }
    }

    async changeBlock(id: string, content: string): Promise<Result<null, string>> {
        try {
            const response = await axios.put(this.endpoint + `blocks/${id}`, {
                content
            })
            if (isSuccessful(response.status)){
                return {type: 'success', data: null}
            } else {
                return {type: 'error', data: response.data.message ?? 'Unknown error'}
            }
        } catch(error){
            return {type: 'error', data: 'Network error'}
        }
    }

    async getChannel(id: string): Promise<Result<Channel, string>> {
        try {
            const response = await axios.get(this.endpoint + `channels/${id}`)
            if (isSuccessful(response.status)){
                return {type: 'success', data: {
                    defaultRole: response.data.default_role,
                    id: response.data.id,
                    labels: response.data.labels,
                    roles: response.data.roles.map((role: {0: string, 1: string}) => ({name: role[0], role: role[1]})), // to fix this
                    type: response.data.type as ChannelType
                }}
            } else {
                return {type: 'error', data: response.data.message ?? 'Unknown error'}
            }
        } catch(error){
            return {type: 'error', data: 'Network error'}
        }
    }

    async createChannel(type: ChannelType, description: string, roles: Array<string>, defaultRole: string, labels: Array<string>): Promise<Result<string, string>> {
        try {
            const response = await axios.post(this.endpoint + 'channels/', {
                type,
                description,
                default_role: defaultRole,
                labels
            })
            if (isSuccessful(response.status)){
                return {type: 'success', data: response.data.id}
            } else {
                return {type: 'error', data: response.data.message ?? 'Unknown error'}
            }
        } catch(error){
            return {type: 'error', data: 'Network error'}
        }
    }

    async pinChannelBlock(blockId: string | null): Promise<Result<null, string>> {
        try {
            const response = await axios.put(this.endpoint + 'channels/pin', blockId == null ? {} : {
                id: blockId
            })
            if (isSuccessful(response.status)){
                return {type: 'success', data: null}
            } else {
                return {type: 'error', data: response.data.message ?? 'Unknown error'}
            }
        } catch(error){
            return {type: 'error', data: 'Network error'}
        }
    }

    async changeChannelDescription(id: string, description: string): Promise<Result<null, string>> {
        try {
            const response = await axios.put(this.endpoint + `channels/${id}/description`, {
                description
            })
            if (isSuccessful(response.status)){
                return {type: 'success', data: null}
            } else {
                return {type: 'error', data: response.data.message ?? 'Unknown error'}
            }
        } catch(error){
            return {type: 'error', data: 'Network error'}
        }
    }

    async changeChannelLabels(id: string, labels: Array<string>): Promise<Result<null, string>>{
        try {
            const response = await axios.put(this.endpoint + `channels/${id}/labels`, {
                labels
            })
            if (isSuccessful(response.status)){
                return {type: 'success', data: null}
            } else {
                return {type: 'error', data: response.data.message ?? 'Unknown error'}
            }
        } catch(error){
            return {type: 'error', data: 'Network error'}
        }
    }

    async getChannelBlocks(id: string, limit?: number, offset?: number): Promise<Result<Array<Block>, string>> {
        try {
            let query: Map<string, string> = new Map()
            if (limit) query.set('limit', String(limit))
            if (offset) query.set('offset', String(offset))
            const response = await axios.get(this.endpoint + `channels/${id}/blocks/?${encodeQueryData(query)}`)
            
            if (isSuccessful(response.status)){
                return {type: 'success', data: response.data}
            } else {
                return {type: 'error', data: response.data.message ?? 'Unknown error'}
            }
        } catch(error){
            return {type: 'error', data: 'Network error'}
        }
    }

    async connectBlockToChannel(id: string, blockId: string): Promise<Result<null, string>> {
        try {
            const response = await axios.put(this.endpoint + `channels/${id}/connect-block`, {id: blockId})
            if (isSuccessful(response.status)){
                return {type: 'success', data: null}
            } else {
                return {type: 'error', data: response.data.message ?? 'Unknown error'}
            }
        } catch(error){
            return {type: 'error', data: 'Network error'}
        }
    }

    async disconnectBlockFromChannel(id: string, blockId: string): Promise<Result<null, string>> {
        try {
            const response = await axios.put(this.endpoint + `channels/${id}/disconnect-block`, {id: blockId})
            if (isSuccessful(response.status)){
                return {type: 'success', data: null}
            } else {
                return {type: 'error', data: response.data.message ?? 'Unknown error'}
            }
        } catch(error){
            return {type: 'error', data: 'Network error'}
        }
    }

    async getUser(name: string): Promise<Result<User, string>> {
        try {
            const response = await axios.get(this.endpoint + `users/${name}`)
            if (isSuccessful(response.status)){
                return {type: 'success', data: response.data}
            } else {
                return {type: 'error', data: response.data.message ?? 'Unknown error'}
            }
        } catch(error){
            return {type: 'error', data: 'Network error'}
        }
    }

    async createRole(name: string, extends_: string[], editors: string[], permissions: RolePermissions): Promise<Result<string, string>> {
        try {
            const response = await axios.post(this.endpoint + 'roles/', {
                name,
                extends: extends_,
                editors,
                permissions: {
                    change_roles: permissions.changeRoles,
                    view_blocks: permissions.viewBlocks,
                    connect_blocks: permissions.connectBlocks,
                    disconnect_blocks: permissions.disconnectBlocks,
                    pin_block: permissions.pinBlock,
                    change_default_role: permissions.changeDefaultRole,
                    change_description: permissions.changeDescription,
                    pin_roles: permissions.pinRoles,
                    set_labels: permissions.setLabels
                }
            })
            if (isSuccessful(response.status)){
                return {type: 'success', data: response.data.id}
            } else {
                return {type: 'error', data: response.data.message ?? 'Unknown error'}
            }
        } catch(error){
            return {type: 'error', data: 'Network error'}
        }
    }
}

const api = new Api('http://localhost:5000/api/')
export default api
export default class GlobalState<StateType> {
    users: Function[]
    value: StateType

    constructor(value: StateType){
        this.value = value
        this.users = []
    }

    use(user: Function){
        this.users.push(user)
    }

    unuse(user: Function){
        this.users.splice(this.users.indexOf(user), 1)
    }

    set(value: StateType){
        this.value = value
        for (let user of this.users){
            user(value)
        }
    }
}


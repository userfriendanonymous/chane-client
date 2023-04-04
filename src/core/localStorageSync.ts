class LocalStorageSync {
    listens: Map<string, () => void> = new Map()

    constructor() {
        addEventListener('storage', (e) => {
            this.listens.forEach((fn) => {
                fn()
            })
        })
    }
    
    sync(id: string, fn: () => void) {
        this.listens.set(id, fn)
    }

    unsync(id: string){
        this.listens.delete(id)
    }
}

const localStorageSync = new LocalStorageSync()

export default localStorageSync
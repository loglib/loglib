export class Logger {
    debug: boolean
    constructor(debug: boolean) {
        this.debug = debug
    }
    log(...args: any[]) {
        this.debug &&
            console.log(...args)
    }
    error(...args: any[]) {
        this.debug &&
            console.error(...args)
    }
}
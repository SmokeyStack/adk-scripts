export class Timer {
    static lastTime: number = -1;
    static lastOperation: string = '';

    static beginOperation(operation: string): void {
        this.endOperation();
        this.lastTime = Date.now();
        this.lastOperation = operation;
    }

    static endOperation(): void {
        const time = Date.now() - this.lastTime;
        console.log(`Operation ${Timer.lastOperation} took ${time}ms`);
        this.lastTime = -1;
    }
}

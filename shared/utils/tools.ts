class Logger {
    private formatMessage(level: string, msg: string): string {
        const timestamp = new Date().toLocaleTimeString();
        return `[${timestamp}] [${level.toUpperCase()}] ${msg}`;
    }

    info(msg: string) {
        console.log(this.formatMessage('info', msg));
    }

    error(msg: string) {
        console.error(this.formatMessage('error', msg));
    }

    debug(msg: string) {
        console.debug(this.formatMessage('debug', msg));
    }
}

function createLogger(): Logger {
    return new Logger();
}

export const blog = createLogger();
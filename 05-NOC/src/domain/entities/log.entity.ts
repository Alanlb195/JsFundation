
// Log Severity enum
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}
// options for constructor
export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    createdAt?: Date;
    origin: string;
}

export class LogEntity {
    // properties
    public level: LogSeverityLevel; // enum
    public message: string;
    public createdAt: Date;
    public origin: string;

    // constructor
    constructor(options: LogEntityOptions) {
        const { createdAt = new Date(), level, message, origin } = options;
        this.message = message;
        this.origin = origin;
        this.level = level;
        this.createdAt = createdAt;
    }

    // methods
    static fromJson = (json: string): LogEntity => {
        const { message, level, createdAt, origin } = JSON.parse(json);
        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin
        });
        return log;
    }
}
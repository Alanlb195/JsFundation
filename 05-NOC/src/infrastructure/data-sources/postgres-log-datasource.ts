import { LogDataSource } from "../../domain/data-sources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "@prisma/client";

const prismaClient = new PrismaClient();
const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgresLogDatasource implements LogDataSource {

    async saveLog(log: LogEntity): Promise<void> {

        const level = severityEnum[log.level]

        // insert log in prisma - PostgreSQL
        const newLog = await prismaClient.logModel.create({
            data: {
                ...log,
                level: level
            }
        });
        console.log('PostgreSQL log created: ', newLog.id);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        const levelSeverity = severityEnum[severityLevel];

        const logs = await prismaClient.logModel.findMany({
            where: { level: levelSeverity }
        });

        return logs.map(LogEntity.fromObject);
    }

}


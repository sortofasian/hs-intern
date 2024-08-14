import { Injectable } from "@nestjs/common"
import { User } from "@prisma/client"

import { DbService } from "../db/db.service"

@Injectable()
export class UsersService {
    constructor(private db: DbService) {}

    async search(query: string): Promise<User[]> {
        // Return a list of users by partial username
        const users = this.db.user.findMany({where: {username: {startsWith: query}}})
        return users    
    }

    async read(id: string): Promise<User> {
        const data = await this.db.user.findUnique({where: {id: id}})
        return data
    }
}

import {Injectable} from "@nestjs/common";
import {neon} from "@neondatabase/serverless";

@Injectable()
export class CoursesService {
    async getCourse(id: string) {
        const sql = neon(`${process.env.DATABASE_URL}`)
        const [course] = await sql.query("SELECT * FROM Courses WHERE id = $1", [])
    }
}

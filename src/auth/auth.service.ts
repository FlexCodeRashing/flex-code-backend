import {Injectable} from "@nestjs/common";
import {JwtPayload} from "jsonwebtoken";
import * as jwt from "jsonwebtoken";


@Injectable()
export class AuthService {
    private generateJwtId(userId: string): string {
        return `${userId}`
    }
    generateToken(payload: string, expiresIn: number): string | null {
        const payloadJSON = JSON.parse(payload)
        if (!process.env.JWT_SECRET || !payloadJSON || !payloadJSON["user"]["id"]) {
            return null;
        }
        try {
            const jwtId = this.generateJwtId(payloadJSON["user"]["id"])
            const token = jwt.sign(payloadJSON, `${process.env.JWT_SECRET}`, {
                jwtid: jwtId,
                expiresIn: expiresIn
            });
            if (token != "" && token != undefined) return token;
            return null;
        } catch (e) {
            console.error(e)
            return null;
        }
    }

    validateToken(token: string): [boolean, JwtPayload | JSON | null] {
        try {
            if (!process.env.JWT_SECRET) throw new Error("Missing JWT_SECRET");
            const _data = jwt.verify(token, `${process.env.JWT_SECRET}`)
            let data;
            if (typeof _data === "string") {
                data = JSON.parse(data);
            } else {
                data = _data
            }
            const jwtId = this.generateJwtId(data["user"]["id"]);
            if (!jwtId) throw new Error("Incorrect token data");
            data = jwt.verify(token, `${process.env.JWT_SECRET}`, {
                jwtid: jwtId
            })
            return [true, data];
        } catch (_) {
            return [false, null];
        }
    }
}

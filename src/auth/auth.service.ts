import {Injectable} from "@nestjs/common";
import jwt, {JwtPayload} from "jsonwebtoken";
import * as process from "node:process";

@Injectable()
export class AuthService {
    private generateJwtId(userId: string): string {
        return `${userId}`
    }
    generateToken(payload: string, expiresIn: number, jwtId: string): string | null {
        if (!process.env.JWT_SECRET) {
            return null;
        }
        try {
            const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
                jwtid: jwtId,
                expiresIn: expiresIn
            });
            if (token != "" && token != undefined) return token;
            return null;
        } catch (_) {
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
            data = jwt.verify(token, `${process.env.JWT_SECRET}`, {
                jwtid: jwtId
            })
            return [true, data];
        } catch (_) {
            return [false, null];
        }
    }
}

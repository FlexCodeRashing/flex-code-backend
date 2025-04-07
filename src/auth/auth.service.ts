import {Injectable} from "@nestjs/common";
import jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
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
}

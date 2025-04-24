import {Controller, Get, Req, Res} from "@nestjs/common";
import {CoursesService} from "./courses.service";
import {Request, Response} from "express";

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Get(':id')
    async getCourse(@Req() req: Request, @Res() res: Response) {
        const id = req.params["id"]
        console.log(id)
        return res.status(200).send()
    }
}

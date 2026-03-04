import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { RoadmapsService } from './roadmaps.service';
import { GenerateRoadmapDto } from './dto/generate-roadmap.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TaskStatus } from './roadmap.schema';

@Controller('roadmaps')
@UseGuards(JwtAuthGuard)
export class RoadmapsController {
    constructor(private roadmapsService: RoadmapsService) { }

    @Post('generate')
    generate(
        @Request() req: { user: { id: string } },
        @Body() dto: GenerateRoadmapDto,
    ) {
        return this.roadmapsService.generateForUser(req.user.id, dto);
    }

    @Get('my')
    getMyRoadmap(@Request() req: { user: { id: string } }) {
        return this.roadmapsService.findByUser(req.user.id);
    }

    @Get('me/stats')
    getStats(@Request() req: { user: { id: string } }) {
        return this.roadmapsService.getStats(req.user.id);
    }


    @Patch('tasks/:taskId')
    updateTask(
        @Request() req: { user: { id: string } },
        @Param('taskId') taskId: string,
        @Body('status') status: TaskStatus,
    ) {
        return this.roadmapsService.updateTaskStatus(req.user.id, taskId, status);
    }
}

import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ResultsService } from './results.service';
import { SubmitTestDto } from './dto/submit-test.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('results')
@UseGuards(JwtAuthGuard)
export class ResultsController {
  constructor(private resultsService: ResultsService) {}

  @Post('submit')
  submitTest(@Request() req: { user: { id: string } },   
  @Body() dto: SubmitTestDto) {
    return this.resultsService.submitTest(req.user.id, dto);
  }

  @Get('my')
  getMyResults(@Request() req: { user: { id: string } }) {
    return this.resultsService.findByUser(req.user.id);
  }

  @Get('my/latest')
  getLatestResult(@Request() req: { user: { id: string } }) {
    return this.resultsService.findLatestByUser(req.user.id);
  }
}

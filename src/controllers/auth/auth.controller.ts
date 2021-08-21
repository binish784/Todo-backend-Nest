import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/guards/local-authGuards';
import { Request, Controller, Post, UseGuards } from '@nestjs/common';
import { Public } from '../../decorators/public.decorator';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post("login")
    @UseGuards(LocalAuthGuard)
    async login(
        @Request() req
    ){
        let currentUser = req.user;
        let token:String = await this.authService.getUserToken(currentUser);
        return {token};
    }

}

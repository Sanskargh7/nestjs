import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) { }

	@Post('login')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				username: { type: 'string', example: 'sans@123' },
				password: { type: 'string', example: '123465' },
			},
			required: ['username', 'password'],
		},
	})
	login(@Body() user: any) {
		return this.authService.login(user);
	}

	@Post('logout')
	@UseGuards(AuthGuard('jwt'))
	logout() {
		return { message: 'Logout successful' };
	}
}
import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    //handler first, then controller, so @Roles works in both places
    canActivate(ctx: ExecutionContext): boolean {
        const required = this.reflector.getAllAndOverride<string[]>('roles', [
            ctx.getHandler(),
            ctx.getClass(),
        ]);
        if(!required) return true;

        //set by JwtAuthGuard, which must run first in @UseGuards
        const {user} = ctx.switchToHttp().getRequest();
        console.log('User from token:', user); // tambahin ini
        console.log('Required roles:', required); // dan ini
        return required.includes(user?.role);
    }
    
} 
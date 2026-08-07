import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ContextCreator } from "@nestjs/core/helpers/context-creator";

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => {
        return context.switchToHttp().getRequest().user;
    },
);
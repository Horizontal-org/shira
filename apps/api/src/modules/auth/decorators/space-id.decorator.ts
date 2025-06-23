import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";

export const SpaceId = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): number => {
        const request = ctx.switchToHttp().getRequest()
        const user = request.user
        if(!user.activeSpace || !user.activeSpace.space?.id) {
            throw new UnauthorizedException("no active space selected")
        }

        return user.activeSpace.space.id
    }
)
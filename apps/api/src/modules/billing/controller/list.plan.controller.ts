import { Get, ParseIntPipe, Param, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { Roles } from "src/modules/auth/decorators/roles.decorators";
import { Role } from "src/modules/user/domain/role.enum";
import { AuthController } from "src/utils/decorators/auth-controller.decorator";
import { PlanEntity } from "../domain/plan.entity";
import { Repository } from "typeorm";

@AuthController('billing')
export class ListPlanController {
    constructor(
        @InjectRepository(PlanEntity)
        private readonly planRepository: Repository<PlanEntity>
    ){}

    @Get('/plans')
    @Roles(Role.SuperAdmin)
    async handler() {
        return this.planRepository.find()
    }

    @Get('/plans/:id')
    @Roles(Role.SuperAdmin)
    async handlerFindById(@Param('id', ParseIntPipe) id: number) {
        const plan =  await this.planRepository.findOne({
            where: { id }
        })

        if(!plan) {
            throw new NotFoundException(`Plan with ID ${id} not found`)
        }
        return plan
    }
}
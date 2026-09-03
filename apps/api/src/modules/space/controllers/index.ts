import { CreateSpaceController } from './create.space.controller';
import { ListSpaceController } from './list.space.controller';
import { AssociateUserSpaceController } from './associate-user.space.controller';
import { DeleteSpaceController } from './delete.space.controller'
import { UpdateResultsEnabledSpaceController } from './update-results-enabled.space.controller';
export const spaceControllers = [
    CreateSpaceController,
    ListSpaceController,
    AssociateUserSpaceController,
    DeleteSpaceController,
    UpdateResultsEnabledSpaceController,
];

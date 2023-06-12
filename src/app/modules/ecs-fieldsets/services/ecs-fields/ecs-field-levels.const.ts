import { HttpResponse } from 'projects/shared/src/lib/models/http-response.interface';
import { EcsFieldset } from '../../models/ecs-fieldset.interface';
import {EcsFieldLevel} from "../../models/ecs-field.interface";

export const ECS_FIELD_LEVELS_RESPONSE: HttpResponse<EcsFieldLevel> = {
  "data": [
    { "id": "6a0f0a19-743d-491a-971c-313a8a6cafcf", "name": "core", "isEcs": true },
    { "id": "03244345-4723-494d-8563-2648913bb5a0", "name": "extended", "isEcs": true },
  ]
};

import { HttpResponse } from 'projects/shared/src/lib/models/http-response.interface';
import { EcsFieldset } from '../../models/ecs-fieldset.interface';
import {EcsFieldType} from "../../models/ecs-field.interface";

export const ECS_FIELD_TYPES_RESPONSE: HttpResponse<EcsFieldType> =
  {
    "data":[
      {
        "id":"626b4af2-840e-4051-87a5-c6cc2f0c18e7",
        "name":"boolean",
        "isEcs":true
      },
      {
        "id":"4bee5351-f323-43c7-8674-2521212cfb5d",
        "name":"constant_keyword",
        "isEcs":true
      },
      {
        "id":"eb16b6a6-ff04-4578-917e-79fb6caa656a",
        "name":"date",
        "isEcs":true
      },
      {
        "id":"b841bd69-7870-49dd-940c-2d0eec72f22c",
        "name":"flattened",
        "isEcs":true
      },
      {
        "id":"660c1122-817f-4a08-b9c7-44dd7c75deef",
        "name":"float",
        "isEcs":true
      },
      {
        "id":"91a5c341-7db2-44b8-96b7-d5e889c4684a",
        "name":"geo_point",
        "isEcs":true
      },
      {
        "id":"97f45cc1-141d-4239-9141-710b2ca6f13c",
        "name":"ip",
        "isEcs":true
      },
      {
        "id":"78c251f2-1427-499f-b195-1ed24c46cdf4",
        "name":"keyword",
        "isEcs":true
      },
      {
        "id":"863e42a3-d23f-4772-b8d8-3b40b015491a",
        "name":"long",
        "isEcs":true
      },
      {
        "id":"a545f707-0dbb-4900-9b80-07c34ab16c67",
        "name":"match_only_text",
        "isEcs":true
      },
      {
        "id":"f850e6ab-fa29-4db4-bd6f-6658690478cc",
        "name":"nested",
        "isEcs":true
      },
      {
        "id":"bcb4853a-37e8-4144-8dad-d694a0588bee",
        "name":"object",
        "isEcs":true
      },
      {
        "id":"58399317-066a-4ba6-9874-c7de3299b8ce",
        "name":"scaled_float",
        "isEcs":true
      },
      {
        "id":"d35e26f6-781f-4002-ba7e-24481f8e99f8",
        "name":"wildcard",
        "isEcs":true
      }
    ]
  };

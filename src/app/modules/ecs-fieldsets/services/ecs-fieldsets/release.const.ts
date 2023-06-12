import { HttpResponse } from 'projects/shared/src/lib/models/http-response.interface';
import { EcsFieldset } from '../../models/ecs-fieldset.interface';
import {HttpEntityResponse} from "../../../../../../projects/shared/src/lib/models/http-entity-response.interface";
import {Release} from "../../models/release.interface";

export const RELEASE_RESPONSE: HttpEntityResponse<Release> =
  {
    "data":{
      "id":"a57cb753-9fdd-4617-b80b-ca0d78889ae2",
      "version":"8.0",
      "created":"2023-05-16T08:19:19.254394Z",
      "createdBy":"bast",
      "updated":null,
      "updatedBy":null,
      "stage":"prod",
      "releaseStatus":"initial",
      "baseRelease":"1.0",
      "baseReleaseId":"5026273d-d5b6-4dc1-9b50-b9e098afdbd2",
      "ecsVersion":"1.0",
      "ecsVersionId":"170d517a-22c1-42d8-9baf-0c0090fb1bc5",
      "logclassCount":1,
      "logsourceCount":0,
      "ecsFieldCount":576
    }
  };

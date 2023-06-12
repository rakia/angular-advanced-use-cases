import { HttpResponse } from 'projects/shared/src/lib/models/http-response.interface';
import { EcsFieldset } from '../../models/ecs-fieldset.interface';
import {ParameterDescription} from "../../models/parameter-description.interface";

export const PARAMETER_DESCRIPTION_RESPONSE: HttpResponse<ParameterDescription> =
  {
    "data":[
      {
        "id":"ecs.fieldset.description",
        "schema":"ecs",
        "type":"fieldset",
        "required":true,
        "parameterName":"description",
        "description":"Description of the field set. Two subsequent newlines create a new paragraph."
      },
      {
        "id":"ecs.fieldset.fields",
        "schema":"ecs",
        "type":"fieldset",
        "required":true,
        "parameterName":"fields",
        "description":"YAML array as described in the 'List of fields' section below."
      },
      {
        "id":"ecs.fieldset.name",
        "schema":"ecs",
        "type":"fieldset",
        "required":true,
        "parameterName":"name",
        "description":"Name of the field set, lowercased and with underscores to separate words. For programmatic use."
      },
      {
        "id":"ecs.fieldset.title",
        "schema":"ecs",
        "type":"fieldset",
        "required":true,
        "parameterName":"title",
        "description":"Capitalized name of the field set, with spaces to separate words. For use in documentation section titles."
      },
      {
        "id":"ecs.fieldset.beta",
        "schema":"ecs",
        "type":"fieldset",
        "required":false,
        "parameterName":"beta",
        "description":"Adds a beta marker for the entire fieldset. The text provided in this attribute is used as content of the beta marker in the documentation. Beta notices should not have newlines."
      },
      {
        "id":"ecs.fieldset.footnote",
        "schema":"ecs",
        "type":"fieldset",
        "required":false,
        "parameterName":"footnote",
        "description":"Additional remarks regarding the fieldset."
      },
      {
        "id":"ecs.fieldset.group",
        "schema":"ecs",
        "type":"fieldset",
        "required":false,
        "parameterName":"group",
        "description":"To sort field sets against one another. For example the 'base' field set has group=1 and is the first listed in the documentation. All others have group=2 and are therefore after 'base' (sorted alphabetically). Default: 2"
      },
      {
        "id":"ecs.fieldset.reuses",
        "schema":"ecs",
        "type":"fieldset",
        "required":false,
        "parameterName":"reuses",
        "description":"Used to identify which field sets are expected to be reused in multiple places. See 'Field set reuse' for details."
      },
      {
        "id":"ecs.fieldset.root",
        "schema":"ecs",
        "type":"fieldset",
        "required":false,
        "parameterName":"root",
        "description":"Whether or not the fields of this field set should be namespaced under the field set name. Most field sets are expected to have their fields namespaced under the field set name. Only the 'base' field set is expected to set this to true (to define a few root fields like '@timestamp'). Default: false."
      },
      {
        "id":"ecs.fieldset.short",
        "schema":"ecs",
        "type":"fieldset",
        "required":false,
        "parameterName":"short",
        "description":"Short version of the description to display in small spaces, such as the list of field sets. Short descriptions must not have newlines. Defaults to the main description when absent. If the main description has multiple paragraphs, then a 'short' description with no newlines is required."
      },
      {
        "id":"ecs.fieldset.shortOverride",
        "schema":"ecs",
        "type":"fieldset",
        "required":false,
        "parameterName":"shortOverride",
        "description":"Used to override the top-level fieldset's short description when nesting. See 'Field set reuse' for details."
      },
      {
        "id":"ecs.fieldset.type",
        "schema":"ecs",
        "type":"fieldset",
        "required":false,
        "parameterName":"type",
        "description":"at this level, should always be 'group'"
      },
      {
        "id":"ecs.field.description",
        "schema":"ecs",
        "type":"field",
        "required":true,
        "parameterName":"description",
        "description":"Description of the field"
      },
      {
        "id":"ecs.field.level",
        "schema":"ecs",
        "type":"field",
        "required":true,
        "parameterName":"level",
        "description":"ECS Level of maturity of the field (core or extended)"
      },
      {
        "id":"ecs.field.name",
        "schema":"ecs",
        "type":"field",
        "required":true,
        "parameterName":"name",
        "description":"Name of the field"
      },
      {
        "id":"ecs.field.type",
        "schema":"ecs",
        "type":"field",
        "required":true,
        "parameterName":"type",
        "description":"Type of the field. Must be set explicitly, no default"
      },
      {
        "id":"ecs.field.beta",
        "schema":"ecs",
        "type":"field",
        "required":false,
        "parameterName":"beta",
        "description":"Adds a beta marker for the field to the description. The text provided in this attribute is used as content of the beta marker in the documentation. Note that when a whole field set is marked as beta, it is not necessary nor recommended to mark all fields in the field set as beta. Beta notices should not have newlines."
      },
      {
        "id":"ecs.field.ecsFieldAllowedValues",
        "schema":"ecs",
        "type":"field",
        "required":false,
        "parameterName":"ecsFieldAllowedValues",
        "description":"list of dictionaries with the 'name' and 'description' of the expected values. Optionally, entries in this list can specify 'expected_event_types'. The 'beta' field is also allowed here and will add a beta marker to the allowed value in the ECS categorization docs."
      },
      {
        "id":"ecs.field.ecsMultiFields",
        "schema":"ecs",
        "type":"field",
        "required":false,
        "parameterName":"ecsMultiFields",
        "description":"Specify additional ways to index the field"
      },
      {
        "id":"ecs.field.example",
        "schema":"ecs",
        "type":"field",
        "required":false,
        "parameterName":"example",
        "description":"A single value example of what can be expected in this field. Example values that are composite types (array, object) should be quoted to avoid YAML interpretation in ECS-generated artifacts and other downstream projects depending on the schema."
      },
      {
        "id":"ecs.field.expectedEventTypes",
        "schema":"ecs",
        "type":"field",
        "required":false,
        "parameterName":"expectedEventTypes",
        "description":"list of expected 'event.type' values to use in association with that category."
      },
      {
        "id":"ecs.field.expectedValues",
        "schema":"ecs",
        "type":"field",
        "required":false,
        "parameterName":"expectedValues",
        "description":"An array of expected values for the field. Schema consumers can validate integrations and mapped data against the listed values. These values are the recommended convention, but users may also use other values."
      },
      {
        "id":"ecs.field.format",
        "schema":"ecs",
        "type":"field",
        "required":false,
        "parameterName":"format",
        "description":"Field format that can be used in a Kibana index template (e.g. String, Bytes, Number)."
      },
      {
        "id":"ecs.field.ignoreAbove",
        "schema":"ecs",
        "type":"field",
        "required":false,
        "parameterName":"ignoreAbove",
        "description":"Strings longer than the ignore above setting will not be indexed or stored."
      },
      {
        "id":"ecs.field.index",
        "schema":"ecs",
        "type":"field",
        "required":false,
        "parameterName":"index",
        "description":"If 'False', means field is not indexed (overrides type). This parameter has no effect on a 'wildcard' field."
      },
      {
        "id":"ecs.field.inputFormat",
        "schema":"ecs",
        "type":"field",
        "required":false,
        "parameterName":"inputFormat",
        "description":"Format of the input (e.g. Nanoseconds)."
      },
      {
        "id":"ecs.field.normalize",
        "schema":"ecs",
        "type":"field",
        "required":false,
        "parameterName":"normalize",
        "description":"Normalization steps that should be applied at ingestion time. The content of the field should be an array (even when there's only one value)."
      },
      {
        "id":"ecs.field.outputFormat",
        "schema":"ecs",
        "type":"field",
        "required":false,
        "parameterName":"outputFormat",
        "description":"Format of the input (e.g. asMilliseconds)."
      },
      {
        "id":"ecs.field.outputPrecision",
        "schema":"ecs",
        "type":"field",
        "required":false,
        "parameterName":"outputPrecision",
        "description":"Precision of the output."
      },
      {
        "id":"ecs.field.path",
        "schema":"ecs",
        "type":"field",
        "required":false,
        "parameterName":"path",
        "description":"The full path to the aliases' target field."
      },
      {
        "id":"ecs.field.pattern",
        "schema":"ecs",
        "type":"field",
        "required":false,
        "parameterName":"pattern",
        "description":"A regular expression that expresses the expected constraints of the field's string values."
      },
      {
        "id":"ecs.field.required",
        "schema":"ecs",
        "type":"field",
        "required":false,
        "parameterName":"required",
        "description":"Fields expected in any ECS-compliant event. Currently, only '@timestamp' and 'ecs.version'"
      },
      {
        "id":"ecs.field.scalingFactor",
        "schema":"ecs",
        "type":"field",
        "required":false,
        "parameterName":"scalingFactor",
        "description":"Factor used for scaling."
      },
      {
        "id":"ecs.field.short",
        "schema":"ecs",
        "type":"field",
        "required":false,
        "parameterName":"short",
        "description":"Short version of the description to display in small spaces. Short descriptions must not have newlines. Defaults to the main description when absent. If the main description has multiple paragraphs, then a 'short' description with no newlines is required."
      }
    ]
  };

/*
 * Public API Surface of shared
 */

// export styles TODO how to handle that

// Modules
export * from './lib/shared.module';
export * from './lib/modules/dynamic-form/dynamic-form.module';
export * from './lib/modules/dynamic-table/dynamic-table.module';
export * from './lib/modules/custom-autocomplete/custom-autocomplete.module';
export * from './lib/modules/layout/layout.module';
export * from './lib/modules/loading-progress/loading.module';
export * from './lib/transloco/transloco.module';

// Services
export * from './lib/services/dialog-service/dialog.service';
export * from './lib/services/form-service/form.service';
export * from './lib/modules/loading-progress/services/loading.service';

// Components
export * from './lib/modules/layout/components/sidenav-wrapper/sidenav-wrapper.component';
export * from './lib/modules/loading-progress/components/loading-progress.component';
export * from './lib/components/actions-buttons/actions-buttons.component';
export * from './lib/components/card/card.component';
export * from './lib/components/chips-list/chips-list.component';
export * from './lib/components/confirm-dialog/confirm-dialog.component';
export * from './lib/components/create-entity/create-entity.component';
export * from './lib/modules/dynamic-form/dynamic-form.component';
export * from './lib/modules/dynamic-table/components/dynamic-table.component';
export * from './lib/components/editable-entity/editable-entity.component';
export * from './lib/components/expansion-card/expansion-card.component';
export * from './lib/components/file-upload/file-upload.component';
export * from './lib/components/navigation-bar/navigation-bar.component';
export * from './lib/modules/custom-autocomplete/components/custom-autocomplete/custom-autocomplete.component';
export * from './lib/components/search/search.component';
export * from './lib/components/edit-chips-list/edit-chips-list.component';
export * from './lib/components/scroll-to-top/scroll-to-top.component';

// Helpers
export * from './lib/helpers/count-keys-in-object.helper';
export * from './lib/helpers/custom-validators.helper';
export * from './lib/helpers/is-valid-json.validator';
export * from './lib/helpers/scroll.helper';
export * from './lib/helpers/snake-case-to-camel-case.helper';
export * from './lib/helpers/transform-sort.helper';
export * from './lib/helpers/lazy-array.helper';

// Interfaces
export * from './lib/models/base-entity.interface';
export * from './lib/models/contact-person.interface';
export * from './lib/models/delete-event.interface';
export * from './lib/models/entity-version.interface';
export * from './lib/models/http-entity-response.interface';
export * from './lib/models/http-response.interface';
export * from './lib/models/object.types';
export * from './lib/models/request-response.interface';
export * from './lib/models/request-response.types';
export * from './lib/models/stage.interface';
export * from './lib/models/status.interface';
export * from './lib/models/status.types';
export * from './lib/models/updated-entity.interface';
export * from './lib/models/server-response-error.interface';
export * from './lib/models/name-id-entity.interface';
export * from './lib/models/ecs-version.interface';
export * from './lib/modules/layout/models/sidenav-item.interface';

// TODO move
export * from './lib/components/actions-buttons/action-button.interface';
export * from './lib/components/confirm-dialog/dialog-data.interface';
export * from './lib/components/navigation-bar/navigation-tab.interface';
export * from './lib/modules/dynamic-form/models/form-control-def.model';
export * from './lib/modules/dynamic-form/models/form-field-definition.model';

// Pipes
export * from './lib/pipes/get-array/get-array.pipe';
export * from './lib/pipes/get-json/get-json.pipe';
export * from './lib/pipes/get-keys/get-keys.pipe';
export * from './lib/pipes/remove-quotes-or-stringify/remove-quotes-or-stringify.pipe';
export * from './lib/pipes/stringify-when-needed/stringify-when-needed.pipe';

// Consts
export * from './lib/const/regex-list';

// Directives
export * from './lib/directives/click-inside-outside.directive';

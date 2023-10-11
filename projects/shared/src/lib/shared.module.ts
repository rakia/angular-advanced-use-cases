import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ActionsButtonsComponent } from './components/actions-buttons/actions-buttons.component';
import { CardComponent } from './components/card/card.component';
import { CreateEntityComponent } from './components/create-entity/create-entity.component';
import { EditableEntityComponent } from './components/editable-entity/editable-entity.component';
import { ExpansionCardComponent } from './components/expansion-card/expansion-card.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { SearchComponent } from './components/search/search.component';
import { ClickInsideOutsideDirective } from './directives/click-inside-outside.directive';
import { GetJsonPipe } from './pipes/get-json/get-json.pipe';
import { GetKeysPipe } from './pipes/get-keys/get-keys.pipe';
import { RemoveQuotesOrStringifyPipe } from './pipes/remove-quotes-or-stringify/remove-quotes-or-stringify.pipe';
import { StringifyWhenNeededPipe } from './pipes/stringify-when-needed/stringify-when-needed.pipe';
import { DialogService } from './services/dialog-service/dialog.service';
import { FormService } from './services/form-service/form.service';
import { TranslocoCoreModule } from './transloco/transloco.module';

@NgModule({
  declarations: [
    CreateEntityComponent,
    EditableEntityComponent,
    ActionsButtonsComponent,
    NavigationBarComponent,
    SearchComponent,
    ExpansionCardComponent,
    CardComponent,
    GetKeysPipe,
    GetJsonPipe,
    RemoveQuotesOrStringifyPipe,
    StringifyWhenNeededPipe,
    ClickInsideOutsideDirective,
    ScrollToTopComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTooltipModule,
    MatIconModule,
    TranslocoCoreModule,
    MatButtonModule,
    RouterModule,
    MatTabsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatExpansionModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  providers: [FormService, DialogService],
  exports: [
    CreateEntityComponent,
    EditableEntityComponent,
    ActionsButtonsComponent,
    NavigationBarComponent,
    SearchComponent,
    ExpansionCardComponent,
    CardComponent,
    GetKeysPipe,
    GetJsonPipe,
    RemoveQuotesOrStringifyPipe,
    StringifyWhenNeededPipe,
    ClickInsideOutsideDirective,
    ScrollToTopComponent,
  ],
})
export class SharedModule {}

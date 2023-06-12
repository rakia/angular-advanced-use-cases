import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SidenavItem } from '../../projects/shared/src/lib/modules/layout/models/sidenav-item.interface';
import { SIDENAV_ITEMS } from './sidenav-items';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sidenavItems: SidenavItem[] = SIDENAV_ITEMS;
  formBuilder = inject(FormBuilder);
  title = 'angular-advanced';
  fileToUpload: string = '';
  public form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      uploadFile: [undefined, Validators.required],
    });
  }

  onUploadFile(): void {
    this.fileToUpload = this.form.controls['uploadFile'].value[0].name;
  }
}

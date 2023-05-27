import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-advanced';

  onUploadFile(event: File): void {
    console.log('File to upload',event.name);
  }
}

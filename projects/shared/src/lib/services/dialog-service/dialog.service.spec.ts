import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MockProvider } from 'ng-mocks';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [DialogService, MockProvider(MatDialog)],
    });
    service = TestBed.inject(DialogService);
  });

  it('should create DialogService', () => {
    expect(service).toBeTruthy();
  });
});

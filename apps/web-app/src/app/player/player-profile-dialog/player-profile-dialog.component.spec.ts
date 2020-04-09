import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerProfileDialogComponent } from './player-profile-dialog.component';

describe('PlayerProfileDialogComponent', () => {
  let component: PlayerProfileDialogComponent;
  let fixture: ComponentFixture<PlayerProfileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerProfileDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

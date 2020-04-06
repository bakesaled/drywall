import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStartComponent } from './game-start.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('GameStartComponent', () => {
  let component: GameStartComponent;
  let fixture: ComponentFixture<GameStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameStartComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

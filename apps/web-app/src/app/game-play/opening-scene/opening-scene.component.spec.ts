import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningSceneComponent } from './opening-scene.component';

describe('OpeningSceneComponent', () => {
  let component: OpeningSceneComponent;
  let fixture: ComponentFixture<OpeningSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

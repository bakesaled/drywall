import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlayComponent } from './game-play.component';
import { SharedModule } from '../shared/shared.module';
import { SocketService } from '../core/services/socket.service';
import * as io from 'socket.io-client';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GameStartComponent } from '../game-start/game-start.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('GamePlayComponent', () => {
  let component: GamePlayComponent;
  let fixture: ComponentFixture<GamePlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GamePlayComponent, GameStartComponent],
      imports: [SharedModule, NoopAnimationsModule],
      providers: [SocketService],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [GameStartComponent],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    const service = TestBed.inject(SocketService);
    service.connect(io);
    fixture = TestBed.createComponent(GamePlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

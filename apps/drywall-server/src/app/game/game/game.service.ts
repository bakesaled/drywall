import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  public addGame() {}
  private runGameCycle() {
    setTimeout(() => {
      this.runGameCycle();
    }, 1000);
  }
}

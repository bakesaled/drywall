import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { Hand } from '@drywall/shared/data-access';

@Injectable()
export class HandService {
  private words = ['piggy', 'cow', 'sheep'];

  generateHand(): Hand {
    return {
      id: uuid.v1(),
      word: this.words[Math.floor(Math.random() * this.words.length)],
    };
  }
}

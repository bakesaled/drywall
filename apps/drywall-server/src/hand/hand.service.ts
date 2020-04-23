import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { Hand } from '@drywall/shared/data-access';

@Injectable()
export class HandService {
  private hands = [];

  generateHand(): Hand {
    return {
      id: uuid.v1(),
      word: 'pig',
    };
  }
}

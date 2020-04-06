import { Injectable } from '@nestjs/common';
import { PlatformModel } from '../../models/platform.model';

@Injectable()
export class PlatformService {
  private platforms: PlatformModel[];

  constructor() {
    this.platforms = [];
  }

  addPlatform(platform: PlatformModel) {
    this.platforms.push(platform);
  }
}

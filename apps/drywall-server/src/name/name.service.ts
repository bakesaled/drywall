import { Injectable } from '@nestjs/common';

@Injectable()
export class NameService {
  private usedNames: Set<string> = new Set();
  constructor() {}

  clear() {
    this.usedNames.clear();
  }

  getName(prefix: string) {
    let name: string;
    do {
      name = this.generateName(prefix);
    } while (this.usedNames.has(name));

    this.usedNames.add(name);
    return name;
  }

  private generateName(prefix: string): string {
    return `${prefix} ${this.getRandomNumber()}`;
  }

  private getRandomNumber() {
    return Math.floor(Math.random() * 1000);
  }
}

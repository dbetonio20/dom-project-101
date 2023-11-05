/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GameDataService } from './game-data.service';

describe('Service: GameData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameDataService]
    });
  });

  it('should ...', inject([GameDataService], (service: GameDataService) => {
    expect(service).toBeTruthy();
  }));
});

import { Component, Input } from '@angular/core';
import { IPercept, WaterReq, WaterReqNumMap, ICommand, IPlant, Level, Action, LevelNumMap } from '../agent-model';

@Component({
  selector: 'app-known-plants',
  templateUrl: './known-plants.component.html',
  styleUrls: ['./known-plants.component.scss']
})
export class KnownPlantsComponent {
  @Input() plantList: IPlant[] = [];
}

import { Component } from '@angular/core';
import { AgentModel } from '../agent-data';
import { MatDialog } from '@angular/material/dialog';
import { IPercept, WaterReq, WaterReqNumMap, ICommand, IPlant, Level, Action, LevelNumMap } from '../agent-model';
import { AddPerceptDialogComponent } from '../add-percept-dialog/add-percept-dialog.component';


@Component({
  selector: 'app-agent-gardener',
  templateUrl: "./agent-gardener.component.html",
  styleUrls: ['./agent-gardener.component.scss']
})
export class AgentGardenerComponent {

  // perceptDialogRef: any;
  currentPercept: IPercept | undefined;
  currentCommand: ICommand | undefined;
  perceptTrace: IPercept[] = [];
  commandTrace: ICommand[] = [];
  knownPlants: IPlant[] = AgentModel.knownPlants;




  constructor(public perceptDialog: MatDialog) { }

  openPerceptEntryDialog(): void {
    const perceptDialogRef = this.perceptDialog.open(AddPerceptDialogComponent);

    perceptDialogRef.afterClosed().subscribe((result: { data: IPercept; }) => {
      console.log('from dialog', result.data);

      if (result.data.species !== '') {
        this.currentPercept = result.data;
        this.generateCommand(result.data);
        this.addPerceptTrace(this.currentPercept);

      } else {
        window.alert("Unable to identify species!!!");
        return;
      }
    })
  }

  addPerceptTrace(percept: IPercept): void {
    this.perceptTrace.push(percept);
  }

  generateCommand(percept: IPercept): void {
    const currentPlantRequirement = AgentModel.knownPlants.find(element => element.species === percept.species);
    if (currentPlantRequirement === undefined) {
      return;
    }

    const newCommand: ICommand = {
      sprayWater: this.shouldSpray(percept.moisture ?? WaterReq.Dry, currentPlantRequirement),
      illumination: this.getLightLevelControl(percept.illumination ?? Level.Low, currentPlantRequirement),
      applyFertilizer: this.shouldApplyFertilizer(percept.illumination ?? Level.Low, currentPlantRequirement),
      temperature: this.getTemperatureLevelControl(percept.temperature ?? Level.Low, currentPlantRequirement),
    }

    this.currentCommand = newCommand;

    this.addCommandTrace(newCommand);
  }

  shouldSpray(currentWaterReq: WaterReq, currentPlantRequirement: IPlant): boolean {
    const currentWaterReqNum = WaterReqNumMap[currentWaterReq];
    const idealWaterReqNum = WaterReqNumMap[currentPlantRequirement.waterReq];
    if (currentWaterReqNum === 0) return true;
    if ((currentWaterReqNum < idealWaterReqNum)) return true;
    return false;
  }

  shouldApplyFertilizer(currentNutrientLevel: Level, currentPlantRequirement: IPlant): boolean {
    const currentnutrientLevelNum = LevelNumMap[currentNutrientLevel];
    const idealnutrientLevelNum = LevelNumMap[currentPlantRequirement.nutrient];

    if ((currentnutrientLevelNum < idealnutrientLevelNum)) return true;
    if ((currentnutrientLevelNum == idealnutrientLevelNum)) return false;

    return false;
  }

  getTemperatureLevelControl(currentTemperatureLevel: Level, currentPlantRequirement: IPlant): Action {
    const currenttemperatureLevelNum = LevelNumMap[currentTemperatureLevel];
    const idealtemperatureLevelNum = LevelNumMap[currentPlantRequirement.temperature];

    if ((currenttemperatureLevelNum < idealtemperatureLevelNum)) return Action.Increase;
    if ((currenttemperatureLevelNum == idealtemperatureLevelNum)) return Action.Maintain;

    return Action.Decrease;
  }

  getLightLevelControl(currentLightLevel: Level, currentPlantRequirement: IPlant): Action {
    const currentLightLevelNum = LevelNumMap[currentLightLevel];
    const idealLightLevelNum = LevelNumMap[currentPlantRequirement.lightLevel];

    if ((currentLightLevelNum < idealLightLevelNum)) return Action.Increase;
    if ((currentLightLevelNum == idealLightLevelNum)) return Action.Maintain;

    return Action.Decrease;
  }

  addCommandTrace(command: ICommand): void {
    this.commandTrace.push(command);
    const myObj = {
      id: this.commandTrace.length,
      sprayWater: command.sprayWater,
      illumination: command.illumination,
      applyFertilizer: command.applyFertilizer,
      temperature: command.temperature,
    }
    // this.commandTraceWithIndex.push(myObj);

  }



  // ngOnDestroy(): void {
  //   this.perceptDialogRef.afterClosed().unsubscribe();
  // }
}

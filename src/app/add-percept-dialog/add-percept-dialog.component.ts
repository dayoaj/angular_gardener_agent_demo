import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WaterReq, LeaveColor, Level, LeaveColorLabelMapping, WaterReqMapping, LevelMapping, IPercept } from '../agent-model';
import { AgentModel } from '../agent-data';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-percept-dialog',
  templateUrl: './add-percept-dialog.component.html',
  styleUrls: ['./add-percept-dialog.component.scss']
})
export class AddPerceptDialogComponent {

  waterReq = WaterReq;
  leaveColor = LeaveColor;
  level = Level;

  constructor(public dialogRef: MatDialogRef<AddPerceptDialogComponent>) { }

  public waterReqTypes = Object.values(this.waterReq);
  public leaveColorTypes = Object.values(this.leaveColor);
  public leaveColorLabelMapping = LeaveColorLabelMapping;
  public levelTypes = Object.values(this.level);

  public knownPlants = AgentModel.knownPlants;

  perceptForm = new FormGroup({
    species: new FormControl(''),
    moisture: new FormControl(''),
    height: new FormControl(''),
    leaveColor: new FormControl(''),
    lightLevel: new FormControl(''),
    temperature: new FormControl(''),
    soilPh: new FormControl(''),
  });

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    // console.warn(this.perceptForm.value);
    let newPercept: IPercept | Record<string, never> = {};
    if (this.perceptForm.value.species !== '') {
      newPercept = {
        species: this.perceptForm.value.species ?? '',
        moisture: this.perceptForm.value.moisture ? WaterReqMapping[this.perceptForm.value.moisture] : null,
        height: Number(this.perceptForm.value.height),
        illumination: this.perceptForm.value.lightLevel ? LevelMapping[this.perceptForm.value.lightLevel] : null,
        temperature: this.perceptForm.value.temperature ? LevelMapping[this.perceptForm.value.temperature] : null,
        soilPh: this.perceptForm.value.soilPh ? LevelMapping[this.perceptForm.value.soilPh] : null,
      };

    }


    this.dialogRef.close({ data: newPercept });
  }



}

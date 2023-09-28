export interface IAgentModel {
    id: string,
    knownPlants: IPlant[],
    currentPercept: IPercept,
    perceptSequence: IPercept[],
    currentCommand: ICommand,
    commandSequence: ICommand[],
}

export interface IPlant {
    species: string,
    nickName: string,
    leaveColor: LeaveColor,
    waterReq: WaterReq,
    height: number,
    lightLevel: Level,
    temperature: Level,
    nutrient: Level,
}

export interface IPercept {
    species: string,
    moisture: WaterReq | null | undefined,
    height: number | null | undefined,
    illumination: Level | null | undefined,
    temperature: Level | null | undefined,
    soilPh: Level | null | undefined,
}

export interface ICommand {
    sprayWater: boolean,
    illumination: Action,
    applyFertilizer: boolean,
    temperature: Action
}

export enum WaterReq {
    Dry = "Dry",
    Moist = "Moist",
    Wet = "Wet",
}

export enum Action {
    Increase = "Increase",
    Decrease = "Decrease",
    Maintain = "Maintain",
}

// export const ActionLabelMapping: Record<Action, string> = {
//     [Action.Increase]: "Green",
//     [Action.LightGreen]: "Light Green",
//     [Action.Lime]: "Lime",
// };

export enum LeaveColor {
    Green = "Green",
    LightGreen = "LightGreen",
    Lime = "Lime"
}

export const LeaveColorLabelMapping: Record<LeaveColor, string> = {
    [LeaveColor.Green]: "Green",
    [LeaveColor.LightGreen]: "Light Green",
    [LeaveColor.Lime]: "Lime",
};

export enum Level {
    Low = "Low",
    Medium = "Medium",
    High = "High",
}

export const WaterReqMapping: Record<string, WaterReq> = {
    ["Dry"]: WaterReq.Dry,
    ["Moist"]: WaterReq.Moist,
    ["Wet"]: WaterReq.Wet,
}

export const WaterReqNumMap: Record<WaterReq, number> = {
    [WaterReq.Dry]: 0,
    [WaterReq.Moist]: 1,
    [WaterReq.Wet]: 2,
}

export const LevelMapping: Record<string, Level> = {
    "Low": Level.Low,
    "Medium": Level.Medium,
    "High": Level.High,
}

export const LevelNumMap: Record<Level, number> = {
    [Level.Low]: 0,
    [Level.Medium]: 1,
    [Level.High]: 2,
}


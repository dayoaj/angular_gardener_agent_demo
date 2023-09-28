import { IAgentModel, ICommand, IPercept, LeaveColor, Level, WaterReq } from './agent-model';

export const AgentModel: IAgentModel = {
    id: 'Gardener',
    knownPlants: [
        {
            species: "Chlorophytum elatum",
            nickName: "Spider Plant",
            leaveColor: LeaveColor.Lime,
            waterReq: WaterReq.Moist,
            height: 2,
            lightLevel: Level.High,
            temperature: Level.Medium,
            nutrient: Level.Medium,
        },
        {
            species: "Cordyline fruticosa",
            nickName: "Ti plant",
            leaveColor: LeaveColor.Green,
            waterReq: WaterReq.Moist,
            height: 6,
            lightLevel: Level.Medium,
            temperature: Level.Medium,
            nutrient: Level.Medium,
        },
        {
            species: "Sansevieria sp.",
            nickName: "Snake Plant",
            leaveColor: LeaveColor.LightGreen,
            waterReq: WaterReq.Dry,
            height: 5,
            lightLevel: Level.Low,
            temperature: Level.Medium,
            nutrient: Level.Low,
        },
    ],
    currentPercept: {} as IPercept,
    perceptSequence: [],
    currentCommand: {} as ICommand,
    commandSequence: []
};


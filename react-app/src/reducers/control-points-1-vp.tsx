import { AppAction, ActionTypes } from '../actions';
import { ControlPointsState1VP, VanishingPointControlState } from '../types/control-points-state';
import { CalibrationMode } from '../types/global-settings';
import { defaultControlPointsState1VP } from '../defaults/control-points-state';

export function controlPointsState1VP(state: ControlPointsState1VP, action: AppAction): ControlPointsState1VP {
  if (state === undefined) {
    return {
      ...defaultControlPointsState1VP
    }
  }

  //Early exit if the action is associated with the wrong calibration mode
  if ((action as any).calibrationMode == CalibrationMode.TwoVanishingPoints) {
    return state
  }

  switch (action.type) {
    case ActionTypes.ADJUST_HORIZON:
      let updatedHorizon = { ...state.horizon }
      updatedHorizon[action.controlPointIndex] = action.position
      return {
        ...state,
        horizon: updatedHorizon
      }
    case ActionTypes.SET_ORIGIN:
      return {
        ...state,
        origin: action.position
      }

    case ActionTypes.SET_PRINCIPAL_POINT:
      return {
        ...state,
        principalPoint: action.position
      }

    case ActionTypes.ADJUST_VANISHING_LINE:

      let adjustedVanishingPoints: [VanishingPointControlState] = [
        { ...state.vanishingPoints[0] }
      ]
      let adjustedVanishingPoint = adjustedVanishingPoints[action.vanishingPointIndex]
      let adjustedVanishingLine = adjustedVanishingPoint.vanishingLines[action.vanishingLineIndex]
      adjustedVanishingLine[action.controlPointIndex] = action.position

      return {
        ...state,
        vanishingPoints: adjustedVanishingPoints
      }
  }

  return state;
}
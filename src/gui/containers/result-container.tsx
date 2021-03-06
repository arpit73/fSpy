import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { AppAction, setExportDialogVisibility, setCameraPreset, setCameraSensorSize, setFieldOfViewDisplayFormat, setOrientationDisplayFormat, setPrincipalPointDisplayFormat } from '../actions'

import { ImageState } from '../types/image-state'
import { StoreState } from '../types/store-state'
import ResultPanel from '../components/result-panel/result-panel'
import { SolverResult } from '../solver/solver-result'
import { CalibrationSettingsBase } from '../types/calibration-settings'
import { GlobalSettings } from '../types/global-settings'
import { FieldOfViewFormat, OrientationFormat, PrincipalPointFormat, ResultDisplaySettings } from '../types/result-display-settings'

interface ResultContainerProps {
  isVisible: boolean
  globalSettings: GlobalSettings
  calibrationSettings: CalibrationSettingsBase
  solverResult: SolverResult
  resultDisplaySettings: ResultDisplaySettings
  image: ImageState

  onExportClicked(): void
  onCameraPresetChange(cameraPreset: string | null): void
  onSensorSizeChange(width: number | undefined, height: number | undefined): void
  onFieldOfViewDisplayFormatChanged(displayFormat: FieldOfViewFormat): void
  onOrientationDisplayFormatChanged(displayFormat: OrientationFormat): void
  onPrincipalPointDisplayFormatChanged(displayFormat: PrincipalPointFormat): void
}

class ResultContainer extends React.PureComponent<ResultContainerProps> {
  render() {
    if (!this.props.isVisible) {
      return null
    }

    return (
      <ResultPanel
        globalSettings={this.props.globalSettings}
        calibrationSettings={this.props.calibrationSettings}
        solverResult={this.props.solverResult}
        resultDisplaySettings={this.props.resultDisplaySettings}
        image={this.props.image}
        onExportClicked={this.props.onExportClicked}
        onCameraPresetChange={this.props.onCameraPresetChange}
        onSensorSizeChange={this.props.onSensorSizeChange}
        onFieldOfViewDisplayFormatChanged={this.props.onFieldOfViewDisplayFormatChanged}
        onOrientationDisplayFormatChanged={this.props.onOrientationDisplayFormatChanged}
        onPrincipalPointDisplayFormatChanged={this.props.onPrincipalPointDisplayFormatChanged}
      />
    )
  }
}

export function mapStateToProps(state: StoreState) {
  return {
    globalSettings: state.globalSettings,
    calibrationSettings: state.calibrationSettingsBase,
    calibrationMode: state.globalSettings.calibrationMode,
    solverResult: state.solverResult,
    resultDisplaySettings: state.resultDisplaySettings,
    image: state.image
  }
}

export function mapDispatchToProps(dispatch: Dispatch<AppAction>) {
  return {
    onExportClicked: () => {
      dispatch(setExportDialogVisibility(true))
    },
    onCameraPresetChange: (cameraPreset: string | null) => {
      dispatch(setCameraPreset(cameraPreset))
    },
    onSensorSizeChange: (width: number | undefined, height: number | undefined) => {
      dispatch(setCameraSensorSize(width, height))
    },
    onFieldOfViewDisplayFormatChanged: (displayFormat: FieldOfViewFormat) => {
      dispatch(setFieldOfViewDisplayFormat(displayFormat))
    },
    onOrientationDisplayFormatChanged: (displayFormat: OrientationFormat) => {
      dispatch(setOrientationDisplayFormat(displayFormat))
    },
    onPrincipalPointDisplayFormatChanged: (displayFormat: PrincipalPointFormat) => {
      dispatch(setPrincipalPointDisplayFormat(displayFormat))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultContainer)

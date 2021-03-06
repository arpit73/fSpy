import * as React from 'react'
import { cameraPresets } from '../../solver/camera-presets'
import { CameraData } from '../../types/calibration-settings'
import strings from '../../strings/strings'
import Dropdown from './dropdown'

export interface CameraPresetsDropdownProps {
  cameraData: CameraData
  onPresetChanged(presetId: string | null): void
}

export default function CameraPresetsDropdown(props: CameraPresetsDropdownProps) {

  let ids: (string | null)[] = []
  for (let id in cameraPresets) {
    ids.push(id)
  }
  ids.sort()
  ids.unshift(null)

  return (
    <div>
      <Dropdown
        options={
          ids.map(
            (id: string | null) => {
              return {
                value: id,
                id: id === null ? 'null' : id,
                title: id === null ? strings.customCameraPresetName : cameraPresets[id].displayName
              }
            }
          )
        }
        selectedOptionId={props.cameraData.presetId === null ? 'null' : props.cameraData.presetId}
        onOptionSelected={props.onPresetChanged}
      />
    </div>
  )
}

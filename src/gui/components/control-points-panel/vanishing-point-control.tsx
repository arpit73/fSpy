import * as React from 'react'
import ControlLine from './control-line'
import ControlPoint from './control-point'
import { Group } from 'react-konva'
import { VanishingPointControlState } from '../../types/control-points-state'
import Point2D from '../../solver/point-2d'

interface VanishingPointControlProps {
  color: string
  controlState: VanishingPointControlState
  vanishingPoint: Point2D | null

  onControlPointDrag(
    lineSegmentIndex: number,
    pointPairIndex: number,
    position: Point2D
  ): void
}

export default class VanishingPointControl extends React.PureComponent<VanishingPointControlProps> {
  render() {
    return (
      <Group>
        {this.renderLineSegment(0)}
        {this.renderLineSegment(1)}
        {this.renderVanishingPoint()}
      </Group>
    )
  }

  private renderLineSegment(index: number) {
    return (
      <Group>
        <ControlLine
          start={this.props.controlState.lineSegments[index][0]}
          end={this.props.controlState.lineSegments[index][1]}
          color={this.props.color}
        />
        <ControlPoint
          absolutePosition={this.props.controlState.lineSegments[index][0]}
          onControlPointDrag={(position: Point2D) => {
            this.props.onControlPointDrag(index, 0, position)
          }}
          fill={this.props.color}
        />
        <ControlPoint
          absolutePosition={this.props.controlState.lineSegments[index][1]}
          onControlPointDrag={(position: Point2D) => {
            this.props.onControlPointDrag(index, 1, position)
          }}
          fill={this.props.color}
        />
      </Group>
    )
  }

  private renderVanishingPoint() {
    return null
    /*
    if (this.props.vanishingPoint === null) {
      return null
    }

    let p1 = MathUtil.lineSegmentMidpoint(
      this.props.controlState.lineSegments[0]
    )
    let p2 = this.props.vanishingPoint
    let p3 = MathUtil.lineSegmentMidpoint(
      this.props.controlState.lineSegments[1]
    )
    return (
      <Line
        points={p1.x + ', ' + p1.y + ' ' + p2.x + ', ' + p2.y + ' ' + p3.x + ', ' + p3.y}
        fill='none'
        stroke={this.props.color}

        opacity={0.5}
      />
    )*/
  }
}
import { fabric } from 'fabric'
import { type Component, onMount } from 'solid-js'
import { Signal } from './_utils'

interface Props_canvas {
	width: number
	height: number
	on_ready(fabric_canvas: fabric.Canvas): void
}

const Canvas: Component<Props_canvas> = props => {
	return raw
}

export
function make_canvas(width: number, height: number) {
	const fabric_canvas = Signal<null | fabric.Canvas>(null)
	const cmp = <Canvas
		width={width}
		height={height}
		on_ready={fabric_canvas.set}
	/>

	return {
		cmp,
		fabric_canvas: fabric_canvas.get,
	}
}

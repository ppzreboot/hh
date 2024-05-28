import { fabric } from 'fabric'
import { type Component, onMount } from 'solid-js'
import { useCTX_set_fabric_canvas } from './context'

interface Props_canvas {
	width: number
	height: number
	on_ready?: (canvas: HTMLCanvasElement) => void
}

export
const Canvas: Component<Props_canvas> = props => {
	let raw_canvas: HTMLCanvasElement
	const set_canvas = useCTX_set_fabric_canvas()
	if (!set_canvas)
		throw Error('no hh context provider')

	onMount(() => {
		const f = new fabric.Canvas(raw_canvas)
		f.preserveObjectStacking = true
		set_canvas(f)
		if (props.on_ready)
			props.on_ready(f.getContext().canvas)
	})
	return <div
		class='canvas_wrapper'
		style={`width: ${props.width}px; height: ${props.height}px;`}
	>
		<canvas ref={raw_canvas!} width={props.width} height={props.height} />
	</div>
}

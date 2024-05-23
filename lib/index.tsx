import { type Component, onMount } from 'solid-js'
import { fabric } from 'fabric'
import { Signal } from './_utils'
import './index.css'

interface Props_HH {
	width: number
	height: number
}

let layer_index = 0
class Layer {
	layer_index = (++layer_index) * 10000 // 一个 layer 里能超过 10000 个？
	shown = true
	private child_index = 0
	private list: fabric.Object[] = []

	constructor(
		private f_canvas: fabric.Canvas
	) {}

	push(obj: fabric.Object) {
		this.list.push(obj)
		this.f_canvas.add(obj)
		obj.moveTo(this.next_child_index())
	}
	private next_child_index() {
		return this.layer_index + ++this.child_index
	}
	hide() {
		this.shown = false
		for (const obj of this.list)
			this.f_canvas.remove(obj)
	}
	show() {
		this.shown = true
		for (const obj of this.list) {
			this.f_canvas.add(obj)
			obj.moveTo(this.next_child_index())
		}
	}
}

export
const HH: Component<Props_HH> = props => {
	let raw_canvas: HTMLCanvasElement
	const fabric_canvas = Signal<null | fabric.Canvas>(null)
	const current_layer = Signal<null | Layer>(null)
	const layer_list = Signal<null | Layer[]>(null)

	onMount(() => {
		const f_instance = new fabric.Canvas(raw_canvas)
		fabric_canvas.set(f_instance)
		const layer1 = new Layer(f_instance)
		const layer2 = new Layer(f_instance)
		const layer3 = new Layer(f_instance)
		current_layer.set(layer1)
		layer_list.set([layer1, layer2, layer3])
	})

	function Add_basic(new_obj: () => Awaited<fabric.Object>) {
		return () => {
			current_layer.get()!.push(new_obj())
		}
	}

	function SelectLayer(index: number) {
		return () => {
			current_layer.set(layer_list.get()![index])
		}
	}
	function ShowLayer(index: number) {
		return () => {
			const layer = layer_list.get()![index]
			layer.shown ? layer.hide() : layer.show()
		}
	}
	return <div>
		<div class='hh_adder'>
			<button onclick={Add_basic(() =>
				new fabric.Rect({
					width: 40,
					height: 40,
					fill: 'red',
				}))}>Rect</button>	
			<button onclick={Add_basic(() =>
				new fabric.Triangle({
					width: 50,
					height: 50,
					fill: 'red',
				})
			)}>Tria</button>
			<button onclick={Add_basic(() =>
				new fabric.Text('Click to Edit')
			)}>Text</button>
		</div>
		<div class="layer_selector">
			<ul>
				<li>
					<span>layer1</span>
					<label>selected<input type="checkbox" checked={current_layer.get() === layer_list.get()?.[0]} onchange={SelectLayer(0)}></input></label>
					<label>shown<input type="checkbox" checked={true} onchange={ShowLayer(0)}></input></label>
				</li>
				<li>
					<span>layer2</span>
					<label>selected<input type="checkbox" checked={current_layer.get() === layer_list.get()?.[1]} onchange={SelectLayer(1)}></input></label>
					<label>shown<input type="checkbox" checked={true} onchange={ShowLayer(1)}></input></label>
				</li>
				<li>
					<span>layer3</span>
					<label>selected<input type="checkbox" checked={current_layer.get() === layer_list.get()?.[2]} onchange={SelectLayer(2)}></input></label>
					<label>shown<input type="checkbox" checked={true} onchange={ShowLayer(2)}></input></label>
				</li>
			</ul>
		</div>
		<canvas ref={raw_canvas!} width={props.width} height={props.height} />
	</div>
}

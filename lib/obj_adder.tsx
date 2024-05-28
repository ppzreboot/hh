import { fabric } from 'fabric'
import { type Component, ParentComponent } from 'solid-js'
import { useCTX_canvas } from './context'

interface Props_item {
	new_obj(): fabric.Object
}
const Item: ParentComponent<Props_item> = props => {
	const ctx= useCTX_canvas()
	if (!ctx) throw Error('no hh context provider')
	return <li>
		<button onClick={() => {
			const obj = props.new_obj()
			obj.on('selected', () => {
				ctx.select(obj)
			})
			ctx.add(obj)
		}}>{props.children}</button>
	</li>
}

interface Props_add_el {
	rect?: any
	tria?: any
	circ?: any
	text?: any
}

const random_color = () => {
	const r = () => Math.floor(Math.random() * 256)
	return `rgb(${r()}, ${r()}, ${r()})`
}

export
const Obj_adder: Component<Props_add_el> = props => {
	return <div class='obj_adder_container'>
		<ul>
			<Item new_obj={() =>
				new fabric.Rect({
					width: 50,
					height: 50,
					fill: random_color(),
				})}
			>{props.rect || 'Rect'}</Item>
			<Item new_obj={() =>
				new fabric.Triangle({
					fill: random_color(),
					width: 60,
					height: 60,
				})}
			>{props.tria || 'Triangle'}</Item>
			<Item new_obj={() =>
				new fabric.Circle({
					fill: random_color(),
					radius: 35,
				})}
			>{props.circ || 'Circle'}</Item>
			<Item new_obj={() =>
				new fabric.Textbox('Click to Edit', {
					fill: random_color(),
					fontSize: 22,
				})}
			>{props.text || 'Text'}</Item>
		</ul>
	</div>
}

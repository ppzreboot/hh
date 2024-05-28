import { fabric } from 'fabric'
import { type Component } from 'solid-js'
import { useCTX_add_obj } from './context'

interface Props_add_el {
	rect?: any
	text?: any
}

const random_color = () => {
	const r = () => Math.floor(Math.random() * 256)
	return `rgb(${r()}, ${r()}, ${r()})`
}

export
const Obj_adder: Component<Props_add_el> = props => {
	const add = useCTX_add_obj()
	if (!add) throw Error('no hh context provider')
	return <div>
		<ul>
			<li>
				<button onClick={() =>
					add(new fabric.Rect({
						width: 30,
						height: 30,
						fill: random_color(),
					}))
				}>{props.rect || 'Rect'}</button>
			</li>
			<li>
				<button onClick={() =>
					add(new fabric.Textbox('Click to Edit', {
						fill: random_color(),
					}))
				}>{props.text || 'Text'}</button>
			</li>
		</ul>
	</div>
}

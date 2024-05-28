import { Show, createEffect, type Component } from 'solid-js'
import rgb2hex from 'rgb-hex'
import { useCTX_canvas } from './context'
import { Signal } from './_utils'

export
const Obj_opts: Component = () => {
	const ctx = useCTX_canvas()
	if (!ctx) throw Error('no hh context provider')

	const obj = () => ctx?.selected_obj.get()

	const fill = Signal<string>('')
	createEffect(() => { // 换新 obj 时，更新 color input
		const _obj = obj()
		if (!_obj) return
		fill.set('#' + rgb2hex(_obj.fill as string))
	})

	return <div class='obj_opts_container'>
		<Show when={obj()}>
			<ul>
				<li>
					<input
						type='color'
						value={fill.get()}
						onInput={evt => {
							const new_color = evt.target.value
							// console.log({ new_color })
							fill.set(new_color)
							obj()!.set('fill', new_color)
							ctx.render_all()
						}}
					/>
				</li>
				<li>
					<button onClick={() => {
						ctx.remove(obj()!)
					}}>x</button>
				</li>
			</ul>
		</Show>
	</div>
}

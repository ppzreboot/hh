import { createEffect, createContext, useContext } from 'solid-js'
import { Signal } from '../_utils'
import { I_layer, I_layer_mng } from './layer'

export
function make_canvas_ctx(layer: I_layer_mng) {
	const canvas = Signal.null<fabric.Canvas>()
	const layer_map_objs = new Map<I_layer, fabric.Object[]>()
	const incr_index = function() {
		let index = 0
		return {
			get: () => ++index,
			reset: () => index = 0,
		}
	}()

	createEffect(
		/** 重画，在“layer 变化”时 */
		function repaint() {
			console.log('repainting canvas')
			const f_canvas = canvas.get()
			if (!f_canvas) return

			f_canvas.clear()
			incr_index.reset()
			layer.layers.forEach((l, layer_index) => {
				if (!l.show) return // 隐藏的 layer
				const objs = layer_map_objs.get(l)
				if (!objs) return // 没有 objs 的 layer
				for (const obj of objs) {
					f_canvas.add(obj)
					obj.moveTo(layer_index * 1000 + incr_index.get())
				}
			})
		}
	)


	return {
		canvas,
		add(obj: fabric.Object) {
			// 添加 obj 到 canvas
			canvas.get()!.add(obj)
			const index = layer.current * 1000 + incr_index.get()
			obj.moveTo(index)
			console.log('adding obj to', index)

			// 记录 obj 位置
			const current_layer = layer.layers[layer.current]
			let objs = layer_map_objs.get(current_layer)
			if (!objs) {
				objs = []
				layer_map_objs.set(current_layer, objs)
			}
			objs.push(obj)
		},
	}
}

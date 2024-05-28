import { createEffect, createContext, useContext } from 'solid-js'
import { Signal } from '../_utils'
import { I_layer, I_layer_mng } from './layer'

export
function make_canvas_ctx(layer: I_layer_mng) {
	const canvas = Signal.null<fabric.Canvas>()
	const selected_obj = Signal.null<fabric.Object>()
	const layer_map_objs = new Map<I_layer, fabric.Object[]>()

	/** 重画，在“layer 变化”时 */
	function repaint() {
		// console.log('repainting canvas')
		const f_canvas = canvas.get()
		if (!f_canvas) return

		f_canvas.clear()
		layer.layers.forEach(l => {
			if (!l.show) return // 隐藏的 layer
			const objs = layer_map_objs.get(l)
			if (!objs) return // 没有 objs 的 layer
			for (const obj of objs) {
				f_canvas.add(obj)
			}
		})
	}
	createEffect(repaint)

	return {
		canvas,
		selected_obj,
		add(obj: fabric.Object) {
			// 记录 obj 位置
			const current_layer = layer.layers[layer.current]
			let objs = layer_map_objs.get(current_layer)
			if (!objs) {
				objs = []
				layer_map_objs.set(current_layer, objs)
			}
			objs.push(obj)

			// 拆了重建
			// console.log('adding obj')
			repaint()
		},
		select(obj: fabric.Object) {
			selected_obj.set(obj)
		},
		render_all() {
			canvas.get()!.renderAll()
		},
	}
}

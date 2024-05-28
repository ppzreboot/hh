import { createContext, ParentComponent, useContext } from 'solid-js'
import { make_layer_ctx } from './layer'
import { make_canvas_ctx } from './canvas'

function make_ctx() {
	const layer = make_layer_ctx()
	const canvas = make_canvas_ctx(layer.store)
	return {
		layer,
		canvas,
	}
}

const hh_ctx = createContext<ReturnType<typeof make_ctx>>()

export
const HH_ctx_provider: ParentComponent = props =>
	<hh_ctx.Provider value={make_ctx()}>{props.children}</hh_ctx.Provider>

export
const useCTX_set_fabric_canvas = () =>
	useContext(hh_ctx)?.canvas.canvas.set

export
const useCTX_add_obj = () =>
	useContext(hh_ctx)?.canvas.add

export
const useCTX_layer = () =>
	useContext(hh_ctx)?.layer

import { createContext, ParentComponent, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'

interface I_layer {
	name: string
	show: boolean
}
interface I_layer_mng {
	/** 当前 layer，新添加元素会到此 layer */
	current: number
	layers: I_layer[]
}
function make_layer_ctx() {
	const [store, set_store] = createStore<I_layer_mng>({
		current: 0,
		layers: [{
			name: 'layer-1',
			show: true,
		}],
	})
	return {
		store,
		sort(from: number, to: number) {
			const new_list = store.layers
			new_list[from], new_list[to] = new_list[to], new_list[from]
			set_store('layers', new_list)
		},
		select(index: number) {
			set_store('current', index)
		},
		rename(index: number, name: string) {
			set_store('layers', index, 'name', name)
		},
		show(index: number, show: boolean) {
			set_store('layers', index, 'show', show)
		},
		drop(index: number) {
			set_store('layers', list => list.filter((_, i) => i != index))
		},
		new_layer() {
			set_store('layers', store.layers.length, {
				name: 'layer-' + (store.layers.length + 1),
				show: true,
			})
		},
	}
}

const Layer_mng_ctx = createContext<ReturnType<typeof make_layer_ctx>>()

export
const Layer_mng_provider: ParentComponent = props => {
	const ctx = make_layer_ctx()
	return <Layer_mng_ctx.Provider value={ctx}>{props.children}</Layer_mng_ctx.Provider>
}

export
function useLayer_mng_ctx() {
	return useContext(Layer_mng_ctx)
}

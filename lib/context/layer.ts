import { createStore } from 'solid-js/store'

export
interface I_layer {
	name: string
	show: boolean
}

export
interface I_layer_mng {
	/** 当前 layer，新添加元素会到此 layer */
	current: number
	layers: I_layer[]
}

export
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
			const list = store.layers.slice()
			if (from > to) // 下面的往上移
				list.splice(to, 0,
					...list.splice(from, 1)
				)
			else { // 上面的往下移
				list.splice(to + 1, 0, list[from])
				list.splice(from, 1)
			}
			console.log({ from, to, list })
			set_store('layers', list)
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
			if (store.layers.length <= 1)
				console.warn('length of layers less than 1')
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

import { For, Show } from 'solid-js'
import { useCTX_layer } from './context'

interface Props_layer_mng {
	rm?: any
	add?: any
}

export
function Layer_mng(props: Props_layer_mng) {
	const ctx = useCTX_layer()
	if (!ctx) throw Error('No layer manager context provider found')

	let dragging = 0
	return <div class='layer_mng_container'>
		<ul>
			<For each={ctx.store.layers}>{(item, index) =>
				<li
					draggable={true}
					onDragStart={() => {
						dragging = index()
					}}
					onDragOver={evt => {
						evt.preventDefault()
					}}
					onDrop={evt => {
						evt.preventDefault()
						if (index() != dragging)
							ctx.sort(dragging, index())
					}}
					class='layer_item'
					classList={{ selected: ctx.store.current == index()}}
					onClick={() => ctx.select(index())}
					style={{
						display: 'flex',
						'align-items': 'center',
					}}
				>
					<input
						type='checkbox'
						checked={item.show}
						onChange={evt => ctx.show(index(), evt.target.checked)}
					/>
					<input
						style={{
							'font-size': 'inherit',
							flex: 1,
							border: 'none',
							outline: 'none',
							background: 'transparent',
						}}
						value={item.name}
						onChange={evt => ctx.rename(index(), evt.target.value)}
					/>
					<Show when={ctx.store.layers.length > 0}>
						<button
							onclick={() => ctx.drop(index())}
							class='rm_layer'
						>{props.rm || 'x'}</button>
					</Show>
				</li>
			}</For>
		</ul>
		<button
			class='add_layer'
			onClick={ctx.new_layer}
		>{props.add || '+'}</button>
	</div>
}

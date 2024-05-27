import { For, Show } from 'solid-js'
import { useLayer_mng_ctx } from './context/layer'

export
function Layer_mng() {
	const ctx = useLayer_mng_ctx()
	if (!ctx) throw Error('No layer manager context provider found')

	let dragging = 0
	return <div>
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
							style={{
								border: 'none',
								background: 'transparent',
								outline: 'none',
								'font-size': 'inherit',
								width: '1em',
								height: '1em',
							}}
						>x</button>
					</Show>
				</li>
			}</For>
		</ul>
		<button onClick={ctx.new_layer}>+</button>
	</div>
}

import {
	HH_ctx_provider,
	Canvas,
	Layer_mng,
	Obj_adder,
} from '../lib'

export
function App() {
	return <div class='hh_demo'>
		<HH_ctx_provider>
			<Obj_adder />
			<div style={{
				display: 'inline-block',
				'box-shadow': '0 0 10px rgba(0,0,0, .1)',
			}}>
				<Canvas width={500} height={500} />
			</div>
			<Layer_mng
				add='+ new layer'
			/>
		</HH_ctx_provider>
	</div>
}

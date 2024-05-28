import {
	HH_ctx_provider,
	Canvas,
	Layer_mng,
	Obj_adder,
} from '../lib'

export
function App() {
	return <div>
		<HH_ctx_provider>
			<Canvas width={500} height={500} />
			<Layer_mng />
			<Obj_adder />
		</HH_ctx_provider>
	</div>
}

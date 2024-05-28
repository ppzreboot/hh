import { type Component } from 'solid-js'
import {
	HH_ctx_provider,
	Canvas,
	Layer_mng,
	Obj_adder,
	Obj_opts,
} from '..'

import './index.css'

export
const HH_outofbox: Component = () =>
	<div class='hh_outofbox'>
		<HH_ctx_provider>
			<div class='header_opts'>
				<Obj_adder />
				<Obj_opts />
			</div>
			<Canvas width={500} height={500} />
			<Layer_mng
				add='+ new layer'
			/>
		</HH_ctx_provider>
	</div>

import { type Component } from 'solid-js'
import {
	HH_ctx_provider,
	Canvas,
	Layer_mng,
	Obj_adder,
	Obj_opts,
} from '..'

import './index.css'

interface Props_outofbox {
	width?: number
	height?: number
	on_ready?: (canvas: HTMLCanvasElement) => void
}

export
const HH_outofbox: Component<Props_outofbox> = props =>
	<div class='hh_outofbox'>
		<HH_ctx_provider>
			<div class='header_opts'>
				<Obj_adder />
				<Obj_opts />
			</div>
			<Canvas
				width={props.width || 500}
				height={props.height || 500}
				on_ready={props.on_ready}
			/>
			<Layer_mng
				add='+ new layer'
			/>
		</HH_ctx_provider>
	</div>

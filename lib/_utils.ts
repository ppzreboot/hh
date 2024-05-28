import { createSignal } from 'solid-js'

export
const Signal = <Value>(initial_val: Value) => {
	const [get, set] = createSignal(initial_val)
	return { get, set }
}
Signal.null = <Value>() => Signal<Value | null>(null)

export
function exec<Result>(cb: () => Result) {
	return cb()
}

export
const request_file = exec(() => {
	let resolve: (file: File) => void
	const input = document.createElement('input')
	input.type = 'file'
	input.onchange = () => {
		resolve((input.files as FileList)[0])
	}
	return function read() {
		input.click()
		return new Promise<File>(res => {
			resolve = res
		})
	}
})

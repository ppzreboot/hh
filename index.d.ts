declare interface State<Value> {
	get(): Value
	set(v: Value): void
}

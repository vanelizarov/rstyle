import { trim, camelCase, isFunction } from 'lodash'

export function createPipe(initialValue) {
	return function pipe(...fns) {
		return fns.reduce((acc, current) => current(acc), initialValue)
	}
}

export function createRawStyleString(pieces, expressions, props) {
	if (!expressions) {
		return pieces[0]
	}

	let raw = ''

	for (let i = 0; i < pieces.length - 1; ++i) {
		const exp = isFunction(expressions[i]) ? expressions[i](props) : expressions[i]
		raw += pieces[i] + exp
	}

	return raw + pieces[pieces.length - 1]
}

export function createStyleSheet(pieces, expressions, props = {}) {
	const raw = createRawStyleString(pieces, expressions, props)

	return createPipe(raw)(
		removeUnnecessaryBreaks,
		removeUnnecessarySpaces,
		createRulesArray,
		createRulesObject
	)
}

export function createRulesArray(str) {
	return str
		.split(/;/gm)
		.filter(rule => !/^\s*$/g.test(rule))
		.map(rule => trim(rule))
		.map(rule => rule.toLowerCase())
}

export function createRulesObject(rulesArr) {
	return rulesArr.reduce((acc, current) => {
		const [property, value] = current.split(':')

		if (!property || !value) {
			return acc
		}

		return {
			...acc,
			[camelCase(property)]: value
		}
	}, {})
}

export function removeUnnecessaryBreaks(str) {
	return str.replace(/\r|\t|\n/gm, '')
}

export function removeUnnecessarySpaces(str) {
	return str.replace(/\s*:\s*/gm, ':')
}
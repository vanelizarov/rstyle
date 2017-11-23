import React from 'react'
import htmlTagNames from 'html-tag-names'
import { pickHTMLProps } from 'pick-react-known-prop'

import { createStyleSheet, createRawStyleString } from './utils'

export function style(pieces, ...expressions) {
	return createRawStyleString(pieces, expressions)
}

function createElementFactory(tagName) {
	return function createElement(pieces, ...expressions) {
		return props => {
			const filteredProps = pickHTMLProps(props)
			const style = {
				...createStyleSheet(pieces, expressions, props),
				...props.style
			}

			const Replacer = `${tagName}`

			return (
				<Replacer { ...filteredProps } style={ style }>
					{ props.children }
				</Replacer>
			)
		}
	}
}

function rstyle(Component) {
	return function createElement(pieces, ...expressions) {
		return props => {
			const style = createStyleSheet(pieces, expressions, props)

			return <Component { ...props } style={ style }></Component>
		}
	}
}

for (const tagName of htmlTagNames) {
	rstyle[tagName] = createElementFactory(tagName)
}

export default rstyle
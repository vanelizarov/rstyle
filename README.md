# rstyle

Create React components styled with the help of template literals

## Usage

`rstyle` uses template literal syntax to create functional React components with inline styles

Basic example:

```javascript
import React from 'react'
import { render } from 'react-dom'

import rstyle from 'rstyle'

const height = '50px'

const RStyledDiv = rstyle.div`
  font-size: 2rem;
  height: ${height};
`

const root = document.querySelector('#root')

render(
  <RStyledDiv>RStyled!</RStyledDiv>,
  root
)

```

Use props passed to the component to style it:

```javascript
import React from 'react'
import { render } from 'react-dom'

import rstyle, { style } from 'rstyle'

const RStyledButton = rstyle.button`
  font-size: ${props => props.primary ? 4 : 2}rem;

  ${props => props.primary && style`
	  background-color: #2196f3;
	  color: #fff;
  `}
`

const root = document.querySelector('#root')

render(
  <RStyledButton primary onClick={ () => alert('clicked') }>RStyled!</RStyledButton>,
  root
)

```

Use existing component:

```javascript
import React from 'react'
import { render } from 'react-dom'

import rstyle from 'rstyle'

const RStyledDiv = rstyle.div`
  font-size: 2rem;
`

const RStyledExisting = rstyle(RStyleDiv)`
  color: #2196f3;
`

const root = document.querySelector('#root')

render(
  <RStyledExisting>RStyled!</RStyledExisting>,
  root
)

```

## License

Licensed under MIT
See [LICENSE](../blob/master/LICENSE) for more information
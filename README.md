# react-heaven-scroll 🪽

Scroll so smooth, it's like it's made in Heaven.

[![NPM](https://img.shields.io/npm/v/react-heaven-scroll.svg)](https://www.npmjs.com/package/react-heaven-scroll) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install react-heaven-scroll
```

## Usage
Check out the [example](/example/) project, or the demo [here](https://react-heaven-scroll.netlify.app/).

```jsx
import * as React from 'react'
import HeavenScroll from 'react-heaven-scroll'

// Ideally it should be an immediate descendant of the root element
const Component = () => {
    return (
        <HeavenScroll velocity={0.06}>
            ...
        </HeavenScroll>
    )
}
```
---

| Argument    | Type              | Default  | Description                                                            |
| ----------- | ------------------| -------- | -----------------------------------------------------------------------|
| velocity    | number            | 0.1      | A value from 0 to 1 that determines the strength of the effect         |
| style       | style object      | null     | Style object to overide the default styling of the parent element      |
| disable     | boolean           | false    | Whether or not the scroll effect will be enabled                       |
| rootId      | string            | "root"   | The id of the root component to hard set the height                    |
| resetHeight | dependency array  | null     | An array of dependencies to listen for height resetting                |


## API

### useHeaven()
> Returns a react ref created by `useRef()` with the current scroll value and the scroll delta.

```jsx
import * as React from 'react'
import { useHeaven } from 'react-heaven-scroll'

const AnyChildComponent = () => {
    const scroll = useHeaven()
    
    React.useEffect(() => {
        setInterval(() => console.log(scroll), 500)
        // {delta: 0.08175386572542152, scroll: 894.9881211589087}
    }, [])

    return (
        ...
    )
}

```

## LICENSE 

[MIT](LICENCE)

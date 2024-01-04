# react-heaven-scroll

> Scroll so smooth and simple, it&#x27;s like it&#x27;s made in Heaven

[![NPM](https://img.shields.io/npm/v/react-heaven-scroll.svg)](https://www.npmjs.com/package/react-heaven-scroll) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-heaven-scroll
```

## Usage

```jsx
import HeavenScroll from 'react-heaven-scroll'

const Component = () => {
    return (
        <HeavenScroll velocity={0.06}>
            ...
        </HeavenScroll>
    )
}
```

## API

### useHeaven()

```jsx
import { useHeaven } from './heaven-scroll/heaven'

const scroll = useHeaven()

useEffect(() => {
    setInterval(() => console.log(scroll), 500)
    // {delta: 0.08175386572542152, scroll: 894.9881211589087}
}, [])
```

## License

MIT © [](https://github.com/JRoussos/react-heaven-scroll/blob/main/LICENSE)

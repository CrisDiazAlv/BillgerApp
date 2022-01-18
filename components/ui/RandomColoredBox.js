import React from 'react'

import ColoredBox from './ColoredBox'

export default function RandomColoredBox({ children, ...props }) {
  const getRandomColor = () => {
    const colors = ['#2b6777', '#5f2c3e', /*'#f2f2f2',*/ '#52ab98', /*'#f5cac2',*/ '#6db785', '#ef9273', '#de5499']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const color = getRandomColor()

  return (
    <ColoredBox color={color} {...props}>
      {children}
    </ColoredBox>
  )
}

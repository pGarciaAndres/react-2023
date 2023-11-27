import { style } from '@vanilla-extract/css'

export const story = style({
  color: '#666',
})

export const storyHeader = style({
  display: 'flex',
  gap: '8px',
  lineHeight: '24px',
})

export const storyTitle = style({
  textDecoration: 'none',
  color: '#999',
  fontSize: '12px',
})

export const storyFooter = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  lineHeight: '24px',
  fontSize: '9px',
})

export const storyLink = style({
  color: '#999',
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
})

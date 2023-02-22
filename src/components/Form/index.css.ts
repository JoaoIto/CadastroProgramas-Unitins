import { style } from '@vanilla-extract/css';
import { vars } from '../../assets/styles/vars.css'

export const container = style({
  width: '100%',  
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  margin: 0,
  backgroundColor: vars.color.backWhite,
});

export const input = style({
    height: 30,
    width: '70%',
    padding: 10,
    margin: 20,
    border: '5 solid #cacaca'
});
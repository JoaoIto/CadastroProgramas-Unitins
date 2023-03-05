import { style } from '@vanilla-extract/css';
import { vars } from '../../assets/styles/vars.css'

export const container = style({
  width: '100%',  
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '50px 0',
  backgroundColor: vars.color.backWhite,
});

export const input = style({
    height: 40,
    width: '70%',
    fontSize: 18,
    fontFamily: 'Inter',
    padding: 10,
    margin: 20,
    border: '3px solid #cacaca',
    borderRadius: 10,
});

export const labelInput = style({
    fontSize: '1.7rem',
    fontFamily: 'Inter',
});

export const submit = style({
    height: 50,
    width: '50%',
    borderRadius: 10,
    fontSize: '1.5rem',
    backgroundColor: '#2E2784',
    color: '#fff',
    border: '3px solid #0a0a0a'
});
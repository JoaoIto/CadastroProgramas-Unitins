import { style } from '@vanilla-extract/css';

export const header = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    fontFamily: 'Inter',
    width: '100%',
});

export const title = style({
    fontSize: '2.6rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    textShadow: '3px 2px 1px #322785',
    margin: 30,
});

export const subtitle = style({
    textAlign: 'center',
    fontSize: '1.4rem',
});
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

interface ButtonLinkPage {
    title: string;
    link: string;
}

export const ButtonLinkPage = (props: ButtonLinkPage) => {
    return (
        <>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="mt-3 mb-2 bg-blue-700 text-white"
            >
             <Link className='text-white' href={props.link}>{props.title}</Link>
            </Button>
        </>
    )
}
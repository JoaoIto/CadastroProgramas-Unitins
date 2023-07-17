import Link from 'next/link';
import { Button } from '@material-ui/core';

type Props = {
    href?: string;
    children: React.ReactNode;
    uuid?: string;
    onClick?: () => void;
};

const ButtonLinkPage = ({ href, children, uuid, onClick }: Props) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };
    return (
        <Link href={`${href}?uuid=${uuid}`} passHref>
            <Button className="bg-blue-900" type="submit" fullWidth variant="contained" color="primary" onClick={handleClick}>
                {children}
            </Button>
        </Link>
    );
};

export default ButtonLinkPage;

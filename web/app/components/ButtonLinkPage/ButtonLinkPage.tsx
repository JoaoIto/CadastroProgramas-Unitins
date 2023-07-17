import Link from 'next/link';
import { Button } from '@material-ui/core';

type Props = {
    href?: string | void;
    children: React.ReactNode;
    uuid?: string | null | undefined;
    id?: string | null | undefined;
    onClick?: () => void;
};

const ButtonLinkPage = ({ href, children, uuid, id, onClick }: Props) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    const url = `${href}${uuid ? `?uuid=${uuid}` : ''}${id ? `&id=${id}` : ''}`;

    return (
        <Link href={url} passHref>
            <Button
                className="bg-blue-900"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleClick}
            >
                {children}
            </Button>
        </Link>
    );
};

export default ButtonLinkPage;

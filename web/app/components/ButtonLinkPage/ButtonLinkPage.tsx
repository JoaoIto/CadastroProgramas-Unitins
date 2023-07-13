import Link from 'next/link';
import { Button } from '@material-ui/core';

type Props = {
    href: string;
    children: React.ReactNode;
    uuid?: string; // Remova a opção de ser opcional
};

const ButtonLinkPage = ({ href, children, uuid }: Props) => {
    return (
        <Link href={`${href}?uuid=${uuid}`} passHref>
            <Button className="bg-blue-900" type="submit" fullWidth variant="contained">
                {children}
            </Button>
        </Link>
    );
};

export default ButtonLinkPage;

import Link from 'next/link';
import { Button } from '@material-ui/core';

type ButtonLinkPageProps = {
    href?: string;
    children: React.ReactNode;
    uuid?: string;
    onClick?: () => void; // Adicione o tipo SubmitHandler aqui
};

export function ButtonLinkPage({ href, children, uuid, onClick }: ButtonLinkPageProps) {
    const handleClick = () => {
        if (onClick) {
            onClick(); // Executa a função onClick passando os dados do formulário
        }
    };

    return (
        <Link href={`${href}${uuid ? ('?uuid=' + uuid) : ''}`} passHref>
            <Button
                className="bg-blue-900"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleClick} // Passa a função handleSubmit aqui
            >
                {children}
            </Button>
        </Link>
    );
}

export default ButtonLinkPage;

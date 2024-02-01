import Link from 'next/link';
import Button from '@mui/material/Button';
import { Inter } from 'next/font/google'
const inter = Inter({ weight: '400', subsets: ['latin']})
import { Roboto } from 'next/font/google'
const roboto = Roboto({
    weight: '400',
    subsets: ['latin']
})
import { Open_Sans } from "next/font/google";
const openSans = Open_Sans({
    weight: '400',
    subsets: ['latin']
})

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
        <>
        <Link className={`flex justify-center`} href={`${href}${uuid ? ('?uuid=' + uuid) : ''}`} passHref>
            <Button
                className="bg-azulEscuro font-Inter shadow-none"
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleClick} // Passa a função handleSubmit aqui
            >
                {children}
            </Button>
        </Link>
        </>
    );
}

export default ButtonLinkPage;

import Link from 'next/link'
import { Button } from '@material-ui/core'

type Props = {
  href: string
  children: React.ReactNode
}

const ButtonLinkPage = ({ href, children }: Props) => {
  return (
    <Link href={href} passHref>
      <Button className="bg-blue-900" type="submit" fullWidth variant="contained">
        {children}
      </Button>
    </Link>
  )
}

export default ButtonLinkPage;

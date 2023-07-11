import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

interface ButtonLinkPage {
  title: string;
  link: string;
}

export const ButtonLinkPage = (props: ButtonLinkPage) => {
  return (
    <>
      <Link className="text-white" href={props.link}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="mt-3 mb-2 bg-blue-700 text-white"
          onClick={() =>  window.open(props.link)}
        >
          {props.title}
        </Button>
      </Link>
    </>
  );
};

import { makeStyles, createStyles } from "@material-ui/core";

export const personaSmallStyles = makeStyles((theme) =>
    createStyles({
        popover: {
            pointerEvents: 'none',
        },
        paper: {
            padding: theme.spacing(1),
        },
        Persona: {
            cursor: "pointer",
        },
    }),
);
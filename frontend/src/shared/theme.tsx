import { createTheme } from '@material-ui/core/styles'

export const theme  = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
        type:'light'
    },
    overrides: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        MuiButton: {
            root: {
                borderRadius: 100,
                textTransform: "none"
            }
        }
    }
})

export const darkTheme = createTheme({
    palette: {
      background: {
        default: "#fafafa",
      },
      type: 'dark',
    },
    overrides: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        MuiButton: {
            root: {
                borderRadius: 100,
                textTransform: "none"
            },
        },
    }
  });

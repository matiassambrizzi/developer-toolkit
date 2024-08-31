import {IO} from "@matiassambrizzi/app-utils"
import {Button} from "@mui/material"

export const AppButton = (
  props: {
    onClick: IO<void>
    color?: string
    children?: React.ReactNode
    disabled?: boolean
  }
) => {
  return <Button
    variant="contained"
    onClick={props.onClick}
    disabled={props.disabled}
    sx={{
      backgroundColor: props.color
    }}
    children={props.children}
  />
}


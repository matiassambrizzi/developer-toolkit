import {State} from "@matiassambrizzi/app-utils"
import {SearchRounded} from "@mui/icons-material"
import {TextField, InputAdornment} from "@mui/material"

export const SearchBar = (
  props: {
    state: State<string>
  }
) => {
  return (
    <TextField
      variant="outlined"
      placeholder="Buscar..."
      value={props.state.value}
      onChange={(e) => {
        props.state.updater(_ => e.target.value)
      }}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRounded />
          </InputAdornment>
        ),
      }}
    />
  )
}


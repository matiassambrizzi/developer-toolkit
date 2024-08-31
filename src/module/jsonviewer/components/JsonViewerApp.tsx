import ReactJson from 'react-json-view'
import { Stack, TextField, Typography} from '@mui/material'
import {useAppState} from '@matiassambrizzi/app-utils';

type Json = object

const parseJson = (value: string): Json => {
  try {
    const trimmedJson = value.trim();
    const unquotedJson = trimmedJson.startsWith('"') && trimmedJson.endsWith('"')
      ? trimmedJson.slice(1, -1)
      : trimmedJson;

    // Reemplazar las comillas escapadas por comillas normales
    const unescapedJson = unquotedJson
      .replace(/\\"/g, '"')
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t');

    return JSON.parse(unescapedJson)
  } catch (e) {
    console.log(e)
    return {}
  }
}

export const JsonViewerApp = () => {

  const json = useAppState<Json>(() => ({}))

  return (
    <Stack 
      direction={"column"}
      spacing={4}
    > 

      <Typography 
        children="Json prettify"
        variant='h5'
      />
        
      <TextField
        fullWidth
        onChange={
          e => json.updater((__: any) => parseJson(e.target.value))
        }
        multiline
        rows={10}
      />

      <ReactJson
        src={json.value}
        validationMessage="You're doing something wrong."
      />

    </Stack>
  )
}

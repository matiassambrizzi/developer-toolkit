import { Stack} from '@mui/system'
import {Button, Paper, Typography} from '@mui/material'
import {array} from '@mojotech/json-type-validation'
import {exportNotes, Note, noteDecoder, noteNew} from '../notes'
import {SearchBar} from '../../core/components/SerchBar'
import {NoteEditor} from './editor/NoteEditor'
import {access, List, listDeleteElement, useAppState, usePersistState} from '@matiassambrizzi/app-utils'

export const NoteApp = () => {
  const searchTerm = useAppState<string>(() => "")
  const state = usePersistState<List<Note>>(
    () => [],
    "notes",
    array(noteDecoder)
  )
  return (
    <Stack
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <Paper
        sx={{
          height: "100%",
          padding: 5,
          overflow: "auto",
        }}
      >
        <Stack
          direction={"column"}
          spacing={3}
        >
          <Stack
            direction="row"
            spacing={2}
          >
            <SearchBar
              state={searchTerm}
            />

            <Button
              variant="contained"
              onClick={() => exportNotes(state.value)}
            >
              Exportar
            </Button>

            <Button
              variant="contained"
              onClick={() => state.updater(prev => [noteNew(), ...prev])}
            >
              Agregar
            </Button>
          </Stack>

          <Stack direction={"column"}>
            {
              state.value.length === 0 ?
                <Typography variant="h4">No hay notas...</Typography> :
                state.value.map((it, index) =>
                  <NoteEditor
                    key={it.date.toString()}
                    initEdit={index === 0}
                    state={access(state, index)}
                    onDelete={
                      () => {
                        state.updater(listDeleteElement(index))
                      }
                    }
                  />
                )
            }
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  )
}

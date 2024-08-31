import {IO, State} from "@matiassambrizzi/app-utils"
import {Edit, Save} from "@mui/icons-material"
import {Stack, Box, Typography, TextField, IconButton} from "@mui/material"
import {useState} from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import {AppButton} from "../../../core/components/button/AppButton"
import {Note} from "../../notes"

type CurrentView = "editing" | "saved"

export const NoteEditor = (
  props: {
    state: State<Note>
    onDelete: IO<void>
    initEdit: boolean
  }
) => {

  const [view, updateView] = useState<CurrentView>(() => props.initEdit ? "editing" : "saved")
  const [titleView, updateTitleView] = useState<CurrentView>(() => "saved")

  return (
    <Stack
      direction={"column"}
      spacing={3}
      sx={{
        padding: 1
      }}
    >
      <Stack 
        direction={"row"} 
        alignItems="center"
        spacing={2}
      >

        <Box
          sx={{
            flexGrow: 1
          }}
        >
          {
            titleView === "saved" ? (
              <Typography variant="h3">
                {props.state.value.title}
              </Typography>
            ) : (
              <TextField
                variant="outlined"
                value={props.state.value.title}
                fullWidth
                onChange={(e) => props.state.updater(prev => ({...prev, title: e.target.value}))}
              />
            )
          }
        </Box>
        {
          titleView === "saved" ? (
            <IconButton
              onClick={() => updateTitleView("editing")}
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
              }}
            >
              <Edit />
            </IconButton>
          ) : (
              <IconButton
                onClick={() => updateTitleView("saved")}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                }}
              >
              <Save />
            </IconButton>
          )
        }
      </Stack>

      <Typography variant="h6" textAlign={"left"}>
        {props.state.value.date.toString()}  
      </Typography>

      <Box
        sx={{
          overflow: "auto",
        }}
      >
        {
          view === "editing" ? (
            <TextField
              variant="outlined"
              value={props.state.value.content}
              onChange={(e) => props.state.updater(prev => ({...prev, content: e.target.value}))}
              fullWidth
              multiline
            />
          ) : (
            <ReactMarkdown
              rehypePlugins={[remarkGfm]}
              children={props.state.value.content}
              className="markdown-content"
            />
          )
        }
      </Box>

      <Stack direction={"row"} spacing={3}>
        <AppButton 
          onClick={() => updateView("editing")}
          disabled={view==="editing"}
          children="Editar"
        />
        <AppButton 
          onClick={() => updateView("saved")}
          disabled={view==="saved"}
          children="Guardar"
        />
        <AppButton 
          onClick={props.onDelete}
          children="Eliminar"
          color="red"
        />
        <AppButton 
          onClick={() => props.state.updater(it => ({...it, pinned: true}))}
          children="Pin"
          color="red"
        />
      </Stack>
    </Stack>
  )
}

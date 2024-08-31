import {access, List, State, useAppState} from "@matiassambrizzi/app-utils/dist/functional"
import {SearchRounded} from "@mui/icons-material"
import {Button, InputAdornment, Stack, TextField} from "@mui/material"
import {useEffect} from "react"
import {Query, searchOnText} from "../regex"
import {ResultsChart} from "./ResultChart"

export const QueriesEditor = (
  props: {
    state: State<List<string>>
  }
) => {
  return <Stack width={"100%"}>
    <Button onClick={() => props.state.updater(prev => [...prev, ""])}>
      Add query
    </Button>
    {props.state.value.map((_, index) =>
      <SearchBar key={index} state={access(props.state, index)} />
    )}
  </Stack>
}

export const SearchBar = (
  props: {
    state: State<string>
  }
) => {
  return (
    <TextField
      variant="outlined"
      placeholder="Buscar..."
      fullWidth
      onChange={e => props.state.updater(_ => e.target.value)}
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

export const DataScrapperApp = () => {

  const text = useAppState(() => "")
  const query = useAppState<List<string>>(() => [])
  const queryResult = useAppState<List<Query>>(() => [])

  useEffect(
    () => {
      const prevQueries = queryResult.value.map(it => it.query)
      const newQueries = query.value.map(it => {
        const prevIndex = prevQueries.findIndex(prev => prev === it)
        if (prevIndex != -1) {
          return queryResult.value[prevIndex]
        }
        const matches = searchOnText(text.value)(it)()
        return ({query: it, result: matches})
      })
      queryResult.updater(_ => newQueries)
    },
    [query.value]
  )

  return (
    <Stack 
      spacing={2}
      overflow="auto"
      height={"100vh"}
      alignItems="center"
    >

      <QueriesEditor state={query}/>

      <TextField
        fullWidth
        onChange={e => text.updater(_ => e.target.value)}
        multiline
        rows={20}
      />

      <ResultsChart results={queryResult.value} />

    </Stack>
  )
}




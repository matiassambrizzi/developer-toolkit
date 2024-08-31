
import {IO, List} from "@matiassambrizzi/app-utils"
import {Result, runCatching} from "./result"

export type Match = {
  value: string,
  index: number,
  input: string
}

export type Query = {
  query: string,
  result: Result<List<Match>>
}

export const searchOnText = (text: string) => (query: string): IO<Result<List<Match>>> => {
  return runCatching(
    () => {
      const regex = new RegExp(query, "gi")
      if (query !== "" && text !== "") {
        return [...text.matchAll(regex)]
          .map(match => (
            {value: match[0], index: match.index ?? 0, input: match.input ?? ""}
          ))
      }
      return []
    }
  )
}

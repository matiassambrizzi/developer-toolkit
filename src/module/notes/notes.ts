import {Instant} from "@js-joda/core"
import {List} from "@matiassambrizzi/app-utils"
import {boolean, Decoder, object, string, withDefault} from "@mojotech/json-type-validation"

export type Note = {
  title: string
  content: string
  date: Instant,
  pinned: boolean
}

export const noteNew = (): Note => ({
  title: "Nota del dia",
  date: Instant.now(), 
  content: "",
  pinned: false
})


export const exportNotes = (notes: List<Note>) => {
  const blob = new Blob([JSON.stringify(notes, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'notas.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


export const noteDecoder: Decoder<Note> = object({
  title: string(),
  content: string(),
  date: string(),
  pinned: withDefault(false, boolean())
}).map(it => ({
  title: it.title,
  content: it.content,
  date: Instant.parse(it.date),
  pinned: it.pinned
}))

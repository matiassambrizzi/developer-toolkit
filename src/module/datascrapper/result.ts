import {IO} from "@matiassambrizzi/app-utils"

export type Ok<T> = { type: "success", value: T}
export type Error = { type: "error", error: unknown }
export type Pending = { type: "pending" }
export type Result<T> = Ok<T> | Error | Pending

export const ok = <T,>(value: T): Result<T> => ({type: "success", value: value})
export const error = <E,>(error: E): Result<never> => ({type: "error", error: error})
//const pending = (): Result<never> => ({type: "pending"})

export const match = <T,>(result: Result<T>) => <R,>(
  cases: {
    onOk: (value: T) => R,
    onError: (error: unknown) => R,
    onPending: () => R
  }
): R =>
  result.type === "success" ? cases.onOk(result.value) :
    result.type === "error" ? cases.onError(result.error) :
      cases.onPending()

export const runCatching = <T,>(action: IO<T>): IO<Result<T>> => () => {
  try {
    const result = action()
    return ok(result)
  } catch (e) {
    return error((e as any)?.message)
  }
}

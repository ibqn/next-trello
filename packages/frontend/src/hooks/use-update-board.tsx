import { useMutation, useQueryClient } from "@tanstack/react-query"
import { boardListQueryOptions, boardQueryOptions, patchBoard } from "@/api/board"
import { nothing, produce } from "immer"
import { Board } from "database/src/drizzle/schema/board"

export const useUpdateBoard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: patchBoard,
    onMutate: async (data) => {
      const { queryKey } = boardQueryOptions({ id: data.id })
      await queryClient.cancelQueries({ queryKey })
      const previousBoardData = queryClient.getQueryData(queryKey)
      queryClient.setQueriesData<Board | null>(
        { queryKey },
        produce((draft) => {
          if (!draft) {
            return nothing
          }
          draft.title = data.title
        })
      )
      return { previousBoardData }
    },
    onError: (_error, variables, context) => {
      if (context?.previousBoardData) {
        const { queryKey } = boardQueryOptions({ id: variables.id })
        queryClient.setQueryData(queryKey, context.previousBoardData)
      }
    },
    onSettled: (_data, _error, variables) => {
      const { queryKey } = boardQueryOptions({ id: variables.id })
      queryClient.invalidateQueries({ queryKey })

      queryClient.invalidateQueries({ queryKey: boardListQueryOptions().queryKey })
    },
  })
}

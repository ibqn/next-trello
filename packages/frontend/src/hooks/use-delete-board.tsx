import { boardListQueryOptions, deleteBoard } from "@/api/board"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Board } from "database/src/drizzle/schema/board"
import { nothing, produce } from "immer"

export const useDeleteBoard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteBoard,
    onMutate: async (data) => {
      const { queryKey } = boardListQueryOptions()
      await queryClient.cancelQueries({ queryKey })
      const previousBoardListData = queryClient.getQueriesData({ queryKey })
      queryClient.setQueriesData<Board[] | null>(
        { queryKey },
        produce((draft) => {
          if (!draft) {
            return nothing
          }

          const index = draft.findIndex((board) => board.id === data.id)
          if (index !== -1) {
            draft.splice(index, 1)
          }
        })
      )
      return { previousBoardListData }
    },
    onError: (error, _variables, context) => {
      console.error(error)

      if (context?.previousBoardListData) {
        context.previousBoardListData.forEach(([queryKey, data]) => {
          queryClient.setQueriesData({ queryKey }, data)
        })
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: boardListQueryOptions().queryKey })
    },
  })
}

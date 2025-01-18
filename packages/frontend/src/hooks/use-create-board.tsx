import { useMutation, useQueryClient } from "@tanstack/react-query"
import { boardListQueryOptions, postBoard } from "@/api/board"
import { nothing, produce } from "immer"
import type { Board } from "database/src/drizzle/schema/board"

export const useCreateBoard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postBoard,
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
          draft.unshift({
            ...data,
            id: "temp-id",
            createdAt: new Date(),
            updatedAt: new Date(),
            organizationId: "temp-id",
          })
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

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postGroup } from "@/api/group"
import { nothing, produce } from "immer"
import { boardQueryOptions } from "@/api/board"
import type { Board } from "database/src/drizzle/schema/board"

export const useCreateGroup = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postGroup,
    onMutate: async (data) => {
      const { boardId } = data
      const { queryKey } = boardQueryOptions({ id: boardId })
      await queryClient.cancelQueries({ queryKey })
      const previousGroupListData = queryClient.getQueriesData({ queryKey })
      queryClient.setQueriesData<Board | null>(
        { queryKey },
        produce((draft) => {
          if (!draft) {
            return nothing
          }
          if (!draft.groups) {
            draft.groups = []
          }
          draft.groups.push({
            ...data,
            id: "temp-id",
            createdAt: new Date(),
            updatedAt: new Date(),
            order: 999,
            organizationId: "temp-id",
          })
        })
      )
      return { previousGroupListData }
    },
    onError: (error, _variables, context) => {
      console.error(error)
      if (context?.previousGroupListData) {
        context.previousGroupListData.forEach(([queryKey, data]) => {
          queryClient.setQueriesData({ queryKey }, data)
        })
      }
    },
    onSettled: (_data, _error, variables) => {
      const { boardId } = variables
      queryClient.invalidateQueries({ queryKey: boardQueryOptions({ id: boardId }).queryKey })
    },
  })
}

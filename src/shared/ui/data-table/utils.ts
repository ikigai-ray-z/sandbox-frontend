export const convertApiParamsToPagination = ({
  offset,
  limit,
}: {
  offset: number
  limit: number
}) => {
  return {
    pageIndex: offset,
    pageSize: limit,
  }
}

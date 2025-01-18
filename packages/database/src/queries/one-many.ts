export function aggregateOneToMany<
  TRow extends Record<string, any>,
  TOne extends keyof TRow,
  TMany extends keyof TRow
>(
  rows: TRow[],
  one: TOne,
  many: TMany
): (TRow[TOne] & { [K in TMany]?: NonNullable<TRow[TMany]>[] })[] {
  const map: Record<string, TRow[TOne] & { [K in TMany]: TRow[TMany][] }> = {}

  for (const row of rows) {
    const id = row[one].id
    if (!map[id]) {
      map[id] = { ...row[one], [many]: [] }
    }
    if (row[many] != null) {
      map[id]![many].push(row[many])
    }
  }

  return Object.values(map)
}

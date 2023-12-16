export function useQueryStatusStore<T>(isStatusFinished: (item: T) => boolean, createKey: (item: T) => string) {
  const queryStatus = ref<Record<string, T>>({});

  const resetQueryStatus = (): void => {
    set(queryStatus, {});
  };

  const isAllFinished = computed<boolean>(() => {
    const statuses = get(queryStatus);
    const addresses = Object.keys(statuses);

    return addresses.every((address: string) => isStatusFinished(statuses[address]));
  });

  const removeQueryStatus = (key: string): void => {
    const statuses = { ...get(queryStatus) };
    set(queryStatus, Object.fromEntries(Object.entries(statuses).filter(([_, status]) => createKey(status) === key)));
  };

  return {
    queryStatus,
    isAllFinished,
    removeQueryStatus,
    resetQueryStatus,
  };
}

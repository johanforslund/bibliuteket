export const isLoading = (actions, state) => {
  return actions.some(action => state.loading[action]);
};

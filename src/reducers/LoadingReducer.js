const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAIL)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,

    [requestName]: requestState === "REQUEST"
  };
};

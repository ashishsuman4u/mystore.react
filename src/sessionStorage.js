//To use session storage with redux state.
export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    if (state) {
      const serializedState = JSON.stringify(state);
      sessionStorage.setItem('state', serializedState);
    } else {
      sessionStorage.removeItem('state');
    }
  } catch (err) {
    //Do nothing for now.
    console.log(err);
  }
};

export const clearStorage = () => {
  sessionStorage.removeItem('state');
};

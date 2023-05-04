export const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? [] : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

export const save = (key, value) => {
  try {
    const storage = load(key);
    const filmCurrent = JSON.parse(value);
    const filmIncluded = storage.find(film => film.id === filmCurrent.id);
    if (storage.length === 0 || !filmIncluded) {
      storage.push(filmCurrent);
    }

    localStorage.setItem(key, JSON.stringify(storage));
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

export const removeStore = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};
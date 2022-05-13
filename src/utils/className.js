import { useEffect } from 'react';

const addBodyClass = (className) => document.body.classList.add(className);
const removeBodyClass = (className) => document.body.classList.remove(className);

export const useBodyClass = (className) => {
  useEffect(() => {
    // Set up
    className instanceof Array ? className.map(addBodyClass) : addBodyClass(className);

    // Clean up
    return () => {
      className instanceof Array ? className.map(removeBodyClass) : removeBodyClass(className);
    };
  }, [className]);
};

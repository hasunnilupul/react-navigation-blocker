/**
 * Pass css classes and return them based on the logic
 * 
 * @param  {string[]} classes array of string css classes
 * @returns 
 */
export const classNames = (...classes) => classes.filter(Boolean).join(' ')
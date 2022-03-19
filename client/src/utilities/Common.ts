/**
 * common utility functions that will be shared by the application
 */

/**
 * @params <void>
 * @returns boolean
 * @description this function checks whether user is logged in or not
 */
export const isLoggedIn = (): boolean => {
  const user = JSON.parse(window.localStorage.getItem('user') as any);
  if (user?.email) {
    return true;
  }
  return false;
};

/**
 * @params <string>
 * @returns void
 * @description logs in the user with given email address
 */
export const login = (email: string): void => {
  let user = JSON.parse(window.localStorage.getItem('user') as any);
  if (!user) {
    user = {email}
  }
  window.localStorage.setItem('user', JSON.stringify(user));
}
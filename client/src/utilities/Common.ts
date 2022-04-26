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
export const login = (email: string): Promise<void> => {
  return new Promise((resolve): void => {
    let user = JSON.parse(window.localStorage.getItem('user') as string)
    if (!user) {
      user = {
        email
      };
    } else {
      user.email = email;
    }

    window.localStorage.setItem('user', JSON.stringify(user))
    resolve()
  })
}

/**
 * @params <void>
 * @returns <void>
 * @description logs out an user by remove credentials from local storage
 */
export const logout = (): void => {
  window.localStorage.removeItem('user');
}

/**
 * @params <number>
 * @returns <void>
 * @description delays the execution for specified number of milliseconds
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
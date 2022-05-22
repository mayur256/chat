// type definitions
import { IAuthUser } from "../components/types";

/**
 * common utility functions that will be shared by the application
 */

/**
 * @params <void>
 * @returns boolean
 * @description this function checks whether user is logged in or not
 */
export const isLoggedIn = (): boolean => {
  //const user = JSON.parse(window.localStorage.getItem('log_user') as any);
  return Boolean(window.localStorage.getItem('log_user'))
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
};

/**
 * @param email {string}
 * @description Store the given email into local storage
 */
export const storeUserInLocalStorage = (user: IAuthUser): void => {
  window.localStorage.setItem('log_user', JSON.stringify(user))
}

/**
 * @description removes the logged in user data from local storage
 */
export const removeAuthUserFromStorage = (): void => {
  window.localStorage.removeItem('log_user');
}

/**
 * @returns {IAuthUser | null}
 * @description returns auth user from local storage
 */
export const storageToState = (): IAuthUser | null => {
  return JSON.parse(localStorage.getItem('log_user') as string);
}

/** 
 * @param fn - a callback that i to be debounced 
 * @param timeout
 * @returns 
 */
export const debounce = (fn: () => void, timeout: number = 300) => {
  let timer: any = null;

  return (...args: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout((): void => {
      fn.apply(this, args)
    }, timeout);

  }
}
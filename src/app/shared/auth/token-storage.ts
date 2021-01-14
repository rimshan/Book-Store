
import { Injectable } from '@angular/core';


const TOKEN_KEY = 'AuthToken';
const USER_ID = 'UserId';

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.clear();
  }

  public saveToken(token: any) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token.access_token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public setUserId(userId: string) {
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID,  userId);
  }

  public getUserId(): string {
    return sessionStorage.getItem(USER_ID);
  }
}

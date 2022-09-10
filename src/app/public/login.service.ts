import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login({ email, password }: { email: string; password: string }) {
    return this.httpClient.get<User[]>('http://localhost:4500/user');
  }
}

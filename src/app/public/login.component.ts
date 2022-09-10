import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.store';
import { loginUser } from '../store/user/actions';
import { getUser, selectUserStore } from '../store/user/state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.store.select(getUser).subscribe((user) => {});
    this.store.select(selectUserStore).subscribe((userStore) => {});
  }

  login() {
    this.store.dispatch(loginUser({ payload: { ...this.loginForm.value } }));
  }
}

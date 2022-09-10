import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    public store: Store<AppState>,
    public router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.store.select(selectUserStore).subscribe((userStore) => {
      if (!userStore.isLoading && userStore.user)
        this.router.navigate(['private']);
    });
  }

  login() {
    if (this.loginForm.valid)
      this.store.dispatch(loginUser({ payload: { ...this.loginForm.value } }));
  }
}

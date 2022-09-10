import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { User } from '../models/user';
import { AppState } from '../store/app.store';
import { loginUser } from '../store/user/actions';
import { UserStore } from '../store/user/state';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore<AppState>;
  const mockUserCredentials = {
    email: 'testing@email.com',
    password: 'testing1234',
  };
  const initialState: AppState = {
    userStore: new UserStore({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CommonModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'private', component: LoginComponent },
        ]),
      ],
      declarations: [LoginComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When calling submit with valid values', () => {
    it('should dispatch the loginUser action', () => {
      spyOn(component.store, 'dispatch');
      component.loginForm.setValue(mockUserCredentials);
      component.login();
      expect(component.store.dispatch).toHaveBeenCalledWith(
        loginUser({
          payload: mockUserCredentials,
        })
      );
    });
  });

  describe('When calling submit with invalid values', () => {
    it('should dispatch the loginUser action', () => {
      spyOn(component.store, 'dispatch');
      component.loginForm.setValue({
        email: 'testingWrongEmail',
        password: '',
      });
      component.login();
      expect(component.store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('When the user data is set to the store', () => {
    it('should navigate to private', () => {
      spyOn(component.router, 'navigate');
      store.setState({
        ...initialState,
        userStore: new UserStore({
          user: new User({
            userName: 'test',
            email: 'email',
            twitter: 'twitter',
            phoneNumber: '123123123',
          }),
        }),
      });
      expect(component.router.navigate).toHaveBeenCalled();
    });
  });
});

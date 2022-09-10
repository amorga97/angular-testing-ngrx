import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppStore } from './store/app.store';
import { PublicModule } from './public/public.module';
import { UserEffects } from './store/user/effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(AppStore),
    EffectsModule.forRoot([UserEffects]),
    PublicModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Restrict extension to log-only mode
      autoPause: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

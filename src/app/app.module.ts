import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragNDropModule } from './components/games/drag-n-drop/drag-n-drop.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { environment } from './environments/environment';
import { SigninModule } from './components/pages/signin/signin.module';
import { SpellMeModule } from './components/games/spell-me/spell-me.module';
import { ActionToSpeechComponent } from './components/random/action-to-speech/action-to-speech.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragNDropModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    SigninModule,
    SpellMeModule,
    ActionToSpeechComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

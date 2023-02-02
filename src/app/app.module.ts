import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UsersComponent } from './pages/users/users.component';
import { UserResolver } from './resolvers/user.resolver';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'users', component: UsersComponent },
      { path: 'user/:uuid', component: UserDetailsComponent, resolve: { resolvedResponse: UserResolver } },
      { path: '**', redirectTo: 'users' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

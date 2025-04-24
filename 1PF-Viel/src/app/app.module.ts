import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StudentsModule } from './students/students.module';
import { SharedModule } from './shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HighlighterDirective } from './shared/directives/highlighter.directive';


@NgModule({
  declarations: [
    AppComponent,
    HighlighterDirective,
  ],
  imports: [
    BrowserModule,
    StudentsModule,
    SharedModule,
    MatToolbarModule, MatButtonModule, MatIconModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
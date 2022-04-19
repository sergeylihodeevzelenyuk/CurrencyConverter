import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';
import { SvgArrowComponent } from './UI/svg-arrow/svg-arrow.component';
import { SvgLogoComponent } from './header/svg-logo/svg-logo.component';
import { SelectDropDownComponent } from './form/select-drop-down/select-drop-down.component';
import { LoadingIndicatorComponent } from './UI/loading-indicator/loading-indicator.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormComponent,
    SvgArrowComponent,
    SvgLogoComponent,
    SelectDropDownComponent,
    LoadingIndicatorComponent,
    ErrorMessageComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

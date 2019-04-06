import { FileComponent } from './input-controls/file.component';
import { CheckBoxComponent } from './input-controls/checkbox.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from "@angular/cdk/drag-drop"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FieldBuilderComponent } from './field-builder/field-builder.component';
import { DropDownComponent } from './input-controls/dropdown.component';
import { RadioComponent } from './input-controls/radio.component';
import { TextBoxComponent } from './input-controls/text-box.component';

const inputControls = [
  CheckBoxComponent,
  DropDownComponent,
  FileComponent,
  RadioComponent, 
  TextBoxComponent
]

const builderComponents = [
  FormBuilderComponent,
  FieldBuilderComponent,
  ...inputControls
]

@NgModule({
  declarations: [
    AppComponent,
    ...builderComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

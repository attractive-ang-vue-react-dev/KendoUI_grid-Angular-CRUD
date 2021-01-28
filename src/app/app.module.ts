import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';

import { AppComponent } from './app.component';
import { DataService } from './service/data.service';
import { AddModalComponent } from './component/add-modal/add-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
        AddModalComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        GridModule,
        DropDownListModule,
        NgbModule,
    ],
    bootstrap: [AppComponent],
    providers: [DataService]
})
export class AppModule {}
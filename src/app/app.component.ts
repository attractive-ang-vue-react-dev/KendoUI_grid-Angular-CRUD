
import { Component, OnInit, OnDestroy, ViewChild, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from './service/data.service';
import { DialogService } from './service/dialog.service';
import { GridComponent } from '@progress/kendo-angular-grid';


const createFormGroup = (dataItem) =>
  new FormGroup({
    UserID: new FormControl(dataItem.UserID),
    UserName: new FormControl(dataItem.UserName, Validators.required),
    UserEmail: new FormControl(dataItem.UserEmail, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    UserPhone: new FormControl(dataItem.UserPhone, Validators.required),
  });

  const matches = (el, selector) => (el.matches || el.msMatchesSelector).call(el, selector);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'test1';
  @ViewChild(GridComponent)
    private grid: GridComponent;

    public view: any[];

    public formGroup: FormGroup;

    private editedRowIndex: number;
    private docClickSubscription: any;
    private isNew: boolean;

  constructor(private service: DataService, private renderer: Renderer2,
    private dialogService: DialogService) { }

    public ngOnInit(): void {
        this.view = this.service.products();

        this.docClickSubscription = this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));
    }

    public ngOnDestroy(): void {
        this.docClickSubscription();
    }

    public addHandler(): void {
      this.dialogService.addUser();
    }

    public saveRow() {
        if (this.formGroup && this.formGroup.valid) {
            this.saveCurrent();
        }
    }

    public cellClickHandler({ isEdited, dataItem, rowIndex }): void {
        if (isEdited || (this.formGroup && !this.formGroup.valid)) {
            return;
        }

        if (this.isNew) {
            rowIndex += 1;
        }

        this.saveCurrent();

      this.formGroup = createFormGroup(dataItem);
      console.log(this.formGroup.valid)
        this.editedRowIndex = rowIndex;

        this.grid.editRow(rowIndex, this.formGroup);
    }

    public cancelHandler(): void {
        this.closeEditor();
    }

    public removeHandler({ sender, dataItem }) {
      this.service.remove(dataItem);

      sender.cancelCell();
  }
    private closeEditor(): void {
        this.grid.closeRow(this.editedRowIndex);

        this.isNew = false;
        this.editedRowIndex = undefined;
        this.formGroup = undefined;
    }

    private onDocumentClick(e: any): void {
        if (
            this.formGroup &&
            this.formGroup.valid &&
            !matches(e.target, '#productsGrid tbody *, #productsGrid .k-grid-toolbar .k-button')
        ) {
            this.saveCurrent();
        }
    }

    private saveCurrent(): void {
      if (this.formGroup) {
            this.service.save(this.formGroup.value, this.isNew);
            this.closeEditor();
        }
    }
}

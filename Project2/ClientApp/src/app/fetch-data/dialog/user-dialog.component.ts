import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html'
})
export class UserDialogComponent implements OnInit {

  userFormGroup: FormGroup;
  param: WeatherForecast | undefined;

  constructor(
    public formBuilder: RxFormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private injector: Injector) {

    this.param = this.injector.get(MAT_DIALOG_DATA, null);
    this.userFormGroup = this.formBuilder.group({
      id: [''],
      name: ['', RxwebValidators.required()],
      email: ['', RxwebValidators.required()],
    });

    // If param has value means Update mode then fill formgroup
    if (this.param) {
      this.userFormGroup.patchValue(this.param);
    }
  }

  ngOnInit(): void{

  }

  onConfirm(): void {
    this.dialogRef.close(this.userFormGroup.value);
  }

  onDismiss(): void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

interface WeatherForecast {
  id: number;
  name: string;
  email: string;
}

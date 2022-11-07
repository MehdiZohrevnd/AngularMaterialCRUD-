import { Component, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './dialog/user-dialog.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'email','action'];

  @ViewChild('table') table: MatTable<any> | undefined;

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string, public dialog: MatDialog) {
    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
      debugger;
      this.dataSource.data = result;
    }, error => console.error(error));
  }

  AddUser() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      height: '400px',
      data: null,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.dataSource.data.push(dialogResult);
        this.table?.renderRows();
      }
    });
  }

  UpdateUser(user: WeatherForecast) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      height: '400px',
      data: user,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {

      }
    });
  }

  RemoveUser(user: WeatherForecast) {
    this.http.delete<WeatherForecast[]>(this.baseUrl + 'weatherforecast', { body: user }).subscribe(result => {
      if (result) {
        debugger;
        this.dataSource.data.splice(this.dataSource.data.indexOf(user), 1);
        this.table?.renderRows();
      }
    }, error => console.error(error));
  }
}

interface WeatherForecast {
  id: number;
  name: string;
  email: string;
}

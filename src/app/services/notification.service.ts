import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackbar: MatSnackBar) { }

  public openSnackBar(message: string) {
    this._snackbar.open(message, 'X', {
      duration: 4000,
      panelClass: 'snackbar'
    })
  }
}

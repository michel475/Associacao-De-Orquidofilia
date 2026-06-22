import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export interface NotificationDialogData {
  type: 'success' | 'error';
  message: string;
}

@Component({
  selector: 'app-notification-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './notification-dialog.html',
})
export class NotificationDialogComponent {
  readonly data: NotificationDialogData = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<NotificationDialogComponent>);

  close(): void {
    this.dialogRef.close();
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { OrquidarioService } from '../orqudiario-service/orquidario.service';
import { Orquidario } from '../orquidario-list/model/orquidario';
import { parseOrquidarioError } from '../auth/error-handler';

@Component({
  selector: 'app-dialog-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './dialog-modal.html',
})
export class DialogModal {
  readonly data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<DialogModal>);
  private orquidarioService = inject(OrquidarioService);
  protected orquidario: Orquidario = this.data.orquidario;

  onConfirm(): void {
    this.orquidarioService.deleteOrquidario(this.orquidario.id).subscribe({
      next: () => {
        this.dialogRef.close({ success: true });
      },
      error: (err) => {
        this.dialogRef.close({ success: false, errorMsg: parseOrquidarioError(err) });
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}

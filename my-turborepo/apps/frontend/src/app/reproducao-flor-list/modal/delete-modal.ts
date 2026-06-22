import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { ReproducaoFlorService } from "../service/reproducaoFlor.service";
import { ReproducaoFlor } from "../model/reproducaoFlor";
import { parseReproducaoError } from "../../auth/error-handler";

@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './delete-modal.html',
})
export class ConfirmDeleteDialogComponent {
  readonly data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ConfirmDeleteDialogComponent>);
  private reproducaoFlorService = inject(ReproducaoFlorService);
  protected reproducao: ReproducaoFlor = this.data.reproducao;

  onConfirm(reproducao: ReproducaoFlor): void {
    this.reproducaoFlorService.deleteReproducao(reproducao.id).subscribe({
      next: () => {
        this.dialogRef.close({ success: true });
      },
      error: (err) => {
        this.dialogRef.close({ success: false, errorMsg: parseReproducaoError(err) });
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
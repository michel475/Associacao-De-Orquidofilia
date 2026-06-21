import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { OrquidarioService } from "../orqudiario-service/orquidario.service";
import { Orquidario } from "../orquidario-list/model/orquidario";

@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './delete-modal.html',
})
export class ConfirmDeleteDialogComponent {
  readonly data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ConfirmDeleteDialogComponent>);
  private orquidarioService = inject(OrquidarioService);
  protected orquidario: Orquidario = this.data.orquidario;

  onConfirm(orquidario: Orquidario): void {
    this.orquidarioService.deleteOrquidario(orquidario.id).subscribe({
      next: () => {
        console.log("Orquidário excluído com sucesso");
        this.dialogRef.close(true);
      },
      error: () => {
        console.log("Erro ao excluir o orquidário");
        this.dialogRef.close(false);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
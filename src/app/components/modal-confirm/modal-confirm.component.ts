import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

interface ConfirmData {
  title?: string
  message?: string
}

@Component({
  selector: 'app-modal-confirm',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.scss'
})
export class ModalConfirmComponent {
  title!: string;
  message!: string;

  constructor(
    private dialogRef: MatDialogRef<ModalConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmData
  ){
    this.title = data.title ?? 'Information';
    this.message = data.message ?? '';
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

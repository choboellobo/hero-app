import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ModalConfirmComponent } from "./modal-confirm.component"
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

const MatDialogMock = {
    close: () => null
}

describe('ModalConfirmComponent', () => {
    let component: ModalConfirmComponent;
    let fixture: ComponentFixture<ModalConfirmComponent>;

    beforeEach(() => { 
        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
            providers: [
               { provide: MatDialogRef, useValue: MatDialogMock },
               { provide: MAT_DIALOG_DATA, useValue: {} }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalConfirmComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('onConfirm send true value' , () => {
        const service = TestBed.inject(MatDialogRef);
        const spy = jest.spyOn(service, 'close');
        component.onConfirm();
        expect(spy).toHaveBeenCalledWith(true);
    })

    it('onCancel send false value' , () => {
        const service = TestBed.inject(MatDialogRef);
        const spy = jest.spyOn(service, 'close');
        component.onCancel();
        expect(spy).toHaveBeenCalledWith(false);
    })

})

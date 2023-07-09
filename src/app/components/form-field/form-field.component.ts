import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  AfterContentChecked,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent implements OnInit, AfterContentChecked {
  @Input() id: number = 0;
  @Input() label: any = 'Usuário';
  @Input() type: any = 'text';
  @Input() mask: any = '00/00/0000';
  @Input() formAtribute!: UntypedFormGroup;
  @Input() control: any = 'name';
  @Input() icon: any = null;
  @Input() placeholder: any = '';
  @Input() textAlign: string = 'left';
  @Input() hint: any = null;
  @Input() item: any = {};
  @Input() maxlength: any = 9999;
  @Input() iconTooltip: any = '';
  @Input() infoTooltip: any = '';
  @Input() currencyOptions: any = {
    prefix: 'R$ ',
    thousands: '.',
    decimal: ',',
  };
  @Output() eventClicked = new EventEmitter<any>();
  @Output() blurEvent = new EventEmitter<any>();
  @Output() focusEvent = new EventEmitter<any>();
  public input: any = '';

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    // console.log(this.formAtribute)
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  onFocus(item: any): void {
    this.focusEvent.emit({
      item,
      data: this.input,
    });
  }

  onBlur(item: any): void {
    this.blurEvent.emit({
      item,
      data: this.input,
    });
  }

  clickIcon(item: any): void {
    this.eventClicked.emit({
      item,
      data: this.input,
    });
  }
}

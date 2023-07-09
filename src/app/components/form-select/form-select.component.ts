import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
})
export class FormSelectComponent implements OnInit {
  @Input() list: any = [];
  @Input() label: string = '';
  @Input() placeholder: string = 'Selecione';
  @Input() control: any = 'select';
  @Input() multiple: boolean = false;
  @Input() iconTooltip: any = '';
  @Input() infoTooltip: any = '';

  public input: any = {};
  @Input() formAtribute!: UntypedFormGroup;

  @Output() selectEvent = new EventEmitter<Event>();

  constructor() {}

  ngOnInit(): void {
    // console.log(this.formAtribute,'aa')
  }

  change($event: any) {
    this.selectEvent.emit($event);
  }
}

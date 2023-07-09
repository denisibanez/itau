import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() label: string = 'Texto do Botão';
  @Input() color: string = 'primary';
  @Input() large: boolean = false;
  @Input() icon: any = {
    label: 'fa-light fa-store',
    show: false,
    position: 'left',
  };

  @Output() btnClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onBtnClick(): void {
    this.btnClick.emit();
  }
}

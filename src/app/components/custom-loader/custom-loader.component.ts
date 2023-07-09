import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-custom-loader',
  templateUrl: './custom-loader.component.html',
  styleUrls: ['./custom-loader.component.scss'],
})
export class CustomLoaderComponent implements OnInit {
  @Input() brand: string = '';

  constructor() {}

  ngOnInit(): void {}
}

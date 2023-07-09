import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { SnackbarComponent } from '../../app/components/snackbar/snackbar.component';
import { MaterialModule } from '../../app/plugins/material.module';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Components/Snackbar',
  component: SnackbarComponent,
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['success-theme', 'warn-theme', 'error-theme', 'info-theme'],
    },
    horizontalPosition: {
      control: { type: 'select' },
      options: ['bottom', 'top'],
    },
    verticalPosition: {
      control: { type: 'select' },
      options: ['start', 'end', 'left', 'center', 'right'],
    },
    SnackbarClick: { action: 'clicked' },
  },
  decorators: [
    moduleMetadata({
      declarations: [SnackbarComponent],
      imports: [CommonModule, MaterialModule, BrowserAnimationsModule],
    }),
  ],
};
// This creates a Story for the component
const Template: Story<SnackbarComponent> = (args: SnackbarComponent) => ({
  component: SnackbarComponent,
  props: args,
  template: `<app-snackbar
  [duration]="duration"
  [icon]="icon"
  [theme]="theme"
  [message]="message"
  [horizontalPosition]="horizontalPosition"
  [verticalPosition]="verticalPosition"
  [show]="show"
></app-snackbar>`,
});

export const Base = Template.bind({});
// Other stories could be added here as well, all you have to do is export them along!
Base.args = {
  duration: 5000,
  icon: 'fa-light fa-triangle-exclamation',
  theme: 'warn-theme',
  message: 'Requisição feita com sucesso!',
  horizontalPosition: 'bottom' as MatSnackBarHorizontalPosition,
  verticalPosition: 'center' as MatSnackBarVerticalPosition,
  show: true,
};

export const Info = Template.bind({});
// Other stories could be added here as well, all you have to do is export them along!
Info.args = {
  duration: 5000,
  icon: 'fa-light fa-circle-info',
  theme: 'info-theme',
  message: 'Requisição feita com sucesso!',
  horizontalPosition: 'bottom' as MatSnackBarHorizontalPosition,
  verticalPosition: 'center' as MatSnackBarVerticalPosition,
  show: true,
};

export const Success = Template.bind({});
// Other stories could be added here as well, all you have to do is export them along!
Success.args = {
  duration: 5000,
  icon: 'fa fa-check-circle',
  theme: 'success-theme',
  message: 'Requisição feita com sucesso!',
  horizontalPosition: 'bottom' as MatSnackBarHorizontalPosition,
  verticalPosition: 'center' as MatSnackBarVerticalPosition,
  show: true,
};

export const Error = Template.bind({});
// Other stories could be added here as well, all you have to do is export them along!
Error.args = {
  duration: 5000,
  icon: 'fa-light fa-trash-can',
  theme: 'error-theme',
  message: 'Requisição falhou!',
  horizontalPosition: 'bottom' as MatSnackBarHorizontalPosition,
  verticalPosition: 'center' as MatSnackBarVerticalPosition,
  show: true,
};

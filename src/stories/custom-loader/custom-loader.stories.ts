import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CustomLoaderComponent } from '../../app/components/custom-loader/custom-loader.component';
import { MaterialModule } from '../../app/plugins/material.module';

export default {
  title: 'Components/Custom-Loader',
  component: CustomLoaderComponent,
  argTypes: {
    brand:
      'https://logodownload.org/wp-content/uploads/2019/12/itau-bba-logo-1.png',
  },
  decorators: [
    moduleMetadata({
      declarations: [CustomLoaderComponent],
      imports: [CommonModule, MaterialModule],
    }),
  ],
};
// This creates a Story for the component
const Template: Story<CustomLoaderComponent> = (
  args: CustomLoaderComponent
) => ({
  component: CustomLoaderComponent,
  props: args,
  template: `<app-custom-loader [brand]="brand"></app-custom-loader>`,
});

export const Base = Template.bind({});
// Other stories could be added here as well, all you have to do is export them along!
Base.args = {
  brand:
    'https://logodownload.org/wp-content/uploads/2019/12/itau-bba-logo-1.png',
};

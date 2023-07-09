import { Component, OnInit } from '@angular/core';
// Services
import { HomeHttpService } from '../../services/httpRequest/home.service';

// Store
import { Select, Store } from '@ngxs/store';
import { LoaderSelectors } from '../../store/loading/loading.selectors';
import { SnackbarSelectors } from '../../store/snackbar/snackbar.selectors';
import { Observable } from 'rxjs';
import { ChangeLoaderState } from '../../store/loading/loading.actions';
import { ChangeSnackbarState } from '../../store/snackbar/snackbar.actions';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [HomeHttpService],
})
export class DetailsComponent implements OnInit {
  @Select(LoaderSelectors.loader) load$!: Observable<boolean>;
  @Select(SnackbarSelectors.snackbar) snackbar$!: Observable<any>;

  public chargeLoader!: boolean;
  public snackbar!: boolean;

  public inputs = {
    zipCode: {
      id: 0,
      label: 'CEP',
      mask: '00000-000',
      type: 'mask',
      control: 'zipCode',
      placeholder: '06555-555',
      disabled: false,
    },
    street: {
      id: 1,
      label: 'Nome da rua',
      type: 'text',
      control: 'street',
      placeholder: 'Nome da rua.',
      disabled: false,
    },
    district: {
      id: 3,
      label: 'Bairro',
      type: 'text',
      control: 'district',
      placeholder: 'Bairro',
      disabled: false,
    },
    state: {
      id: 4,
      label: 'Estado',
      type: 'text',
      control: 'state',
      placeholder: 'Estado',
      disabled: false,
    },
    city: {
      id: 9,
      label: 'Cidade',
      type: 'text',
      control: 'city',
      placeholder: 'Cidade',
      disabled: false,
    },
    companyName: {
      id: 5,
      label: 'Nome',
      type: 'text',
      control: 'companyName',
      placeholder: 'Nome',
      disabled: false,
    },
    business: {
      id: 6,
      label: 'Business',
      type: 'text',
      control: 'business',
      placeholder: 'Business',
      disabled: false,
    },
    price: {
      id: 7,
      label: 'Valuation',
      type: 'currency',
      control: 'price',
      currencyOptions: { prefix: 'R$ ', thousands: '.', decimal: ',' },
      disabled: false,
      placeholder: 'Valuation',
    },
    document: {
      id: 8,
      label: 'CNPJ',
      mask: '00.000.000/0000-00',
      type: 'mask',
      control: 'document',
      placeholder: '00.000.000/0000-00',
      disabled: false,
    },
    status: {
      id: 9,
      label: 'Ativo?',
      control: 'status',
      disabled: false,
      placeholder: '',
      list: [
        {
          key: 'Sim',
          value: true,
        },
        {
          key: 'Não',
          value: false,
        },
      ],
    },
  };

  public formAtribute: UntypedFormGroup = new UntypedFormGroup({
    zipCode: new UntypedFormControl(
      { value: null, disabled: this.inputs.zipCode.disabled },
      [Validators.required]
    ),
    street: new UntypedFormControl(
      { value: null, disabled: this.inputs.street.disabled },
      [Validators.required]
    ),
    district: new UntypedFormControl(
      { value: null, disabled: this.inputs.district.disabled },
      [Validators.required]
    ),
    state: new UntypedFormControl(
      { value: null, disabled: this.inputs.state.disabled },
      [Validators.required]
    ),
    city: new UntypedFormControl(
      { value: null, disabled: this.inputs.city.disabled },
      [Validators.required]
    ),
    companyName: new UntypedFormControl(
      { value: null, disabled: this.inputs.companyName.disabled },
      [Validators.required]
    ),
    business: new UntypedFormControl(
      { value: null, disabled: this.inputs.business.disabled },
      [Validators.required]
    ),
    price: new UntypedFormControl(
      { value: null, disabled: this.inputs.price.disabled },
      [Validators.required]
    ),
    document: new UntypedFormControl(
      { value: null, disabled: this.inputs.document.disabled },
      [Validators.required]
    ),
    status: new UntypedFormControl(
      { value: null, disabled: this.inputs.status.disabled },
      [Validators.required]
    ),
  });

  constructor(private store: Store, private homeService: HomeHttpService) {}

  ngOnInit(): void {
    this.load$.subscribe((u) => {
      this.chargeLoader = u;
    });
    this.getDetail();
  }

  getDetail() {
    this.store.dispatch(new ChangeLoaderState(true));
    const id: string = '1';
    this.homeService.getItemDetail(id).subscribe({
      next: (response: any) => {
        console.log(response);
        const { active, business, cep, cnpj, name, valuation } = response;
        this.formAtribute.controls['status'].setValue(active);
        this.formAtribute.controls['business'].setValue(business);
        this.formAtribute.controls['zipCode'].setValue(cep);
        this.formAtribute.controls['document'].setValue(JSON.stringify(cnpj));
        this.formAtribute.controls['companyName'].setValue(name);
        this.formAtribute.controls['price'].setValue(valuation);
        this.inputs.status.label = active ? 'sim' : 'não';
        this.onBlurEventZipCode({
          data: cep,
        });
        this.store.dispatch(
          new ChangeSnackbarState({
            duration: 5000,
            icon: 'done',
            theme: 'success-theme',
            message: 'Requisição sucesso',
            horizontalPosition: 'bottom',
            verticalPosition: 'center',
            show: true,
          })
        );

        this.store.dispatch(new ChangeLoaderState(false));
      },
      error: (error: any) => {
        console.log(error);
        this.store.dispatch(
          new ChangeSnackbarState({
            duration: 5000,
            icon: 'error',
            theme: 'error-theme',
            message: 'Requisição falhou!',
            horizontalPosition: 'bottom',
            verticalPosition: 'center',
            show: true,
          })
        );
        this.store.dispatch(new ChangeLoaderState(false));
      },
    });
  }

  onBlurEvent($event: any): void {
    console.log(this.formAtribute);
    console.log($event);
  }

  onFocusEvent($event: any): void {
    console.log($event);
  }

  onBlurEventZipCode($event: any): void {
    console.log(this.formAtribute);
    console.log($event);
    this.homeService.getZipCodeData($event.data).subscribe({
      next: (response: any) => {
        console.log(response);
        const { logradouro, localidade, bairro, uf } = response;
        this.formAtribute.controls['street'].setValue(logradouro);
        this.formAtribute.controls['district'].setValue(localidade);
        this.formAtribute.controls['state'].setValue(bairro);
        this.formAtribute.controls['city'].setValue(uf);
        this.store.dispatch(
          new ChangeSnackbarState({
            duration: 5000,
            icon: 'done',
            theme: 'success-theme',
            message: 'Requisição sucesso',
            horizontalPosition: 'bottom',
            verticalPosition: 'center',
            show: true,
          })
        );
      },
      error: (error: any) => {
        console.log(error);
        this.store.dispatch(
          new ChangeSnackbarState({
            duration: 5000,
            icon: 'error',
            theme: 'error-theme',
            message: 'Requisição falhou!',
            horizontalPosition: 'bottom',
            verticalPosition: 'center',
            show: true,
          })
        );
      },
    });
  }

  onBtnClick($event: any) {
    console.log($event);
  }
}

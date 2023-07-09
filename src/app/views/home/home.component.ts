import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeHttpService],
})
export class HomeComponent implements OnInit {
  @Select(LoaderSelectors.loader) load$!: Observable<boolean>;
  @Select(SnackbarSelectors.snackbar) snackbar$!: Observable<any>;

  public chargeLoader!: boolean;
  public snackbar!: boolean;

  public inputs = {
    search: {
      id: 0,
      label: 'Pesquisar',
      type: 'text',
      control: 'search',
      placeholder: 'Pesquisar...',
      disabled: false,
    },
  };

  public formAtribute: UntypedFormGroup = new UntypedFormGroup({
    search: new UntypedFormControl(
      { value: null, disabled: this.inputs.search.disabled },
      [Validators.required]
    ),
  });

  // Table
  displayedColumns: string[] = [
    'name',
    'business',
    'price',
    'status',
    'actions',
  ];
  tableColumns = [
    {
      columnDef: 'name',
      header: 'Nome',
      cell: (element: any) => `${element.name}`,
    },
    {
      columnDef: 'business',
      header: 'Business',
      cell: (element: any) => `${element.business}`,
    },
    {
      columnDef: 'price',
      header: 'Valuation',
      cell: (element: any) => `${element.price}`,
    },
    {
      columnDef: 'status',
      header: 'Situação',
      cell: (element: any) => `${element.status}`,
    },
    {
      columnDef: 'actions',
      header: 'Ação',
      cell: (element: any) => element.actions,
    },
  ];

  tableItems: any = [];

  length: any = 9999;
  pageSize: any = 10;
  pageIndex: any = 0;

  constructor(
    private store: Store,
    private homeService: HomeHttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load$.subscribe((u) => {
      this.chargeLoader = u;
    });
    this.getList();
  }

  getList() {
    this.store.dispatch(new ChangeLoaderState(true));
    this.homeService.getItems().subscribe({
      next: (response: any) => {
        this.tableItems = response.map((item: any) => {
          const { id, active, business, cep, cnpj, name, valuation } = item;
          const newItem = {
            id,
            name,
            business,
            price: valuation,
            cep,
            cnpj,
            status: active,
            actions: [
              {
                type: 'buttonIcon',
                icon: 'visibility',
              },
            ],
          };
          return newItem;
        });

        // api dont send pages and length
        this.pageSize = this.tableItems.length / 2;
        this.length = this.tableItems.length;

        console.log(response, this.tableItems, 'http');
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

  actionTableClick($event: any) {
    console.log($event);
    this.router.navigate(['details', $event.key.id]);
  }

  onBlurEvent($event: any): void {
    console.log(this.formAtribute);
    console.log($event);
    // api dont have search options
  }

  onFocusEvent($event: any): void {
    console.log($event);
    // api dont have search options
  }
}

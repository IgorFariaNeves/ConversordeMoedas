import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ConvercaogeralService } from './conversao-geral.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-conversao-geral',
  templateUrl: './conversao-geral.component.html',
  styleUrls: ['./conversao-geral.component.scss']
})
export class ConvercaoGeralComponent implements OnInit, AfterViewInit {
  moedasDataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['moeda', 'valor'];
  conversionForm: FormGroup;
  availableCurrencies: string[] = ['USD', 'EUR', 'GBP', 'JPY', 'BRL']; // Add more as needed
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private moedaService: ConvercaogeralService,
    private fb: FormBuilder
  ) {
    this.conversionForm = this.fb.group({
      baseCurrency: ['USD'],
      amount: [1],
      searchTerm: ['']
    });
    this.moedasDataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadConversionRates();
    this.conversionForm.valueChanges.subscribe(() => {
      this.loadConversionRates();
    });

    this.conversionForm.get('searchTerm')?.valueChanges.subscribe((searchTerm) => {
      this.moedasDataSource.filter = searchTerm.trim().toLowerCase();
    });
  }

  ngAfterViewInit() {
    this.moedasDataSource.paginator = this.paginator;
  }

  loadConversionRates(): void {
    const baseCurrency = this.conversionForm.get('baseCurrency')?.value;
    const amount = this.conversionForm.get('amount')?.value;

    this.moedaService.listarConversao(baseCurrency).subscribe({
      next: (res) => {
        const moedas = Object.entries(res.conversion_rates).map(([nome, valor]) => ({
          nome,
          valor: Number(valor) * amount
        }));
        this.moedasDataSource.data = moedas;
        this.moedasDataSource.filterPredicate = (data, filter: string) => {
          return data.nome.toLowerCase().includes(filter);
        };
      },
      error: () => {
        console.error('Erro ao carregar as moedas.');
      }
    });
  }

  onPageChange(event: PageEvent) {
    // You can add custom logic here if needed when page changes
    console.log(event);
  }
}
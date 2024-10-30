import { Component, OnInit } from '@angular/core';
import { ConvercaoDiretaService } from './conversao-direta.service';

@Component({
  selector: 'app-conversao-direta',
  templateUrl: './conversao-direta.component.html',
  styleUrls: ['./conversao-direta.component.scss']
})
export class ConvercaoDiretaComponent implements OnInit {
  moedasDisponiveis: string[] = [];
  moedasFiltradasOrigem: string[] = [];
  moedasFiltradasDestino: string[] = [];

  moedaOrigem: string = '';
  moedaDestino: string = '';
  valor: number = 0;
  resultado: number | null = null;
  isError: boolean = false;

  constructor(private conversaoService: ConvercaoDiretaService) {}

  ngOnInit(): void {
    this.conversaoService.listarConversao().subscribe({
      next: (res) => {
        this.moedasDisponiveis = Object.keys(res.conversion_rates);
        this.moedasFiltradasOrigem = this.moedasDisponiveis;
        this.moedasFiltradasDestino = this.moedasDisponiveis;
      },
      error: () => {
        this.isError = true;
      }
    });
  }

  filtrarMoedasOrigem(valor: string): void {
    this.moedasFiltradasOrigem = this.moedasDisponiveis.filter((moeda) =>
      moeda.toLowerCase().includes(valor.toLowerCase())
    );
  }

  filtrarMoedasDestino(valor: string): void {
    this.moedasFiltradasDestino = this.moedasDisponiveis.filter((moeda) =>
      moeda.toLowerCase().includes(valor.toLowerCase())
    );
  }

  converterMoeda(): void {
    if (this.moedaOrigem && this.moedaDestino && this.valor > 0) {
      this.conversaoService.converterPar(this.moedaOrigem, this.moedaDestino, this.valor).subscribe({
        next: (res) => {
          this.resultado = res.conversion_result;
          this.isError = false;
        },
        error: () => {
          this.isError = true;
        }
      });
    } else {
      this.isError = true;
    }
  }
}

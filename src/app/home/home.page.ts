import { Component } from '@angular/core';
import { StorageService, Carros } from '../services/storage.service';
import { Platform} from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public cars: Carros[] = []
  public custoKmGasolina: number
  public custoKmAlcool: number
  public resultado70: number
  public melhorOpt: string
  public opt: string
  public precoAtualGasolina: number
  public precoAtualAlcool: number


  public itemSelecionado: any;
  private consumoGasolina: number
  private consumoAlcool: number


  constructor(private storageService: StorageService, private plt: Platform) {
    this.plt.ready().then(() => {
      this.getCars();
    });
  }

  getCars() {
    this.storageService.getCars().then(
        cars => {
          this.cars = cars;
        });
  }

  calcular() {
    if (!this.itemSelecionado)


    {
      this.resultado70 = this.precoAtualGasolina * 0.7; /*console.log(this.resultado70)*/
      if (this.precoAtualAlcool < this.resultado70) {
        this.melhorOpt = 'Alcool.';
        this.opt = 'Opção baseada na diferença de 70%'
      } else {
        this.melhorOpt = 'Gasolina.';
        this.opt = 'Opção baseada na diferença de 70%'
      }



    } else {
      this.consumoGasolina = this.itemSelecionado.gasolina;
      this.consumoAlcool = this.itemSelecionado.alcool;
      this.custoKmGasolina = this.precoAtualGasolina / this.consumoGasolina;
      this.custoKmAlcool = this.precoAtualAlcool / this.consumoAlcool;

      if (this.custoKmGasolina <= this.custoKmAlcool) {
        this.melhorOpt = 'Gasolina!';
        this.opt = 'Calculado em cima do consumo do seu carro.'
      } else {
        this.melhorOpt = 'Alcool!';
        this.opt = 'Calculado em cima do consumo do seu carro.'
      }
    }
  }




}

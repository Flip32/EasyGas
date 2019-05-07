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
        this.melhorOpt = 'Alcool'; console.log('depois do alcool ' + this.resultado70)
      } else {
        this.melhorOpt = 'Gasolina'; console.log('depois do gasolina ' + this.resultado70)
      }



    } else {
      this.consumoGasolina = this.itemSelecionado.gasolina;
      this.consumoAlcool = this.itemSelecionado.alcool;
      this.custoKmGasolina = this.precoAtualGasolina / this.consumoGasolina;
      console.log(this.custoKmGasolina);
      this.custoKmAlcool = this.precoAtualAlcool / this.consumoAlcool;
      console.log(this.custoKmAlcool);

      if (this.custoKmGasolina <= this.custoKmAlcool) {
        this.melhorOpt = 'Gasolina com certeza';
      } else {
        this.melhorOpt = 'Alcool com certeza';
      }
    }
  }




}

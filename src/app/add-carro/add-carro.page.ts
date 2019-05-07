import { Component, ViewChild } from '@angular/core';
import { StorageService, Carros } from '../services/storage.service';
import { Platform, ToastController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-add-carro',
  templateUrl: './add-carro.page.html',
  styleUrls: ['./add-carro.page.scss'],
})
export class AddCarroPage {
    cars: Carros[] = [];
    newCar: Carros = <Carros>{};

    @ViewChild('mylist')mylist: IonList;

    constructor(private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
        this.plt.ready().then(() => {
            this.getCars();
        });
    }

    // CREATE
    addCar() {
        this.newCar.modified = Date.now();
        this.newCar.id = Date.now();

        this.storageService.addCar(this.newCar).then(
            car => {
                this.newCar = <Carros>{};
                this.showToast('Item added!')
                this.getCars(); // Or add it to the array directly
            });
    }

    // READ
    getCars() {
        this.storageService.getCars().then(
            cars => {
                this.cars = cars;
            });
    }

    // UPDATE
    editCar(car: Carros) {
        car.carName = `UPDATED: ${car.carName}`;
        car.modified = Date.now();

        this.storageService.editCar(car).then(
            car => {
                this.showToast('Item updated!');
                this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
                this.getCars(); // Or update it inside the array directly
            });
    }

    // DELETE
    deleteCar(car: Carros) {
        this.storageService.deleteCar(car.id).then(
            car => {
                this.showToast('Item removed!');
                this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
                this.getCars(); // Or splice it from the array directly
            });
    }

    // Helper
    async showToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }

}

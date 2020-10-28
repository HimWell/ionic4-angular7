import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs/observable/from';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ProductInfo } from '../ProductInfo';
import { User } from '../User';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  products: ProductInfo = {};
  product: ProductInfo;
  isValid = true;
  user: User[];
  users: User = {};
  selectedUserId;
  selectedUser: any = [];
  prodName = new FormControl('', [Validators.required, Validators.required]);
  prodDesc = new FormControl('', [Validators.required, Validators.required]);
  prodPrice = new FormControl('', [Validators.required, Validators.required]);

  // tslint:disable-next-line:max-line-length
  constructor(public apiService: ApiService, public loadingController: LoadingController, public route: ActivatedRoute, public router: Router, private fb: FormBuilder, private navCtrl: NavController) { }

  selectedProduct: any = [];

  ngOnInit() {
    this.route.paramMap.subscribe(value => {
      this.selectedUserId = value.get('id');
      this.selectedUser = value.params;
    });
  }

  async Create() {
    console.log('Added Product: ', this.products);
    this.apiService.addProduct(this.products).subscribe(async data => {
      const loading = await this.loadingController.create({
        duration: 2000,
        message: 'Adding Product, Please Wait...',
        translucent: true,
      });
      await loading.present();
      this.navCtrl.navigateForward(['../details', this.selectedUser]);
      this.products.prodName = '';
      this.products.prodDesc = '';
      this.products.prodPrice = null;
      this.selectedProduct = this.products;

    }, async err => {
      const loading = await this.loadingController.create({
        duration: 1000,
        message: 'Error Adding Product, Try Again...',
        translucent: true,
      });
      await loading.present();
      this.products.prodName = '';
      this.products.prodDesc = '';
      this.products.prodPrice = null;
    });
  }

  onClose() {
    this.products.prodName = '';
    this.products.prodDesc = '';
    this.products.prodPrice = null;
    this.navCtrl.navigateForward(['../details', this.selectedUser]);
  }
}

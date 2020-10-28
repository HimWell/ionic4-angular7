import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { from } from 'rxjs/observable/from';
import { ActivatedRoute, Router, ParamMap  } from '@angular/router';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductInfo } from '../ProductInfo';
import { MatSnackBar } from '@angular/material';
import { User } from '../User';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  products: ProductInfo = {};
  selectedProduct: any = [];
  selectedProductId;
  formBuilder: FormBuilder;
  isValid = true;
  user: User[];
  users: User = {};
  selectedUserId;
  selectedUser: any = [];
  prodName = new FormControl('', [Validators.required, Validators.required]);
  prodDesc = new FormControl('', [Validators.required, Validators.required]);
  prodPrice = new FormControl('', [Validators.required, Validators.required]);

  // tslint:disable-next-line:max-line-length
  constructor(public apiService: ApiService, public loadingController: LoadingController, public alertController: AlertController, public route: ActivatedRoute, public router: Router, private fb: FormBuilder, private snackBar: MatSnackBar, public navCtrl: NavController) {}

  ngOnInit() {
    this.route.paramMap.subscribe(value => {
    this.selectedProductId = value.get('id');
    this.selectedProduct = value.params;
    this.selectedUserId = value.get('id');
    this.selectedUser = value.params;
    console.log('Selected Product', this.selectedProduct);
    // console.log('Selected User', this.selectedUser);
  });
}

  async Save() {
    console.log('Updated Product: ', this.selectedProduct);
    this.apiService.updateProduct(this.selectedProduct).subscribe(async data => {
      const loading = await this.loadingController.create({
        duration: 2000,
        message: 'Updating Product, Please Wait...',
        translucent: true,
      });
      await loading.present();
      this.navCtrl.navigateForward(['../details', this.selectedUser]);
      this.selectedProduct = this.products;

    }, async err => {
      const loading = await this.loadingController.create({
        duration: 1000,
        message: 'Error Updating Product, Try Again...',
        translucent: true,
      });
      await loading.present();
    });
  }

  async Remove() {
    console.log('Removed Product: ', this.products);
    this.apiService.deleteProduct().subscribe(async data => {
      const loading = await this.loadingController.create({
        duration: 2000,
        message: 'Removing Product, Please Wait...',
        translucent: true,
      });
      await loading.present();
      this.navCtrl.navigateForward(['../details', this.selectedUser]);
      this.selectedProduct = this.products;

      }, async err => {
        const loading = await this.loadingController.create({
          duration: 1000,
          message: 'Error Deleting Product, Try Again...',
          translucent: true,
        });
        await loading.present();
      });
  }

  onClose() {
    this.navCtrl.navigateForward(['../details', this.selectedUser]);
  }
}

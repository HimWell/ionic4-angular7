import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../api.service';
import { ProductInfo } from '../ProductInfo';
import { User } from '../User';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  dataSource: ProductInfo[];
  products: ProductInfo = {};
  user: User[];
  users: User = {};
  tempList = [];
  selectedUserId;
  selectedUser: any = [];

  @ViewChild('tblProducts') table: any;

  // tslint:disable-next-line:max-line-length
  constructor(public apiService: ApiService, public alertController: AlertController, public loadingController: LoadingController, public router: Router, public route: ActivatedRoute, public navCtrl: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(value => {
      this.selectedUserId = value.get('id');
      this.selectedUser = value.params;
    });
    this.getProducts();
  }

  getProducts() {
    this.apiService.getProducts().subscribe(data => {
      this.dataSource = data;
      this.tempList = data;
    });
  }

  async Refresh() {
    const loading = await this.loadingController.create({
      message: 'Retrieving Latest Data from Server...',
      duration: 3000
    });
    await loading.present();
    this.getProducts();
  }

  editProductData(productData, userData) {
    this.navCtrl.navigateForward(['../edit', productData, this.selectedUser]);
    console.log('-->', productData, this.selectedUser);
  }

  searchFilter(event) {
    const val = event.target.value.toLowerCase();
    // tslint:disable-next-line:only-arrow-functions
    const temp = this.tempList.filter(function(d) {
      return d.prodName.toLowerCase().indexOf(val) !== -1 || !val ||
        d.prodDesc.toLowerCase().indexOf(val) !== -1 || !val ||
        d.prodPrice.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.dataSource = temp;
    this.table.offset = 0;
  }

  async Logout() {
    const loading = await this.loadingController.create({
      duration: 1000,
      message: 'Logging Out, Please Wait...',
      translucent: true,
    });
    await loading.present();
    this.navCtrl.navigateForward(['../home']);
  }

  async loadUsers() {
    if (this.selectedUser.username === 'rmakhubele@i1solutions.co.za') {
    const loading = await this.loadingController.create({
      duration: 3000,
      message: 'Loading Current Users, Please Wait...',
      translucent: true,
    });
    await loading.present();
    this.navCtrl.navigateForward(['../details-user', this.selectedUser]);
  } else {
    const alert = await this.alertController.create({
      header: 'Access Control',
      message: 'Unauthorized Access',
      buttons: ['OK']
    });

    await alert.present();
  }
  }
  addRedirect() {
    this.navCtrl.navigateForward(['../add', this.selectedUser]);
  }
}

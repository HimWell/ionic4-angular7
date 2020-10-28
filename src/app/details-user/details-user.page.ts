import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../User';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.page.html',
  styleUrls: ['./details-user.page.scss'],
})
export class DetailsUserPage implements OnInit {

  dataSource: User[];
  users: User = {};
  tempList = [];
  selectedUserId;
  selectedUser: any = [];
  @ViewChild('tblUsers') table: any;

  // tslint:disable-next-line:max-line-length
  constructor(public apiService: ApiService, public loadingController: LoadingController, public router: Router, public route: ActivatedRoute, public navCtrl: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(value => {
      this.selectedUserId = value.get('id');
      this.selectedUser = value.params;
    });
    this.getUsers();
  }

  getUsers() {
    this.apiService.getUsers().subscribe(data => {
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
    this.getUsers();
  }

  editUserData(userData) {
    // console.log('Edit Details: ', userData);
    // this.apiService.setSelectedUser(userData);
    this.navCtrl.navigateForward(['../edit-user', userData, this.selectedUser]);
  }

  searchFilter(event) {
    const val = event.target.value.toLowerCase();
    // tslint:disable-next-line:only-arrow-functions
    const temp = this.tempList.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val ||
      d.username.toLowerCase().indexOf(val) !== -1 || !val ||
      d.password.toLowerCase().indexOf(val) !== -1 || !val ||
      d.role.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.dataSource = temp;
    this.table.offset = 0;
  }

  async loadProducts() {
    const loading = await this.loadingController.create({
      duration: 3000,
      message: 'Loading Current Products, Please Wait...',
      translucent: true,
    });
    await loading.present();
    this.navCtrl.navigateForward(['../details', this.selectedUser]);
  }
  addRedirect() {
    this.navCtrl.navigateForward(['../add-user', this.selectedUser]);
  }
}

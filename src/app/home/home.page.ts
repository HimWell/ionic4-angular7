import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ApiService } from '../api.service';
import { User } from '../User';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  users: User = {};
  user: User;
  // tslint:disable-next-line:max-line-length
  constructor(public apiService: ApiService, public loadingController: LoadingController, public menu: MenuController, public router: Router, public route: ActivatedRoute, public navCtrl: NavController, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  async Login() {
    if (this.users.username === 'hchowhan@i1solutions.co.za' && this.users.password === 'Password1' ||
      this.users.username === 'gjacobs@i1solutions.co.za' && this.users.password === 'Password2' ||
      this.users.username === 'rmakhubele@i1solutions.co.za' && this.users.password === 'Password3') {
      const loading = await this.loadingController.create({
        duration: 2000,
        message: 'Login Successful, Please Wait...',
        translucent: true,
      });
      await loading.present();
      this.navCtrl.navigateForward(['../details', this.users]);
      this.users.username = '';
      this.users.password = '';
      this.users.name = '';
    } else {
      const loading = await this.loadingController.create({
        duration: 1000,
        message: 'Login Failed, Try Again...',
        translucent: true,
      });
      await loading.present();
      this.users.username = '';
      this.users.password = '';
      this.users.name = '';
    }
  }
}

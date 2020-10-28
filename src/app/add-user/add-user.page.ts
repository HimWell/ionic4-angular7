import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs/observable/from';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { User } from '../User';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  users: User = {};
  user: User;
  isValid = true;
  selectedUserId;
  selectedUser: any = [];
  name = new FormControl('', [Validators.required, Validators.required]);
  username = new FormControl('', [Validators.required, Validators.required]);
  password = new FormControl('', [Validators.required, Validators.required]);
  role = new FormControl('', [Validators.required, Validators.required]);

  // tslint:disable-next-line:max-line-length
  constructor(public apiService: ApiService, public loadingController: LoadingController, public navCtrl: NavController, public route: ActivatedRoute, public router: Router, private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.paramMap.subscribe(value => {
      this.selectedUserId = value.get('id');
      this.selectedUser = value.params;
    });
  }

  async Create() {
    console.log('Added User: ', this.users);
    this.apiService.addUser(this.users).subscribe(async data => {
      const loading = await this.loadingController.create({
        duration: 2000,
        message: 'Adding User, Please Wait...',
        translucent: true,
      });
      await loading.present();
      this.navCtrl.navigateForward(['../details-user', this.selectedUser]);
      this.users.name = '';
      this.users.username = '';
      this.users.password = '';
      this.users.role = '';
      this.selectedUser = this.users;

    }, async err => {
      const loading = await this.loadingController.create({
        duration: 1000,
        message: 'Error Adding User, Try Again...',
        translucent: true,
      });
      await loading.present();
      this.users.name = '';
      this.users.username = '';
      this.users.password = '';
      this.users.role = '';
    });
  }

  onClose() {
    this.users.name = '';
    this.users.username = '';
    this.users.password = '';
    this.users.role = '';
    this.navCtrl.navigateForward(['../details-user', this.selectedUser]);
  }
}

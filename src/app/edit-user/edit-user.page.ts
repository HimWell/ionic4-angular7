import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { from } from 'rxjs/observable/from';
import { ActivatedRoute, Router, ParamMap  } from '@angular/router';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../User';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  users: User = {};
  selectedUserId;
  formBuilder: FormBuilder;
  isValid = true;
  name = new FormControl('', [Validators.required, Validators.required]);
  username = new FormControl('', [Validators.required, Validators.required]);
  password = new FormControl('', [Validators.required, Validators.required]);
  role = new FormControl('', [Validators.required, Validators.required]);

  // tslint:disable-next-line:max-line-length
  constructor(public apiService: ApiService, public loadingController: LoadingController, public alertController: AlertController, public route: ActivatedRoute, public router: Router, private fb: FormBuilder, private snackBar: MatSnackBar, public navCtrl: NavController) { }

  selectedUser: any = [];

  ngOnInit() {
    this.route.paramMap.subscribe(value => {
      this.selectedUserId = value.get('id');
      this.selectedUser = value.params;
  });
  }

  async Remove() {
    console.log('Removed Product: ', this.users);
    this.apiService.deleteUser().subscribe(async data => {
      const loading = await this.loadingController.create({
        duration: 2000,
        message: 'Removing User, Please Wait...',
        translucent: true,
      });
      await loading.present();
      this.navCtrl.navigateForward(['../details-user', this.selectedUser]);
      this.selectedUser = this.users;

      }, async err => {
        const loading = await this.loadingController.create({
          duration: 1000,
          message: 'Error Deleting User, Try Again...',
          translucent: true,
        });
        await loading.present();
      });
  }

  async Save() {
    console.log('Updated User: ', this.selectedUser);
    this.apiService.updateUser(this.selectedUser).subscribe(async data => {
      const loading = await this.loadingController.create({
        duration: 2000,
        message: 'Updating User, Please Wait...',
        translucent: true,
      });
      await loading.present();
      this.navCtrl.navigateForward(['../details-user', this.selectedUser]);
      this.selectedUser = this.users;

    }, async err => {
      const loading = await this.loadingController.create({
        duration: 1000,
        message: 'Error Updating User, Try Again...',
        translucent: true,
      });
      await loading.present();
    });
  }

  onClose() {
    this.navCtrl.navigateForward(['../details-user', this.selectedUser]);
  }
}

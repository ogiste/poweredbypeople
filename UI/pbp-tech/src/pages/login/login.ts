import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';

import {User} from '../../providers';
import {MainPage} from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { username: string, password: string } = {
    username: '',
    password: 'password'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp) => {
      //Successful login
      this.navCtrl.push(MainPage);
    }, (err) => {
      // Unable to log in

      // Get the server message
      const msg = err.error.msg;

      let toast = this.toastCtrl.create({
        message: `${this.loginErrorString} \n ${msg}`,
        duration: 6000,
        position: 'middle'
      });
      toast.present();
    });
  }
}

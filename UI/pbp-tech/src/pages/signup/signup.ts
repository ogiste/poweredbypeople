import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';

import {User} from '../../providers';
import {MainPage} from '../';

enum role {
  regular,
  vendor,
};

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})


export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: {
    fname: string,
    lname: string,
    email: string,
    other_name: string,
    phone: string,
    username: string,
    role: role,
    password: string,
    isAdmin: boolean,
  } = {
    fname: 'Tess',
    lname: 'Huma',
    email: 'Tess@Huma.com',
    other_name: '',
    phone: '254203432032',
    username: 'user24',
    role: role.regular,
    password: '',
    isAdmin: false
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
              public user: User,
              public toastCtrl: ToastController,
              public translateService: TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {

      this.navCtrl.push(MainPage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}

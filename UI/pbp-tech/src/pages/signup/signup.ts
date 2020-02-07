import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';

import {User} from '../../providers';
import {MainPage} from '../';

enum role {
  regular = 'regular',
  vendor = 'vendor',
}

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
    othername: string,
    phone: string,
    username: string,
    role: role,
    password: string,
    isAdmin?: boolean,
  } = {
    fname: 'New',
    lname: 'Name',
    email: '',
    othername: '',
    phone: '254203432032',
    username: 'user24',
    role: role.regular,
    password: '',
  };

  // Our translated text strings
  private signupErrorString: string;
  private loginErrorString: string;

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
    const loginDetails = {username: this.account.username, password: this.account.password};
    this.user.signup(this.account).subscribe((resp) => {
      // Sign in if we're successful
      this.translateService.get('LOGIN_ERROR').subscribe((value) => {
        this.loginErrorString = value;
      });
      this.user.login(loginDetails).subscribe((resp) => {
        //Successful login
        let toast = this.toastCtrl.create({
          message: 'Welcome!',
          duration: 3000,
          position: 'middle'
        });
        toast.present();
        this.navCtrl.push(MainPage);
      }, (err) => {
        // Unable to log in
        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 6000,
          position: 'middle'
        });
        toast.present();
      });
    }, (err) => {
      // Get the server message
      const msg = err.error.msg;

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: `${this.signupErrorString} \n ${msg}`,
        duration: 6000,
        position: 'top'
      });
      toast.present();
    });
  }
}

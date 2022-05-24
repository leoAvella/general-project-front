import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';


import {UserService} from '../services/user.service';
import {UserModel} from '../models/user.model';
import {AppService} from '../services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  form: FormGroup;
  user = new UserModel();


  constructor(
      private userService : UserService,
      private modalService: NgbModal

  ) {

    this.form = new FormGroup({
      'email':      new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'),
        //Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:ª\.[a-zA-Z0-9-]+)*$')
      ]),
      'password':   new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });

  }

  ngOnInit(): void {

  }



  login() {
    this.user = this.form.value;
    if (this.form.valid) {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor!'
      });
      Swal.showLoading();
      this.userService.login(this.user)
          .subscribe(
              resp => {
                Swal.close();
                this.userService.setUserLogin(resp.data.user);
                this.modalService.dismissAll('close');
              }, (err) => {
                Swal.fire({
                  title: 'Error de autenticacion',
                  icon: 'error',
                  // toast: true,
                  text: err['statusText']
                });
              });
    } else {
      Swal.fire({
        title: 'Error de autenticacion',
        icon: 'error',
        text: 'Corrija los errores indicados en el formulario'
      });
    }
  }



}

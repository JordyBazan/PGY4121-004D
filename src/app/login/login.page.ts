import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController, private router: Router) { 
    this.formularioLogin = this.fb.group({
      'nombreLogin': new FormControl("", Validators.required), // Cambio de 'nombre' a 'nombreLogin'
      'password': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  async ingresar() {
    const nombreLogin = this.formularioLogin.value.nombreLogin; // Cambio de 'nombre' a 'nombreLogin'
    const passwordUsuario = this.formularioLogin.value.password;
  
    if (!nombreLogin || !passwordUsuario) {
      const alert = await this.alertController.create({
        header: 'Campos incompletos',
        message: 'Por favor, complete todos los campos',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }
  
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioEncontrado = usuariosRegistrados.find((usuario: any) =>
      usuario.nombreLogin === nombreLogin && usuario.password === passwordUsuario // Cambio de 'nombre' a 'nombreLogin'
    );
  
    if (usuarioEncontrado) {
      const alert = await this.alertController.create({
        header: `Bienvenido: ${nombreLogin}`, // Cambio de 'nombreUsuario' a 'nombreLogin'
        message: 'Inicio de sesión exitoso.',
        buttons: ['Aceptar']
      });
      await alert.present();
      this.router.navigate(['/home']);
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Credenciales incorrectas. Por favor, intenta nuevamente.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}

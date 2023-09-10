import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController) { 
    this.formularioRegistro = this.fb.group({
      'nombre':   new FormControl("",Validators.required),
      'apellido': new FormControl("",Validators.required),
      'rut':      new FormControl("",Validators.required),
      'carrera':  new FormControl("",Validators.required),
      'nombreLogin':   new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
      'confirmacionPassword': new FormControl("",Validators.required)
    });

  }

  ngOnInit() {
  }
  
  async guardar() {
    var f = this.formularioRegistro.value;
  
    // Verificar que ambos campos estén completos
    if (!f.nombre || !f.apellido || !f.rut || !f.carrera || !f.nombreLogin || !f.password || !f.confirmacionPassword) {
      const alert = await this.alertController.create({
        header:   'Campos incompletos',
        message:  'Por favor completa todos los campos antes de guardar.',
        buttons:  ['OK']
      });
      await alert.present();
      return;
    }
  
    // Verificar que las contraseñas coincidan
    if (f.password !== f.confirmacionPassword) {
      const alert = await this.alertController.create({
        header:   'Contraseñas no coinciden',
        message:  'La contraseña y la confirmación de contraseña no coinciden.',
        buttons:  ['OK']
      });
      await alert.present();
      return; // No continuar si las contraseñas no coinciden
    }
  
    var usuario = {
      nombre:        f.nombre,
      apellido:      f.apellido,
      rut:           f.rut,
      carrera:       f.carrera,
      nombreLogin: f.nombreLogin,
      password:      f.password
    }
  
    // Obtener la lista de usuarios existente o inicializar si no existe
    var usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Agregar el nuevo usuario a la lista
    usuariosGuardados.push(usuario);
  
    // Guardar la lista actualizada en el Local Storage
    localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));
  
    const successAlert = await this.alertController.create({
      header: 'Usuario guardado',
      message: 'El usuario ha sido guardado exitosamente.',
      buttons: ['OK']
    });
    await successAlert.present();
  }

}


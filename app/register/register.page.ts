import { Component, inject } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service'; // Sesuaikan path jika perlu

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  email = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  showConfirmPassword = false;


  private navCtrl = inject(NavController);
  private alertCtrl = inject(AlertController);
  private authService = inject(AuthService);

  async register() {
    // Pastikan semua field diisi dan password cocok
    if (this.password !== this.confirmPassword) {
      const alert = await this.alertCtrl.create({
        header: 'Registrasi Gagal',
        message: 'Password dan konfirmasi password tidak cocok.',
        buttons: ['OK'],
      });
      await alert.present();
      return; // Hentikan proses
    }

    if (this.email && this.password) {
      try {
        await this.authService.register(this.email, this.password);
        // Jika berhasil, kembali ke halaman register untuk masuk
        this.navCtrl.navigateBack('/login');
      } catch (error: any) {
        const alert = await this.alertCtrl.create({
          header: 'Registrasi Gagal',
          message: error.message,
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
}

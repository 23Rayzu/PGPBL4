import { Component, inject } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service'; // Pastikan path ini benar

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  // Variabel untuk menampung data dari form
  email = '';
  password = '';
  showPassword = false;

  // Menggunakan inject() untuk dependency injection yang modern
  private navCtrl = inject(NavController);
  private alertCtrl = inject(AlertController);
  private authService = inject(AuthService);

  async login() {
    // Validasi sederhana untuk memastikan input tidak kosong
    if (!this.email || !this.password) {
      console.log('email dan password harus diisi');
      return;
    }

    try {
      // Memanggil fungsi login dari AuthService
      await this.authService.login(this.email, this.password);

      // Jika berhasil, arahkan ke halaman utama dan hapus riwayat navigasi
      this.navCtrl.navigateRoot('/tabs');

    } catch (error: any) {
      // Jika gagal, tangkap error dan tampilkan pesan yang relevan
      const alert = await this.alertCtrl.create({
        header: 'Login Gagal',
        message: error.message, // Menampilkan pesan error asli dari service
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}

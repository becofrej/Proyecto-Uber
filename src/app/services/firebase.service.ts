import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fire:AngularFireAuth) { }


  async login(email:string, contrasena:string){

    try {
      return await this.fire.signInWithEmailAndPassword(email,contrasena); 
    } catch (error: any) {
      throw error;
    }
  }


  async registro(email:string, contrasena:string){
    try {
      return await this.fire.createUserWithEmailAndPassword(email,contrasena);
    } catch (error) {
      throw error;
    }
  }


  async resetPassWord(email:string){
    const request = await this.fire.sendPasswordResetEmail(email);
  }

  async logout(){
    await this.fire.signOut();
  }

}

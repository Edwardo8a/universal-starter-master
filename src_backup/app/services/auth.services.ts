import{Injectable}from'@angular/core';
import{AngularFireAuth}from'angularfire2/auth';
import {auth} from 'firebase/app';
import { Observable } from 'rxjs';
import { filter, map,take } from 'rxjs/operators';
import { User } from '../structure/user';
inport {}
import 'firebase/auth'; 


@Injectable({
    providedIn: 'root'
})
export class AuthService{
      constructor(private afAuth:AngularFireAuth){}

      getUser() : Observable<User>{
        return this.afAuth.authState.pipe(
            take(1),
            filter(user => !!user),
            map(user=> user as User))
      }

    login():Promise<void>{
     return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
     .then(result=>{
        console.log(result.user)
     }).catch(console.log);
    }
}
import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { take, map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthGuards implements CanActivate {
    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private ngZone: NgZone
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.afAuth.authState.pipe(
            take(1),
            map(user => {
                if (user) { return true; }
                this.ngZone.run(() => {
                    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                });
                return false;
            }),
            catchError(() => {
                this.ngZone.run(() => {
                    this.router.navigate(['/login']);
                });
                return of(false);
            })
        );
    }
}

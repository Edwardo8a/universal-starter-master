import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.services';
import { firebaseError } from '../services/firebase-error';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    busy = false;
    error = '';

    constructor(
        private auth: AuthService,
        private afAuth: AngularFireAuth,
        private route: ActivatedRoute,
        private router: Router,
        private ngZone: NgZone
    ) {}

    ngOnInit(): void {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.navigateHome();
            }
        });
    }

    private navigateHome(): void {
        this.ngZone.run(() => {
            const destination = this.route.snapshot.queryParamMap.get('returnUrl');
            const target = destination && destination.charAt(0) === '/' && destination.indexOf('//') !== 0
                ? destination : '/';
            this.router.navigateByUrl(target);
        });
    }

    login(): void {
        if (this.busy) { return; }
        this.busy = true;
        this.error = '';
        this.auth.login().then(() => {
            this.navigateHome();
            this.ngZone.run(() => { this.busy = false; });
        }).catch(error => {
            this.ngZone.run(() => {
                this.busy = false;
                this.error = firebaseError(error);
            });
        });
    }
}

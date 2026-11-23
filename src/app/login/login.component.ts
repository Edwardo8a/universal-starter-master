import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.services';
import { firebaseError } from '../services/firebase-error';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    busy = false;
    error = '';

    constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) {}

    login(): void {
        if (this.busy) { return; }
        this.busy = true;
        this.error = '';
        this.auth.login().then(() => {
            const destination = this.route.snapshot.queryParamMap.get('returnUrl');
            return this.router.navigateByUrl(
                destination && destination.charAt(0) === '/' && destination.indexOf('//') !== 0
                    ? destination : '/'
            );
        }).then(() => { this.busy = false; }).catch(error => {
            this.busy = false;
            this.error = firebaseError(error);
        });
    }
}

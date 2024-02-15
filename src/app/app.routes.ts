import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { CalcKeygenComponent } from './calc-keygen/calc-keygen.component';
import { CalcNetidComponent } from './calc-netid/calc-netid.component';
import { PrintRfmComponent } from './print-rfm/print-rfm.component';
import { PrintGwComponent } from './print-gw/print-gw.component';
import { CalcAddrComponent } from './calc-addr/calc-addr.component';

export const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'keygen', component: CalcKeygenComponent },
    { path: 'netid', component: CalcNetidComponent },
    { path: 'addr', component: CalcAddrComponent },
    { path: 'rfm', component: PrintRfmComponent },
    { path: 'gw', component: PrintGwComponent },
];

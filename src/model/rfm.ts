import { FCTRL } from "./fctrl";
import { MHDR } from "./mhdr";
import { Uplink } from "./frameuplink";

export class RFM {
    mhdr = new MHDR;
    fctrl = new FCTRL;
    addr = '';
    fcnt = 0;
    fport = 0;
    payload = '';
    // error code
    error = '';
    code = 0;
    uplink = new Uplink;

    public reset(): void {
        this.mhdr = new MHDR;
        this.fctrl = new FCTRL;
        this.addr = '';
        this.fcnt = 0;
        this.fport = 0;
        this.payload = '';
        this.error = '';
        this.code = 0;
        this.uplink = new Uplink;
    }

    public assign(value: object): void {
        if (typeof value !== 'undefined') {
            Object.assign(this, value);
        }
    }

    constructor(value: any = {}) {
        this.reset();
        try {
            let v;
            if (typeof value == 'string')
                v = JSON.parse(value);
            else
                v = value;
            if (typeof v !== 'undefined')
                this.assign(v);
        } catch (error) {
        
        }
    }
}

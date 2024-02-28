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
}

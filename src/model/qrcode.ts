export class QRCode {
    join_eui = '';
    dev_eui = '';
    profile_id = '';
    owner_token = '';
    serial_number = '';
    proprietary = '';
    requireCRC = false;

    public reset(): void {
        this.join_eui = '';
        this.dev_eui = '';
        this.profile_id = '';
        this.owner_token = '';
        this.serial_number = '';
        this.proprietary = '';
        this.requireCRC = false;
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

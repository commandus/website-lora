import { RFM } from "./rfm";
import { GwMetadata } from "./gwmetadata";

export class GwResponse {
    metadata = new GwMetadata; 
    rfm = new RFM;

    code = 0;
    error = '';
}

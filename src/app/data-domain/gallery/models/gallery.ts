import {Uuid} from "../../../infrastructure/uid/uuid";

interface DocumentPreview {
    id?: Uuid;
    height: number;
    width: number;
    mime: string;
    path: string;
}

export interface Document {
    id: Uuid;
    type: string;
    created: Date;
    updated: Date | null;
    path: string;
    previews: DocumentPreview[];
}

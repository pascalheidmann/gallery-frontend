import {Uuid} from "../../../infrastructure/uid/uuid";

export interface DocumentPreview {
    id: Uuid;
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

export interface DocumentDetails {
    id: Uuid;
    resource: string;
    type: string;
    mime: string;
    created: Date;
    updated: Date | null;
    path: string;
    categories: [];
    previews: DocumentPreview[];
    user: {
        id: Uuid;
        name: string;
    }
}

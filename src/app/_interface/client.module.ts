export interface Client{
    id: string;
    firstName: string;
    lastName: string;
    documentNumber: string;
    //public EDocumentType DocumentType { get; set; }
    address: string;
    phoneNumber: string;
    email: string;
    birthDate: Date;
  }
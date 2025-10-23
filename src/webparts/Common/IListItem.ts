export interface IListItem {
    ID: number;
    Title: string;
}

export interface IInvoiceListItem extends IListItem {
    Amount?: number;
}

export interface IPetListItem extends IListItem {
  Breed: string;
  Appointment: Date;
  PetSpecies: string;
}

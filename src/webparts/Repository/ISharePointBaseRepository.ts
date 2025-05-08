// import all interfaces
import { IRead } from '../Common/IRead';
import { IInvoiceListItem, IPetListItem } from "../Common/IListItem";
import IQuery from '../Common/IQuery';
import { IWrite } from '../Common/IWrite';

// that class only can be extended
export interface ISharePointBaseRepository<T extends IInvoiceListItem | IPetListItem> extends IRead<T>,IQuery<T>, IWrite<T> {

}
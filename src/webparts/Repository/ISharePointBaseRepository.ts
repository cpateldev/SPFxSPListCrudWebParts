// import all interfaces
import { IRead } from '../Common/IRead';
import { IListItem } from '../Common/IListItem';
import IQuery from '../Common/IQuery';
// that class only can be extended
export interface ISharePointBaseRepository<T extends IListItem> extends IRead<T>,IQuery<T> {

}
import { ICamlQuery } from "@pnp/sp/lists";
import IQueryOption from "./IQueryOption";

export default interface IQuery<T>{
    getItemsByCAMLQuery:(query: ICamlQuery, ...expands: string[])=> Promise<T[]>;
    getItemsByQuery:(queryOptions: IQueryOption)=>Promise<T[]>;
}
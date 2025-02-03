import {DefaultOptionType} from "rc-select/lib/Select";

export interface IOptLocation extends DefaultOptionType {
    info: {
        address: string
        url: string
    }
}

export interface IOptUser extends DefaultOptionType {

}
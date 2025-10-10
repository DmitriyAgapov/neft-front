import {makeAutoObservable} from "mobx";

export default class ProductVariantStoreClass {
    filters:Record<string, any>  = {
        plotnost: "single",
        rotary: "manual",
        dvigatel: "power-22"
    }
    params:Record<string, unknown>  = {
    }
    imagePath: string | null = null;
    constructor() {
        makeAutoObservable(this)
    }
    addFilter(name:string, value:any) {
        if (value === null || value === undefined || value === '') {
            this.filters[name] = '';
        } else {
            this.filters[name] = value
        }
        let _filters:Record<string, unknown> = {};

        Object.entries(this.filters).forEach(([key, value]) => {
            if (this.filters[key] !== "") {
                _filters[key] = {
                    contains: value
                }
            }
        })
        this.params = _filters;
    }
    setImagePath(state: "hover" | "default" = "default", slug?: string, value?: string) {
        if (this.filters.plotnost !== "" || this.filters.rotary !== "") {
            const path:string[] = [];
            if (slug === "plotnost" && value) {
                path.push("double");
            } else if (this.filters.plotnost) {
                path.push(this.filters.plotnost)
            }
            if (slug === "rotary" && value) {
                path.push(value);
            } else
            if (this.filters.rotary) {
                path.push(this.filters.rotary)
            }
            path.push(state);
            this.imagePath = path.join("_");
            return path.join('_')
        }
        this.imagePath = null;
        return null
    }
    get imageSrcPath() {
        return this.imagePath
    }
    get getFilters() {
        return this.filters
    }
    get getParams() {
        return this.params
    }
}
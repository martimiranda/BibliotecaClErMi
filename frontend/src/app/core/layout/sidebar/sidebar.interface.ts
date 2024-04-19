export interface MenuItem {
    label: string;
    icon: string;
    hidden?: boolean; 
    externalLink?: string; 
    routerLink?: string; 
    tooltip?: string;
    items?: MenuItem[];
    expanded?: boolean;
    permission?: number;
}
export interface responseSSO {
    url: string;
}
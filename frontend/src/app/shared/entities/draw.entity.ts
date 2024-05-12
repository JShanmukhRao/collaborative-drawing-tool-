export interface Color{
    name: string;
    value: string;
}

export interface Tool {
    name: string;
    value: number;
    icon: string;
    color?: Color;
}
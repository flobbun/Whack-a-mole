// declare modules here
declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.png' {
    const content: string;
    export default content;
}

declare module '*.jpg' {
    const content: string;
    export default content;
}
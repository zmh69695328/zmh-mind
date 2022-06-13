export {};

declare global {
  interface Window {
    exportSvg : any; // 👈️ turn off type checking
    exportPng : any;
    currentOperation: any;   
    M: any;   
    E: any;   
    currentOperation: any;
    mind:any;
    m:any
  }
}

export interface OtherStructures{
  [key:string] : {
    spacing: number;
    separation: number;
    salt: number;
  }
}
export interface Structures {
  stronghold?: {
    distance:number;
    count: number;
    spread: number;
  };
  structures?: OtherStructures
}
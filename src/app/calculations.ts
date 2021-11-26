import { Inject } from '@angular/core';

export class Calculations {
    first:number
    funcs:(x:number,y:number) => void
    constructor (@Inject(Number) first:number,@Inject(Function) funcs:(x:number,y:number) => string){
      this.first = first
      this.funcs = funcs
    //   console.log(first,'first')
    }
    evaluate(second:number) :string {
        console.log(second,'-----',this.first)
      //@ts-ignore
      return this.funcs(this.first,second)
    }
  }
  
import { Component } from '@angular/core';
import { Calculations } from './calculations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})


export class AppComponent {
  title = 'calco';
  initialDisplay = '0';
  signMap = {
    'divid' : function (a:number,b:number) {
      return b ? String(a/b) : "Math error"
    },
    'multiply' : function (a:number,b:number) {
      return String(a*b)
    },
    'plus' : function (a:number,b:number) {
      return String(a+b)
    },
    'minus' : function (a:number,b:number) {
      return String(a-b)
    },
    'plus_minus' : function (b:number) {
      return String(-b)
    },
    'percentage' : function (b:number,a=0) {
      return String(b/100)
    },
    'dot' : function(b:number,a=0){
      console.log(String(b) + '.','dot')
      return String(b) + '.'
    },
    "default" : function (b:number,a?:number,) {
      return String(b)
    }
  
  }
  operant :Calculations = new Calculations(0,this.signMap.default)
  last_val = 'default'
  num_of_equal = 0
  state = false
  hum = ''
  signs = [{
    text:['AC','+/-','%','/'],
    classes : ['special','special','special','sign'],
    props : ['del','plus_minus','percentage','divid',]

  },{
    text:['7','8','9','x'],
    classes: ['num','num','num','sign'],
    props : ['num','num','num','multiply',]
  },{
    text:['4','5','6','-'],
    classes :['num','num','num','sign',],
    props : ['num','num','num','minus',]

  },{
    text: ['1','2','3','+'],
    classes: ['num','num','num','sign',],
    props : ['num','num','num','plus',]

  },{
    text:['0','.','='],
    classes : ['num space-2','num','sign',],
    props : ['num','dot','equal',]

  }]
  parse (numText:string) {
    const numbers = parseFloat(numText)
    return isNaN(numbers) ?  numText : numText.length > 8 ? numbers.toExponential().toLocaleString() : numbers.toLocaleString("en")
  }
  onPadClick (value:string,type:string) {
    switch (type) {
      case "num":
        if (this.initialDisplay.length > 8)
          break
        if(this.initialDisplay === '0' || this.state)
         {
            this.initialDisplay = value
            this.state = false
          }
        else {
          this.initialDisplay += value
        }
        this.num_of_equal = 0

        break; 
      case "plus":
          this.operant = new Calculations(parseFloat(this.initialDisplay),this.signMap['plus'])
          this.last_val = 'plus'
          this.state = true
        break;

        case "minus":
          this.operant = new Calculations(parseFloat(this.initialDisplay),this.signMap['minus'])
          this.last_val = 'minus'
          this.state = true
          break;
        case "multiply":
          // console.log(this.initialDisplay,'mult')
          this.operant = new Calculations(parseFloat(this.initialDisplay),this.signMap['multiply'])
          this.last_val = 'multiply'
          this.state = true
          break;
        case "dot":
          if (this.initialDisplay.split('.').length < 2)
          {
            this.operant = new Calculations(parseFloat(this.initialDisplay),this.signMap['dot'])
          this.initialDisplay = this.operant.evaluate(5)
        }
          break;
        case "divid":
          this.operant = new Calculations(parseFloat(this.initialDisplay),this.signMap['divid'])
          this.last_val = 'divid'
          this.state = true
          break;
        case "percentage":
          this.operant = new Calculations(parseFloat(this.initialDisplay),this.signMap['percentage'])
          this.initialDisplay = this.operant.evaluate(5)
          break;
        case "equal":
          // console.log(this.initialDisplay,'eq')
          if(this.num_of_equal >= 1){            
            this.initialDisplay = this.operant.evaluate(parseFloat(this.initialDisplay))
          }
          else
            {
              const temp = this.initialDisplay
              this.initialDisplay = this.operant.evaluate(parseFloat(this.initialDisplay))
              //@ts-ignore
              this.operant = new Calculations(parseFloat(temp),this.signMap[this.last_val])
            }
          
          this.state = true
          this.num_of_equal += 1

          break;
          case "plus_minus":
            this.initialDisplay = this.signMap['plus_minus'](parseFloat(this.initialDisplay))
            break;
          case "del":
            if(this.state)
              this.initialDisplay = '0'
            else
              this.initialDisplay = this.initialDisplay.slice(0,-1) ? this.initialDisplay.slice(0,-1) : '0'
            this.num_of_equal = 0
            break;
          
      default:
        break;
    }
  }
}

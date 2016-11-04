import { Component } from '@angular/core';
@Component({
  host: { '(window:keypress)': 'keyHandler($event)' },
  selector: 'calculator',
  templateUrl: './templates/calculator.html',
})
export class CalculatorComponent { 
    val: number = 0;
    old: number = 0;
    operator: string = '=';
    isClean: boolean = true;
    display: string = '0';

  clear(): void {
    this.val = 0;
    this.old = 0;
    this.operator = '=';
    this.isClean = true;
    this.display = this.val.toString();
  };

  calculate(operator: string): any {
     switch(operator) {
           case '=':
                return this.val; // New value.
            case '+':
                return this.old + this.val;
            case '-':
                return this.old - this.val;
            case '*':
                return this.old * this.val;
            case '/':
                if(this.val !== 0) {
                    return this.old / this.val;
                } else {
                   return 'error';
                }               
            default:
                throw 'Invalid operation Error!';
        };
  };

  isDigit(value: string): boolean {
      return value >= '0' && value <= '9';
  };

  isOperator(value: string): boolean {
    console.log('Inside isOperator ' + value);
      switch(value) {
        case '=':
            return true;
        case '+':
            return true;
        case '-':
            return true;
        case '*':
            return true;
        case '/':
            return true;
        default:
            return false;
      }
  };

  evalDigit(data: string): number {
    return Number(data);
  };

  processInput(value: string): void {
    console.log('Processing Input Data ');
    var data = value;

    if(this.isDigit(data)) {
          console.log(data + ' Is Digit');

          var d = this.evalDigit(data);
          if(this.isClean) {
              // Start a new value.
              this.old = this.val;
              this.val = d;
          }else {
              // Add to the existing value.
              this.val = (this.val * 10) + d;
          }
          this.isClean = false;
      } 
      else if(this.isOperator(data)) {
          var op = data;
          console.log('Operator ' + data);
          var v = this.calculate(this.operator);
          if(v !== 'error') {
            if(!this.isClean) {
                // Start a new value.
                this.old = this.val;
            }
            this.val = v;
            this.operator = op;
            this.isClean = true;
          }
          else {
                  //document.getElementById('display').innerHTML = "Error!";
                  this.clear();
                  this.display = "Error!";
                  console.log(this);
                  console.log('Divide by zero error!');
                  return;
          }
      }
      else {
          console.log('Invalid operator error!');
      }
      console.log(this);
      //document.getElementById('display').innerHTML = this.val;
      this.display = this.val.toString();
  }

  keyHandler(event) {
    if(event.keyCode == 67 || event.keyCode == 99) {
      this.clear();
    } else {
      this.processInput(event.key);
    }
  }
}

const display1 = document.querySelector('.display-1');
const display2 = document.querySelector('.display-2');
const tempResult = document.querySelector('.temp-result');
const allClear = document.querySelector('.button-all-clear');
const clear = document.querySelector('.button-clear');
const buttonOperation = document.querySelectorAll('.button-operation');
const buttonNumber = document.querySelectorAll('.button-number');
const operationGleich = document.querySelector('.button-operation-gleich');

let dis1Num = '';
let dis2Num = '';
let result = null;
let lastOperation = '';
let haveDot = false;

buttonNumber.forEach( number => {
  number.addEventListener('click', (e)=> {
    if( e.target.innerText === '.' && !haveDot){
      haveDot = true;
    }
    else if(e.target.innerText === '.' && haveDot){
      return;
    }
    dis2Num += e.target.innerText;
    display2.innerText = dis2Num;
  })
});

buttonOperation.forEach( operation => {
  operation.addEventListener('click', (e)=>{
    if (!dis2Num) result;
    haveDot = false;
    const operationName = e.target.innerText;
    if(dis1Num && dis2Num && lastOperation){
      mathOperation();
    }else{
      result = parseFloat(dis2Num);
    }
    clearVar(operationName);
    lastOperation = operationName;
  })
})

function clearVar(name = ''){
  dis1Num += dis2Num+' '+ name + ' ';
  display1.innerText=dis1Num;
  display2.innerText='';
  dis2Num='';
  tempResult.innerText = result;
}

function mathOperation(){
  if(lastOperation === 'X'){
    result = parseFloat(result)*parseFloat(dis2Num);
  }
  else if(lastOperation==='+'){
    result = parseFloat(result)+parseFloat(dis2Num);
  }
  else if(lastOperation==='-'){
    result = parseFloat(result)-parseFloat(dis2Num);
  }
  else if(lastOperation==='/'){
    result = parseFloat(result)/parseFloat(dis2Num);
  }
  else if(lastOperation==='%'){
    result = parseFloat(result)%parseFloat(dis2Num);
  }
}

operationGleich.addEventListener('click', (e)=>{
  if(!dis1Num||!dis2Num) return;
  haveDot=false;
  mathOperation();
  clearVar();
  display2.innerText = result;
  tempResult.innerText = '';
  dis2Num = result;
  dis1Num = '';
})

allClear.addEventListener('click', (e)=>{
  display1.innerText = '0';
  display2.innerText = '0';
  tempResult.innerText = '0';
  dis1Num = '';
  dis2Num = '';
  result = '';
})

clear.addEventListener('click', (e)=>{
  display2.innerText = '';
  dis2Num = '';
})
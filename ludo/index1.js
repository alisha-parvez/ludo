//creating the board

let boxes=document.getElementsByClassName('box'); //checked through alert
let posA=[],posB=[];
let winA=0,winB=0;
let lockA=2,lockB=2;
let roll,turn;
let win=false;
let homeA=document.getElementById('homeA');

function createBoard()
{
  for(let i=0;i<8;i++)
  {
    let distLeft=8.75*i;
    boxes[i].style.left=distLeft+'vh';
  }

  for(let i=8;i<15;i++)
  {
    boxes[i].style.left=8.75*7+'vh';
    boxes[i].style.top=8.75*(i-7)+'vh';
  }

  for(let i= 15;i<22;i++)
  {
    boxes[i].style.right=8.75*(i-14)+'vh';
    boxes[i].style.top=8.75*7+'vh';
  }

  for(let i=22;i<28;i++)
  {
    boxes[i].style.right=8.75*7+'vh';
    boxes[i].style.bottom=8.75*(i-21)+'vh';
  }
}

function RandomNumber()
{
  return Math.floor(Math.random()*(7-1))+1;
}

function displayLocker()
{
  var Locker=document.getElementsByClassName('tokenSpace');
  Locker[0].textContent=lockA+'A';
  Locker[1].textContent=lockB+'B';
}


function checkBox()
{}

for(let i=0;i<boxes.length;i++)
{
  boxes[i].addEventListener('click',checkBox);
}



function generateRoll()
{
  //generating the roll
  roll=RandomNumber();
  var display=document.getElementById('rollValue');
  display.textContent="Roll is: "+roll;
  //generating the roll ends
}


function onRoll()
{

  //setting the default names home and start
  document.getElementById('box1').textContent="START";
  document.getElementById('box15').textContent="START";
  document.getElementById('box28').textContent="HOME";
  document.getElementById('box14').textContent="HOME";
  //setting the default names home and start  ends


  generateRoll();

  //if all tokens are in locker and 6 is rolled
  if(turn==='A' && lockA===2 && roll===6)
  {
    lockA=1;
    displayLocker();
    posA.push(1);
    document.getElementById('box1').textContent='1A';
    return;
  }
  if(turn=='B' && lockA==2 && roll===6)
  {
    lockB=1;
    displayLocker();
    posB.push(15);
    document.getElementById('box15').textContent='1B';
    return;
  }

  //if all tokens are in locker and 6 is rolled ends


  //if one token is already outside
  if(lockA==1)
  {
    if(posA[0]+roll<=28)
    {
      document.getElementById('box'+posA[0]).textContent='';
      posA[0]+=roll;
      document.getElementById('box'+posA[0]).textContent='1A';
      if(posA[0]===28)
        winA=1;
      return;
    }
  }
  else
  {
    if(posB[0]+roll<=28)
    {
      document.getElementById('box'+posB[0]).textContent='';
      posB[0]+=roll;
      document.getElementById('box'+posB[0]).textContent='1B';
      if(posB[0]===28)
        winB=1;
      return;
    }
  }
  //if one token is already outside ends

  //if two tokens are outside, the user clicks on the token outside or start
  //both events are brought on by clicking the token
}

var rollBtn=document.getElementById('rollButton');
rollBtn.addEventListener('click',onRoll);





function gamePlay()
{
  createBoard();
  displayLocker();
  turn='A';
  var turnDisplay=document.getElementById('turns');

  /*while(!win)
  {
      if(turn==='A')
      {
        turnDisplay.style.background='red';
        turnDisplay.textContent="A'S TURN TO ROLL";
      }
      else {
        turnDisplay.style.background='blue';
        turnDisplay.textContent="B'S TURN TO ROLL";
      }

  }*/

}

gamePlay();

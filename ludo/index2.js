//all variables needed are declared
let boxes=document.getElementsByClassName('box'); //checked through alert
let posA=[],posB=[];
let winA=0,winB=0;
let lockA=2,lockB=2;
let roll,turn;
let win=false;
var rollBtn=document.getElementById('rollButton');
var turnDisplay=document.getElementById('turns');
var display=document.getElementById('rollValue');
//variable declaration ends



//function to create the board
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

//function to create the board ends



//functions to find frequency of a position in pos
function frequencyA(pos)
{
  let f=0;
  for(let i=0;i<posA.length;i++)
  {
    if(posA[i]===pos)
      f++;
  }
  return f;
}

function frequencyB(pos)
{
  let f=0;
  for(let i=0;i<posB.length;i++)
  {
    if(posB[i]===pos)
      f++;
  }
  return f;
}
//functions to find frequency of a position in pos

//function to decide the turn and display it
function decideTurn()
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
}
//function to decide the turn and display it ends


//function that generates a random number,stores it as roll and displays it
function generateRoll()
{
  roll=Math.floor(Math.random()*(7-1))+1;
  display.textContent="Roll is: "+roll;
  if(turn==='A')
  {
    display.style.background='red';
  }
  else
  {
    display.style.background='blue';
  }
}
//function that generates a random number,stores it as roll and displays ends


//function to display the number of tokens in locker
function displayLocker()
{
  var Locker=document.getElementsByClassName('tokenSpace');
  Locker[0].textContent=lockA+'A';
  Locker[1].textContent=lockB+'B';
}
//function to display the number of tokens in locker ends

//function to take a token outside
function takeTokenOut()
{
    if(turn==='A')
    {
      lockA--;
      displayLocker();
      posA.push(1);
      if(document.getElementById('box1').textContent==='1A')
          document.getElementById('box1').textContent='2A';
      else {
        document.getElementById('box1').textContent='1A';
      }
    }
    else
    {
      lockB--;
      displayLocker();
      posB.push(15);
      if(document.getElementById('box15').textContent==='1B')
          document.getElementById('box15').textContent='2B';
      else
      {
        document.getElementById('box15').textContent='1B';
      }
    }
}
//function to take a token outside ends

//function to move a particular token
function moveToken(tokenNumber)
{
  if(turn==='A' && posA[tokenNumber]+roll<=28)
  {
          //check if current box is singly or doubly occupied
          let currentPos=posA[tokenNumber];

          posA[tokenNumber]+=roll;
            {
              if(frequencyA(currentPos)===0)
              document.getElementById('box'+currentPos).textContent='';
            }
          else
          {
            document.getElementById('box'+currentPos).textContent='1A';
          }
          //check if current box is singly or doubly occupied ends

          //check if next box is singly or doubly occupied
          if(frequencyA(posA[tokenNumber])===2)
              {
                document.getElementById('box'+posA[tokenNumber]).textContent='2A';
              }
            else {
              document.getElementById('box'+posA[tokenNumber]).textContent='1A';
            }
          //check check if next box is singly or doubly occupied
  }
  else
  {
    if(posB[tokenNumber]+roll<=28)
    {
      //check if current box is singly or doubly occupied
      let currentPos=posB[tokenNumber];
      posB[tokenNumber]+=roll;
      if(frequencyA(currentPos)===0)
        {
          document.getElementById('box'+currentPos).textContent='';
        }
      else
        {
          document.getElementById('box'+currentPos).textContent='1B';
        }
      //check if current box is singly or doubly occupied ends

      //check if next box is singly or doubly occupied
      if(frequencyB(posB[tokenNumber])===2)
        {
          document.getElementById('box'+posB[tokenNumber]).textContent='2B';
        }
        else
        {
          document.getElementById('box'+posB[tokenNumber]).textContent='1B';
        }
      //check check if next box is singly or doubly occupied
    }
  }
}
//function to move a particular token



//function that works when roll button is pressed
function onRoll()
{
    generateRoll();
    if(turn==='A')
    {
      if(lockA==2 && roll===6)
        {
          takeTokenOut();
          return;
        }
      if(lockA===1)
        moveToken(0);
    }
}
//function that works when roll button is pressed ends

//function that moves the token if present in the box
function MoveIfToken(index)
{
  let boxNo=index+1;
  alert(boxNo);
  if(turn==='A')
  {
        if(frequencyA(boxNo)===1)
        {
              if(posA[0]===boxNo)
              {
                  moveToken(0);
              }
              else
              {
                  moveToken(1);
              }
        }
        else
        {
            if(frequencyA(boxNo)===2)
            {
                moveToken(0);
            }
        }

  }//if turn A ends
  else
  {
          if(frequencyB(boxNo)===1)
          {
                if(posB[0]===boxNo)
                  {
                    moveToken(0);
                  }
                else
                {
                  moveToken(1);
                }
          }
          else
          {
            if(frequencyB(boxNo)===2)
            {
              moveToken(0);
            }
          }
    }
}
//function that moves the token if present in the box ends

//tasks happening
createBoard();
turn='A';
decideTurn();
rollBtn.addEventListener('click',onRoll);
for(let i=0;i<boxes.length;i++)
{
    boxes[i].addEventListener('click',onRoll);
}
//tasks end

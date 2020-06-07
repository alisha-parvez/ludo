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
var takeOutButtonA=document.getElementById('takeOutButtonA');
var takeOutButtonB=document.getElementById('takeOutButtonB');
var homeA=document.getElementById('homeA');
var homeB=document.getElementById('homeB');
let winBoard=document.getElementById('winBoard');
//variable declaration ends

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


//function to decide the turn and display it
function decideTurn()
{
  if(turn==='A')
  {
    turn='B';
  }
  else {
    turn='A';
  }
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


//function to take a token outside
function takeTokenOut()
{
    if(turn==='A')
    {
      if(document.getElementById('box1').textContent==='1B')
      {
        lockB++;
        displayLocker();
        posB=removeElement(posB,posA[tokenNumber]);
        document.getElementById('box1').textContent='1A';
        return;
      }
      if(document.getElementById('box1').textContent==='2B')
      {
        lockB+=2;
        displayLocker();
        posB=removeElement(posB,posA[tokenNumber]);
        document.getElementById('box1').textContent='1A';
        return;
      }

      lockA--;
      displayLocker();
      posA.push(1);
      if(document.getElementById('box1').textContent==='1A')
          {
            document.getElementById('box1').textContent='2A';
          }
      else
      {
        document.getElementById('box1').textContent='1A';
      }
    }
    else
    {
      if(document.getElementById('box15').textContent==='1A')
      {
        lockA++;
        displayLocker();
        posB=removeElement(posB,posA[tokenNumber]);
        document.getElementById('box1').textContent='1A';
        return;
      }
      if(document.getElementById('box15').textContent==='2A')
      {
        lockA+=2;
        displayLocker();
        posB=removeElement(posB,posA[tokenNumber]);
        document.getElementById('box1').textContent='1A';
        return;
      }

      lockB--;
      displayLocker();
      posB.push(15);
      if(document.getElementById('box15').textContent==='1B')
          {
            document.getElementById('box15').textContent='2B';
          }
      else
      {
        document.getElementById('box15').textContent='1B';
      }
    }
}
//function to take a token outside ends

//function to remove an element from an array
function removeElement(arr,ele)
{
    let arrNew=[];
    for(let i=0;i<arr.length;i++)
    {
      if(arr[i]!=ele)
        arrNew.push(arr[i]);
      else
      {
        continue;
      }
    }
    return arrNew;
}
//function to remove an element from an array ends



//function to move a particular token
function moveToken(tokenNumber)
{
    if(turn==='A' && posA[tokenNumber]+roll<=28)
    {
          let currentPos=posA[tokenNumber];
          posA[tokenNumber]+=roll;
          if(posA[tokenNumber]===28)
              {
                winA++;
                homeA.innerHTML='HOME<br>'+winA+'A';
                if(frequencyA(currentPos)===0)
                {
                    document.getElementById('box'+currentPos).textContent='';
                }
                else
                {
                    document.getElementById('box'+currentPos).textContent='1A';
                }
                if(winA===2)
                {
                  turnDisplay.style.background='red';
                  turnDisplay.textContent="A WON";
                }
              }
          if(document.getElementById('box'+posA[tokenNumber]).textContent ==='1B' && posA[tokenNumber]!=14)
            {
              lockB++;
              displayLocker();
              posB=removeElement(posB,posA[tokenNumber]);
            }
            if(document.getElementById('box'+posA[tokenNumber]).textContent ==='2B' && posA[tokenNumber]!=14)
            {
                lockB+=2;
                displayLocker();
                posB=removeElement(posB,posA[tokenNumber]);
            }
          if(frequencyA(currentPos)===0)
          {
              document.getElementById('box'+currentPos).textContent='';
          }
          else
          {
              document.getElementById('box'+currentPos).textContent='1A';
          }

          if(frequencyA(posA[tokenNumber])===2)
              {
                document.getElementById('box'+posA[tokenNumber]).textContent='2A';
              }
            else
            {
              document.getElementById('box'+posA[tokenNumber]).textContent='1A';
            }
          //check check if next box is singly or doubly occupied
  }
  else
  {
    if(!(posB[tokenNumber]+roll>14 && posB[tokenNumber]<=14))
    {
      //check if current box is singly or doubly occupied
      let currentPos=posB[tokenNumber];
      posB[tokenNumber]+=roll;
      posB[tokenNumber]=posB[tokenNumber]>28 ? (posB[tokenNumber]-28) : posB[tokenNumber];
      if(posB[tokenNumber]===14)
          {
            winB++;
            homeB.innerHTML='HOME<br>'+winB+'B';
            if(frequencyB(currentPos)===0)
              {
                document.getElementById('box'+currentPos).textContent='';
              }
            else
              {
                document.getElementById('box'+currentPos).textContent='1B';
              }
            if(winB===2)
            {
                turnDisplay.style.background='blue';
                turnDisplay.textContent="B WON";
            }
          }
      if(document.getElementById('box'+posB[tokenNumber]).textContent ==='1A' && posB[tokenNumber]!=28)
        {
          lockA+=1;
          displayLocker();
          posA=removeElement(posA,posB[tokenNumber]);
        }
        if(document.getElementById('box'+posB[tokenNumber]).textContent ==='2A' && posB[tokenNumber]!=28)
        {
            lockA+=2;
            displayLocker();
            posA=removeElement(posA,posB[tokenNumber]);
        }
      if(frequencyB(currentPos)===0)
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

  if(winA===2 || winB===2)
    winDisplay();
}
//function to move a particular token


//function that works when roll button is pressed
function onRoll()
{
    generateRoll();
    if(turn==='A')
    {
      if(lockA===2 && roll!=6)
      {
        decideTurn();
      }
      if(lockA===2 && roll===6)
        {
          takeTokenOut();
          decideTurn();
          return;
        }
      if(lockA===1 && homeA===1 && roll===6)
      {
        takeTokenOut();
        return;
      }
      if(lockA===1 && roll!=6)
        {
          moveToken(0);
          decideTurn();
        }
        if(winA===1 && roll!=6)
          {
              if(posA[0]===28)
                moveToken(1);
              else
              {
                  moveToken(0);
              }
              decideTurn();
          }
    }
    else
    {
      if(lockB===2 && roll!=6)
      {
        decideTurn();
      }
      if(lockB===2 && roll===6)
        {
          takeTokenOut();
          return;
        }
      if(lockB===1 && roll!=6)
        {
          moveToken(0);
          decideTurn();
        }
      if(winB===1 && roll!=6)
        {
            if(posB[0]===14)
              moveToken(1);
            else
            {
                moveToken(0);
            }
            decideTurn();
        }
    }
}
//function that works when roll button is pressed ends


function MoveIfToken(index)
{
  let boxNo=index+1;
  if(turn==='A' && (lockA===0 || (lockA===1 && roll===6)))
  {
        if(frequencyA(boxNo)===1)
        {
              if(posA[0]===boxNo)
              {
                  moveToken(0);
                  decideTurn();
              }
              else
              {
                  moveToken(1);
                  decideTurn();
              }
        }
        else
        {
            if(frequencyA(boxNo)===2)
            {
                moveToken(0);
                decideTurn();
            }
        }

  }//if turn A ends
  else
  {
      if(lockB===0 || (lockB===1 && roll===6))
      {
          if(frequencyB(boxNo)===1)
          {
                if(posB[0]===boxNo)
                {
                    moveToken(0);
                    decideTurn();
                }
                else
                {
                    moveToken(1);
                    decideTurn();
                }
          }
          else
          {
              if(frequencyB(boxNo)===2)
              {
                  moveToken(0);
                  decideTurn();
              }
          }
      }

  }
}
//function that moves the token if present in the box ends

//checking Roll
function checkRoll()
{
    roll=document.getElementById('rollInput').value;
    display.textContent="Roll is: "+roll;
    switch(roll)
    {
      case '1':
      roll=1;
      break;

      case '2':
      roll=2;
      break;

      case '3':
      roll=3;
      break;

      case '4':
      roll=4;
      break;

      case '5':
      roll=5;
      break;

      case '6':
      roll=6;
      break;

      default:
      alert('Value of roll must be 1 to 6');
    }
    if(turn==='A')
    {
      display.style.background='red';
    }
    else
    {
      display.style.background='blue';
    }
    if(turn==='A')
    {
      if(lockA===2 && roll!=6)
      {
        decideTurn();
      }
      if(lockA===2 && roll===6)
        {
          takeTokenOut();
          decideTurn();
          return;
        }
      if(lockA===1 && homeA===1 && roll===6)
      {
        takeTokenOut();
        return;
      }
      if(lockA===1 && roll!=6)
        {
          moveToken(0);
          decideTurn();
        }
        if(winA===1 && roll!=6)
          {
              if(posA[0]===28)
                moveToken(1);
              else
              {
                  moveToken(0);
              }
              decideTurn();
          }
    }
    else
    {
      if(lockB===2 && roll!=6)
      {
        decideTurn();
      }
      if(lockB===2 && roll===6)
        {
          takeTokenOut();
          return;
        }
      if(lockB===1 && roll!=6)
        {
          moveToken(0);
          decideTurn();
        }
      if(winB===1 && roll!=6)
        {
            if(posB[0]===14)
              moveToken(1);
            else
            {
                moveToken(0);
            }
            decideTurn();
        }
    }
}
//checking Roll ends



createBoard();
displayLocker();
turn='B';
decideTurn();
rollBtn.addEventListener('click',onRoll);
let rollBtnCheck=document.getElementById('checkRollButton');
rollBtnCheck.addEventListener('click',checkRoll);
for(let i=0;i<boxes.length;i++)
{
    boxes[i].addEventListener('click',function(){MoveIfToken(i);});
}
takeOutButtonA.addEventListener('click',function(){if(roll===6 && lockA===1) takeTokenOut();decideTurn();});
takeOutButtonB.addEventListener('click',function(){if(roll===6 && lockB===1) takeTokenOut();decideTurn();});

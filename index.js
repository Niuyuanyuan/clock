var canvas=document.querySelector('#canvas');
// console.dir(canvas);
var ctx=canvas.getContext('2d');//相当于画笔
//fill stroke



ctx.save();//保存


//canvas中关于矩形的
ctx.fillStyle='#ff00';
ctx.fillRect(150,150,100,100);


ctx.fillStyle='rgba(0,255,0,0.4)';
ctx.fillRect(200,200,100,100);

ctx.strokeStyle='rgb(0,0,255)';
ctx.strokeRect(3.5,3.5,100,300);//画长方形的线，加上点5是去掉边上的模糊区域


ctx.clearRect(200,200,50,50);//挖掉两个重叠的方形（深绿）


ctx.clearRect(0,0,400,400);








//关于画线条


ctx.beginPath();//路径
ctx.moveTo(200,200);
ctx.lineTo(400,200);
ctx.lineTo(300,400);
ctx.stroke();//路径规划好就能以线条的方式呈现
ctx.clearRect(0,0,400,400)//清除



ctx.beginPath();
ctx.arc(200,200,100,0,Math.PI*2);//圆心，半径，开始的角度，结束的角度/后面加上true是逆时针/
ctx.moveTo(270,200);
ctx.arc(200,200,70,0,Math.PI);
ctx.moveTo(180,170);
ctx.arc(170,170,10,0,Math.PI*2);
ctx.moveTo(240,170);
ctx.arc(230,170,10,0,Math.PI*2)
ctx.stroke();
ctx.clearRect(0,0,400,400);




//***********画布和程序的结合******************

//添加阴影
ctx.shadowOffsetX=10;
ctx.shadowOffsetY=10;
ctx.shadowBlur=10;
ctx.shadowColor="rgba(0,0,0,0.5)";


//随机的许多小球
for(var i=0;i<100;i++)
{
  ctx.beginPath();
  var xinx=Math.floor(Math.random()*400);
  var xiny=Math.floor(Math.random()*400);
  var radius=Math.floor(Math.random()*22+2);
  ctx.arc(xinx,xiny,radius,0,Math.PI*2);

  ctx.fillStyle='rgba('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.random()*1+')';
  ctx.fill();
}

ctx.clearRect(0,0,400,400);



//在画布中引入图片，并让它飞起来
    /*var img=new Image();
    img.src='image/5.jpg';
    img.onload=function()
    {
      ctx.drawImage(img,100,100);
    }
    var x=0;
    var draw=function()
    {
      ctx.clearRect(0,0,400,400);
      x+=1;
      ctx.drawImage(img,x,0);
    }
    setInterval(draw,2);
    */





//画布叠加
//*****有一个小球左移******
  /*var x=20;
  var y=20;
  var draw=function()
  {
    ctx.clearRect(0,0,400,400);

    x+=2;
    if(x==400)//当x=400时，让小球返回
    {
      x=0;
    }
    ctx.beginPath();
    ctx.arc(x,y,10,0,Math.PI*2);
    ctx.fill();

  }

  setInterval(draw,30);*/





//*******下面一个画布里面有一排矩形******
/*var canvas1=document.querySelector("#canvas1");
var ctx1=canvas1.getContext('2d');

for(var i=0;i<10;i++)
{
  ctx1.fillRect(i*100,0,70,100);
}*/





//ctx.fill();//路径规划好就能以填充的方式呈现
//stroke以线条的形式填充路径     fill是以色块的形式填充路径

//fillRect  strokeRect  clearRect
//beginPath moveTo  lineTo
//http://www.victoriakirst.com/beziertool*******算贝塞尔曲线的网址



 //ctx.save() ctx.restore  ctx.translate() ctx.rotate()

 //画一个圆，周边画12个小圆。用旋转画布的方式
 ctx.save();
 ctx.beginPath();
 ctx.translate(200,200);
 ctx.arc(0,0,30,0,Math.PI*2);
 for(var i=0;i<12;i++)
 {
  ctx.rotate(Math.PI/6);
  ctx.moveTo(70,0);
  ctx.arc(60,0,10,0,Math.PI*2);
}

ctx.restore();
ctx.stroke();


   //画辅助线,旋转三十度
   
   ctx.beginPath();
   ctx.moveTo(100,100);
   ctx.lineTo(500,100);
   ctx.moveTo(100,100);
   ctx.lineTo(100,500);
   ctx.stroke();

   ctx.save();
   ctx.translate(100,100);
   ctx.rotate(Math.PI/6);
   ctx.fillRect(0,0,30,30);   
   ctx.restore();
   ctx.clearRect(0,0,400,400);


  ctx.restore();//保存结束




   //*****************开始画钟表***********************

   /*var x;
   var i=1;
   setInterval(function()
   {
    x=Math.PI/30*i;
    drawClock();
    i++;
  },1000);*/

var drawClock=function()
{
  ctx.clearRect(0,0,400,400);    

    var d=new Date();
    var h=d.getHours();
    var m=d.getMinutes();
    var s=d.getSeconds();
    //保存一个干净的画布
    ctx.save();
    //移动画布圆点到中心
    ctx.translate(200,200);

    //画最外层的表盘
    ctx.save();
    ctx.strokeStyle='#2af';
    ctx.shadowOffsetX=1;
    ctx.shadowOffsetY=3;
    ctx.shadowBlur=10;
    ctx.shadowColor='red';
    ctx.lineWidth=8;

    ctx.beginPath();
    ctx.arc(0,0,180,0,Math.PI*2);
    ctx.stroke();
    ctx.restore();

   //画时间刻度
   ctx.save();
   ctx.lineWidth=4;
   ctx.lineCap='round';
   for(var i=1;i<61;i++)
   {
     ctx.rotate(Math.PI/30);
     ctx.beginPath();
     if(i%5==0)
     {
      ctx.moveTo(148,0)
    }
    else{
      ctx.moveTo(155,0);
    }
    ctx.lineTo(165,0);
    ctx.stroke();                   
  } 
  ctx.restore();


    //画时针
    ctx.save();
    ctx.beginPath();
    ctx.rotate(Math.PI*2*(h*3600+m*60+s)/(12*3600));
    ctx.lineWidth=10;
    ctx.strokeStyle='black';
    ctx.lineCap='round';
    ctx.moveTo(0,30);
    ctx.lineTo(0,-80);
    ctx.stroke();
    ctx.restore();

    //画分针
    ctx.save();
    ctx.beginPath();
    ctx.rotate(Math.PI*2*(m*60+s)/3600);
    ctx.lineWidth=6;
    ctx.lineCap='round';
    ctx.strokeStyle='#006700';
    ctx.moveTo(0,40);
    ctx.lineTo(0,-100);
    ctx.stroke();
    ctx.restore();


   //画秒针
    ctx.save();
    // ctx.rotate(x);
    ctx.rotate(Math.PI/30*s);
    ctx.beginPath();
    ctx.lineWidth=4;
    ctx.lineCap='round';
    ctx.strokeStyle='red';
    ctx.moveTo(0,50);
    ctx.lineTo(0,-103);
    ctx.moveTo(10,-113);
    ctx.arc(0,-113,10,0,Math.PI*2);
    ctx.moveTo(0,-123);
    ctx.lineTo(0,-143);
    ctx.stroke();
    ctx.restore();

   //画中心的小圆点   
   ctx.save();
   ctx.beginPath();
   ctx.arc(0,0,8,0,Math.PI*2);
   ctx.fillStyle='red';
   ctx.fill();
   ctx.restore();

   //复原一开始保存的那个干净的画布状态
   
   requestAnimationFrame(drawClock);
   ctx.restore();
 }
 
  requestAnimationFrame(drawClock);

   //这种动画方式 当当前窗口处于未激活状态时，动画帧数会明显降低 
   //requestAnimationFrame();
   
      /*var aa=function()
      {
      console.log(1);
      requestAnimationFrame(aa);
      }
      requestAnimationFrame(aa);*/

 




 //这是保存页面为一张图片的代码
 document.onclick=function()
 {
  location.href=(canvas.toDataURL().replace('data:image/png','data:stream/octet'));
 }
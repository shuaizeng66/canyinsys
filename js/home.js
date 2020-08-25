// @ts-nocheck
 
 //轮播
 var arrimg = [
     'imgs/bg_2.jpg,we love,Delicious Foods',
     'imgs/bg_3.jpg,Eat Healthy,and Natural Foods'
    ];
 for (let i = 0; i < arrimg.length; i++) {
     let img = arrimg[i].split(',')[0]; 
     $('.car-img').append($(`<img class='${i==0?"active":""}' src='${img}'></img>`));
 }
 var j=0;
 $('#carousel>button').click((e)=>{
    var target = e.target;
    if($(target).text()=='>'){
         setcar(1);
    }else {
         setcar(-1);
    }
 });

 setInterval(()=>{
     setcar(1);
 },3000);

 function setcar(x){
     j=j+x;
     j==arrimg.length ? j=0 : j==-1 ? j=arrimg.length-1 : j=j;
     $('.car-img img').removeClass();
     $('.car-img img')[j].className='active';
     $('.car-left h1')[0].innerHTML=arrimg[j].split(',')[1];
     $('.car-left h1')[1].innerHTML=arrimg[j].split(',')[2];
 }

//设置nav的动画
var times0 = null;
$(window).scroll(()=>{
    var top =$(window).scrollTop();
    // console.log(top);
    if(top>=150){
        $("#navbar").css({
            "position":"fixed",
            "width":"100%",
            "left":"0",
            "top":"0",
            'background':'#fff',
            'margin-top': '0'
        });
        $('.navbar-collapse ul li a').css({'color':'#000'});
        $('.place').css({'display':'block'});
    }else{
        $("#navbar").css({
            'margin-top': '20px',
            'background':'transparent',
        });
        $('.navbar-collapse ul li a').css({'color':'#fff'});
        $('.place').css({'display':'none'});
    }

    //设置的counter 动画
    if(top>=1000){
        var $text0 =$($('.counter-text>h1')[0]);
        var $text1 =$($('.counter-text>h1')[1]);
        var $text2 =$($('.counter-text>h1')[2]);
        var $text3 =$($('.counter-text>h1')[3]);
        if(!times0){
            times0 = setInterval(()=>{
                $text0.text(($text0.text()*1)+1);
                if($text0.text()=='18'){
                    clearInterval(times0);
                }
            },200);
            times1 = setInterval(()=>{
                $text1.text(($text1.text()*1)+1);
                if($text0.text()=='18'){
                    $text1.text('20,000');
                    clearInterval(times1);
                    times1 = null;
                }
            },1);
            times2 = setInterval(()=>{
                $text2.text(($text2.text()*1)+1);
                if($text0.text()=='18'){
                    $text2.text('564');
                    clearInterval(times2);
                    times2 = null;

                }
            },2);
            times3 = setInterval(()=>{
                $text3.text(($text3.text()*1)+1);
                if($text0.text()=='18'){
                    $text3.text('300');
                    clearInterval(times3);
                    times3 = null;
                }
            },10);
        }
    }


    //设置about-img 动画
    let imga = $('#about .about-left .about-data div img');
    if(top>=600 && top<=1400){
        imga.fadeIn(500);
    }else {
        imga.fadeOut(500);
    }

    if(top>=1500 && top<=2800){
       $('.specialties-text>div').fadeIn(1000);
    }

    //设置about-a标签 动画
    if(top>=2200 && top<=3000){
        $('#specialties>a').fadeIn(1000);
     }

     //设置chef-img 动画
     if(top>=3200 && top<=4200){
        $('.chef-con>div>img').fadeIn(1000);
     }

     //设置end-img 动画
     if(top>=4650){
        $('.end-dox-01>div>img').fadeIn(1000);
     }
});





//视频播放
$('.play').click(()=>{
    $('#div-video').css('display','block');
});

$('#div-video button').click(()=>{
    $('#div-video')[0].style.display = 'none';
});



//时间选择器
laydate.render({
    elem:'#date',
    type:'date',//默认为date
    trigger:'click'//默认为click，即点击后出现日历框
});
laydate.render({
    elem: '#time',
    trigger:'click',
    type: 'time'
});



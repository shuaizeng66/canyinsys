// @ts-nocheck
var title = $('title').text();
//设置nav的动画
var times0 = null;
$(window).scroll(()=>{
    // console.log($(window).scrollTop())
    var top =$(window).scrollTop();
    if(top>=120){
        $("#navbar").css({
            "position":"fixed",
            "width":"100%",
            "left":"0",
            "top":"0",
            'background':'#fff',
        });
        $('.navbar-collapse ul li a').css({'color':'#000'});
    }else{
        $("#navbar").css({
            "position":"relative",
        });
        $('.navbar-collapse ul li a').css({'color':'#000'});
    }


    //设置的counter 动画
    if(top>=800){
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

    if(title=='Specialties'){
        if(top>=200){
            $('.specialties-text>div').fadeIn(1000);
         }
    }

});



//视频播放
$('.play').click(()=>{
    $('#div-video').css('display','block');
});

$('#div-video button').click(()=>{
    $('#div-video')[0].style.display = 'none';
});



if(title=='Reservation'){
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
}
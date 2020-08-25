// @ts-nocheck


var title = $('title').text();

//about  data
if(title=='home' || title=='about'){
    $.getJSON('php/common.php?callback=?','key=1',(data)=>{
        // console.log(data);
        let i = parseInt(Math.random()*data.length);
        $('#about>img')[0].src=data[i].photo;
        $('#about .about-left>p').text(`Welcome to ${data[i].name} Restaurant`);
        $('#about .about-left > span:nth-of-type(2)').text(data[i].brief);
        let specialRecipes = data[i].SpecialRecipe.split(',');
        for (let j = 0; j < 3; j++) {
            $('.about-data img')[j].src = specialRecipes[j].split(':')[1];
            $('.about-data span')[j].innerHTML = specialRecipes[j].split(':')[0];
        } 
    });
}


//menu  data
if(title=='home' || title=='Specialties'){
    var Breakfast=[],Lunch=[],Dinner=[],Desserts=[],Wine=[],Drinks=[];
    $.getJSON('php/common.php?callback=?','key=2',(data)=>{
        // console.log(data);
        data.sort(() => Math.random() - 0.5); //打乱数组，随机取数
        for (let i = 0; i < data.length; i++) {
            if(data[i].classify=='Breakfast'){
                Breakfast.push(data[i]);
            }else if(data[i].classify=='Lunch'){
                Lunch.push(data[i]);
            }else if(data[i].classify=='Dinner'){
                Dinner.push(data[i]);
            }else if(data[i].classify=='Desserts'){
                Desserts.push(data[i]);
            }else if(data[i].classify=='Wine'){
                Wine.push(data[i]);
            }else if(data[i].classify=='Drinks'){
                Drinks.push(data[i]);
            }
        }
        
        if(title=='home'){
            creatediv(Breakfast,3);
            creatediv(Lunch,3);
            creatediv(Dinner,3);
            creatediv(Desserts,3);
            creatediv(Wine,3);
            creatediv(Drinks,3);
        }else {
            creatediv(Breakfast,Breakfast.length);
            creatediv(Lunch,Lunch.length);
            creatediv(Dinner,Dinner.length);
            creatediv(Desserts,Desserts.length);
            creatediv(Wine,Wine.length);
            creatediv(Drinks,Drinks.length);
        }

        function creatediv(data,leng){
            let divmax = $(`<div class='specialties-text'><h2>${data[0].classify}</h2></div>`);
            
            for (let i = 0; i<leng; i++) {
                let div = $(
                    `<div>
                        <img src="imgs/${data[i].photo}" alt="">
                        <span>${data[i].name}</span>
                        <span>${data[i].materials}</span>
                        <span>$${data[i].price}</span>
                    </div>`);
                divmax.append(div);
            }
            $('#specialties>a').before(divmax);//插入到<a>的前面
        }
    });
}

//Chef  data
if(title=='home' || title=='about'){
    $.getJSON('php/common.php?callback=?','key=3',(data)=>{
        // console.log(data)
        data.sort(() => Math.random() - 0.5); //打乱数组，随机取数
        for (let i = 0; i < 4; i++) {
            let div = $(`
                <div>
                    <img src="imgs/${data[i].photo}" alt="" />
                    <p>${data[i].name}</p>
                    <p>${data[i].position}</p>
                    ${title=='about'?'<p>'+data[i].brief+'</p>':''}
                    <img src="imgs/xn.png" alt="">
                    <img src="imgs/f.png" alt="">
                    <img src="imgs/g.png" alt="">
                    <img src="imgs/o.png" alt="">
                </div>
            `);
            $('.chef-con').append(div);
        }
    });
}

//Stories  data
if(title=='Stories'){
    $.getJSON('php/common.php?callback=?','key=4',(data)=>{
        // console.log(data)
        pageAjax(1,data);

        let page = Math.ceil(data.length/6);
        if(page>0){
            for (let i = 0; i < page ; i++) {
                let span = $(`<span class='${i==0?'active':''}'>${i+1}</span>`);
                $('.page>button:nth-of-type(2)').before(span);
            }

            $('.page>button').click((e)=>{
                let target = e.target;
                let active = $('.page>span.active');
                if($(target).text()=='>'){
                    if(active.next().text()!='>'){
                        active.removeClass().next().addClass('active');
                        pageAjax(active.next().text(),data);
                    }
                }else {
                    if(active.prev().text()!='<'){
                        active.removeClass().prev().addClass('active');
                        pageAjax(active.prev().text(),data);
                    } 
                }
            });

            $('.page>span').click((e)=>{
                let target = e.target;
                if($(target)[0].className!='active'){
                    pageAjax($(target).text(),data);
                    $(target).addClass('active').siblings().removeClass();
                }else {
                    console.log($(target)[0].className);
                }
                
            });
        }
    });

    function pageAjax(x,data){
        if($('.stories-con').length>0) $('.stories-con').remove();
        let index = data.length > 6*x ? 6*x : data.length;
        for (let i = (x-1)*6; i < index; i++) {
            let div = $(`
            <div class='stories-con'>
                <img src="${data[i].photo}" alt="">
                <div>
                    <p>${data[i].date}</p>
                    <h3>${data[i].brief}</h3>
                    <p>Read more</p>
                    <span>3</span>
                </div>
            </div>
            `);
            $('#stories').prepend(div);
        }

        $('.stories-con').fadeIn(1000);
    }

    



}


//testimony  data
var index = 0;
if(title=='home' || title=='about'){
    $.getJSON('php/common.php?callback=?','key=5',(data)=>{
        console.log(data)
        //testimony 轮播 绑定button
        $('#testimony>button').click((e)=>{
            var target = e.target;
            if($(target).text()=='>'){
                creatediv('rigth',data,-1,null);
            }else {
                creatediv('left',data,1,null);
            }
        });

        //testimony  绑定li
        $('#testimony>ul>li').click((e)=>{
            var target = e.target;
            let a = $('#testimony>ul>li.active').index();
            if($(target).index()>a){
                creatediv('rigth',data,-1,$(target).index());
            }else {
                creatediv('left',data,1,$(target).index());
            }
        });

        //设置定时器
        timer = setInterval(()=>{
            creatediv('rigth',data,-1,null);
        },3000);
        
        $('#testimony').mouseover(()=>{
            clearInterval(timer);
            timer = null;
        });

        $('#testimony').mouseout(()=>{
            timer = setInterval(()=>{
                creatediv('rigth',data,-1,null);
            },3000);
        });

    });



    //创建div函数
    function creatediv(active,data,x,a){
        //判断是否有动画，有动画则不执行
        if(!$('.testimony-car>div:first').is(':animated')){
            if(a==null){
                if(active=='rigth'){
                    index++;
                    index==data.length?index=0:index;
                }else if(active=='left'){
                    index--;
                    index==-1?index=data.length-1:index;
                }
            }else {
                index = a;
            }

            let div = $(`
                <div class='testimony-con active-${active}'>
                    <img src="imgs/${data[index].photo}" alt="">
                    <span><img src="imgs/dd.jpg" alt=""></span>
                    <p>${data[index].brief}</p>
                    <p>${data[index].name}</p>
                    <p>Customer</p>
                </div>
            `);
            //div渲染到页面上
            $('.testimony-car').append(div);
        
            //移动第一张图片动画后并删除
            $('.testimony-car>div:first').animate({
                'left':x*600+'px'
            },1000,()=>{
                $('.testimony-car>div:first').remove();
            });
            
            //移动第二张图片
            $('.testimony-car>div:last').animate({
                'left':'0',
            },1000);

            //设置li动画
            $($('#testimony>ul>li')[index]).addClass('active').siblings().removeClass();
        }
    }
}
require(["config"], () => {
    require(['template','url','header','footer','zoom','fly'], (template,url) => {

        class Detalis{
            constructor(){
                this.container = $('#detalis_information')
                this.addToCart()//这里调用用事件委托，then里面不需要
                this.getDate().then((list)=>{
                    this.renderList(list)
                });
            }
            getDate(){

                const id =window.location.search.slice(4);
                console.log(id);


                return new Promise(resolve =>{
                    $.get(url.rapBaseUrl + '/shop/Detalis',{id},(resp)=>{
                        console.log(resp);
                        //给detalis加上id字段
                        
                        if(resp.code===200){
                            const {list} =resp.body
                            //扩展对象
                            list.id=id
                            //存在this身上，别的方法可以获取当前商品信息
                            this.list=list;
                            resolve(list)
                                }
                                            
                            })
                       })
                    }
            renderList(list){

                
                    let str=template('list-template',{ item:list})
                    this.container.html(str);
                    let st=template('template-img',{ data:list})
                    $('#shop-imgs').html(st);
                    this.zoomImg()
                }
                zoomImg(){
                    $('.big_img').elevateZoom({
                        gallery:'img_ul',//ul父级盒子的id
                        cursor:'pointer',
                        borderSize:'1',
                        galleyActiceClass:'active',
                        borderColor:'#f2f2f2'
                    })
                }
                //购物车事件
                addToCart(){
                    let _this =this
                    $('body').on('click','.shop-button',function(){
                        //飞入购物车 商品加入购物车
                        const src = _this.list.images[0]
                        $(`<img src="${src}" style="width:30px;height:30px;z-index:5;border-radius:50%;">`).fly({
                            start:{
                                left:$(this).offset().left,
                                top:$(this).offset().top
                            },
                            end:{
                                left:$('#lol-hd-shop').offset().left,
                                top:$('#lol-hd-shop').offset().top,
                                width:0,
                                height:0
                            },
                            onEnd:function(){
                                   this.destroy()
                                   //动画完成 +1
                                    let num = parseInt($('#lol-buy-num').html())
                                    num++
                                    console.log(num)
                                    $('#lol-buy-num').html(num) 

                            }
                        })

                        //商品加入购物车 把商品存入localStorage
                        // let str = JSON.stringify(_this.list)
                        // localStorage.setItem('cart',str)

                        //先取判断是否为空
                        let allCart = localStorage.getItem('cart')
                        if(allCart){
                          //购物车有数据有数据
                          //（取出来）转换
                          allCart = JSON.parse(allCart)
                          //判断当前商品是否存在   
                            const isExist = allCart.some(shop=>{
                                return shop.id === _this.list.id
                            })
                            if(isExist){
                                //当前商品加入购物车了 执行
                                allCart=allCart.map(shop=>{
                                    if(shop.id === _this.list.id) shop.num++
                                    //map循环都有返回值，返回都有新数组，得到新的结果
                                    return shop
                                })
                                //存一回 覆盖以前的
                                //localStorage.setItem('cart',JSON.stringify(allCart))
                            }
                            else{
                                    //有数据 但不存这一条
                                    //push商品
                                    //默认商品在购物车选中状态
                                    allCart.push({
                                        ..._this.list,
                                        num :1,
                                        check:true
                                    })
                               //localStorage.setItem('cart',JSON.stringify(allCart))
                            }
                            //if else 都存心存
                            localStorage.setItem('cart',JSON.stringify(allCart))
                        }else{
                            //购物车无数据
                            //把当前数据构造成数组 存进去 默认加入num字段
                            let arr =[
                                {
                                    ..._this.list,
                                    num:1,
                                    check:true
                                }
                            ]
                            localStorage.setItem('cart',JSON.stringify(arr))
                        }
                    })
                }
            }
            new Detalis()
        })
    })
        
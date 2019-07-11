define(['tools','jquery'], () => {
    class Header{
        constructor(){
            this.container = document.querySelector("header");
            this.containe =$('header');
            this.ul =document.querySelector('.search_ul');
            this.li =document.createElement('li')
            this.load()
            this.init().then(()=>{
                this.search()
                //购物车的dom也是加载的 ，所以只能在这获取
                this.cartWrap=$('#lol-buy-num')
                this.calcNum()
            });
            
            
        }
        load(){
            tools.ajaxGetPromise("http://localhost:1997/html/modules/header.html",null,false).then(data => {
                this.container.innerHTML = data;
            })
        }
        init(){
            return new Promise(resolve =>{
                this.containe.load('http://localhost:1997/html/modules/header.html',resolve)
            })
        }
        

        //头部搜索
        search(){
            $('#shop_search').on('keyup',function(){
                let inputValue = $(this).val()
                $.getJSON(`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${inputValue}&cb=?`,resp=>{
                    console.log(resp);
                })
                
            })
        }

        //购物车的总数
        calcNum(){
            let cart = localStorage.getItem('cart')
            if(cart){
                cart=JSON.parse(cart)
                let totalNum=cart.reduce((num,shop)=>{
                    num+=shop.num
                    return num
                },0)
                this.cartWrap.html(totalNum)
            }else{
                this.cartWrap.html(0)
            }
        }
    }
    return new Header();
})
require(["config"], () => {
    require(['template','header','footer','jquery'], (template,header) => {
        class Cart{
            constructor(){
                this.ulshop = $('#ul-shop')
                this.totaPrice=$('#heji')
                this.allCheck=$('.li_qs_input')
                this.init()
                this.calcMoney()
                this.checksChange()
                this.allCheckChange()
                this.calcNumber()
                this.deLite ()
                this.reduce()
                this.add()
            }
            init(){
                this.cart =JSON.parse(localStorage.getItem('cart'))

                // console.log(this.cart);
                // //有数据
                let str = template('template-cart',{cart: this.cart})
                this.ulshop.html(str)

                let isAllChack = this.cart.every(shop=>{
                    return shop.check===true
                })
                this.allCheck.prop('checked',isAllChack)
                this.calcNumber()
                this.calcMoney()
                
            }
            //计算金额
            calcMoney(){
                //重新计算前清零
                this.money=0;
                //根据this.cart计算
                this.money = this.cart.reduce((money,shop)=>{
                    if(shop.check){
                        money+= shop.num * shop.price
                    }
                    return parseInt(money)
                },0)
                
                //显示在合计上
                this.totaPrice.html(this.money)
            }

            //选框
            checksChange(){
                let _this =this
                this.ulshop.on('change','.check',function(){
                    //tr找到id
                    const id =$(this).parents('div').attr('data-id')
                    // console.log(id);
                    //根据id值改变数据
                    _this.cart=_this.cart.map(shop=>{
                        //写法 选重状态 选中就为true 否则flase
                        if(shop.id === id) 
                            shop.check=$(this).prop('checked')
                          
                        return shop
                    })
                    // //修改后的重新存数据
                    localStorage.setItem('cart',JSON.stringify(_this.cart))
                    _this.calcMoney()
                    //判断是否全选 每一条数据都为选中状态
                    let isAllChack = _this.cart.every(shop=>{
                        return shop.check===true
                    })
                    _this.allCheck.prop('checked',isAllChack)
                    _this.init()
                })
            }
            //全选
            allCheckChange(){
                let _this=this
                this.allCheck.on('change',function(){
                    //得到状态
                    let isCheck = $(this).prop('checked')
                    _this.cart=_this.cart.map(shop=>{
                        shop.check= isCheck
                        return shop
                    })
                    $('.check').prop('checked',isCheck)
                    _this.calcMoney()
                })
            }
            //商品数量
            calcNumber(){
                this.checkedNumber = 0;
                this.cart.map(shop=> {
                    if(shop.check === true){
                        console.log(this.checkedNumber)
                        this.checkedNumber += parseInt(shop.num)
                    }
                })
                console.log(this.checkedNumber)
                $("#cz-sp-checkedNumber").html(this.checkedNumber)
            }
            //删除商品
            deLite (){
                let _this = this
                this.ulshop.on("click","#delite",function () {
                    let id = $(this).parents(".shop-id").attr("data-id")
                    _this.cart = _this.cart.filter(shop => {
                        if(shop.id == id){
                        if(confirm('确定删除嘛')){
                                
                            }
                            else {
                                return shop
                            }

                        }
                        else {
                            return shop
                        }
                    })
                    localStorage.setItem("cart", JSON.stringify(_this.cart))
                    _this.init()
                    header.calcNum()
                })
                    
            }

            //加减商品数量操作
            reduce(){
                let _this = this
                this.ulshop.on("click",".xiangq_a",function () {
                    let id = $(this).parents(".shop-id").attr("data-id")
                    _this.cart = _this.cart.filter(shop => {
                        if(shop.id == id){
                            if(shop.num > 1){
                                shop.num--
                                return shop
                            }
                            else {
                                if(confirm('确定删除嘛')){
                                    
                                }else
                                return shop
                            }
                        }else {
                            return shop
                        }
                    })
                    localStorage.setItem("cart", JSON.stringify(_this.cart))
                    _this.init()
                    header.calcNum()
                })
            }
            add(){
                let _this = this
                this.ulshop.on("click",".xiangq_b",function () {
                    let id = $(this).parents(".shop-id").attr("data-id")    
                    _this.cart = _this.cart.filter(shop => {
                        if(shop.id == id){
                            shop.num++
                            return shop
                        }else {
                            return shop
                        }
                    })
                    localStorage.setItem("cart", JSON.stringify(_this.cart))
                    _this.init()
                    header.calcNum()
                })
            }

        }
        new Cart()
    })
})
require(["config"], () => {
    require(['template','url','header','footer'], (template,url) => {

        class List{
            constructor(){
                this.container = $('.imgs')
                this.getDate().then((list)=>{
                    this.renderList(list)
                });
            }
            getDate(){
                //请求后端接口拿到数据
                return new Promise(resolve =>{
                    $.get(url.rapBaseUrl + '/shop/list',(resp)=>{
                        if(resp.code==200){
                            resolve(resp.body.list)
                        }
                        
                    })
                })
            }
            renderList(list){
                let str=template('list-template',{ list:list })
                this.container.html(str);
            }
        }
        new List()
    })
})
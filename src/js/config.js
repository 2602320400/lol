require.config({
    baseUrl : "http://localhost:1997/",
    paths : {
        header : "js/module/header",
        footer : "js/module/footer",
        aside : "js/module/aside",
        tools : "libs/tools",
        jquery : "libs/jquery/jquery-3.4.1.min",
        template : "libs/template/template-web",
        url:'js/module/url',
        zoom:'libs/jquery-plugins/jquery.elevateZoom-3.0.8.min',
        fly: 'libs/jquery-plugins/jquery.fly.min'
    },
    //垫片 一些不满足AMD规范但又依赖这个模块
    shim: {
        zoom: {
            deps:['jquery']
        },
        fly:{
            deps:['jquery']
        }
    }
});
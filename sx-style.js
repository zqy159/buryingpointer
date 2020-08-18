let styleNode = `
    #sx-box{
      position:relative;
    }
    #sx-box .sx-toolbar{
        width:100%;
        position:fixed;
        top:0;
        left:0;
        height:50px;
        line-height:50px;
        display:block
    }
     /*埋点展示*/
    #sx-burying{
      background:#00a0ea;
      display:none;
    }
    #sx-box .sx-interface-icon{
        width: 20px;
        height: 20px;
        display: inline-block;
        position: relative;
        left:10px;
        top: 5px;
    }
    #sx-box .icon-tip{
        color:#fff;
        padding-left:10px;
        font-size:14px;
    }
    .sx-toolbar-quit{
        position:absolute;
        top:13px;
        right:30px;
        width:44px;
        background:#00a0ea;
        text-align:center;
        line-height:24px;
        border-radius:2px;
        height:24px;
        border:1px solid #fff;
        padding:2px;
        cursor:pointer;
        font-size:16px;
        color:#fff
    }
    .sx-toolbar-quit:hover{
        background:#66c6f2
    }
    // #sx-select-palegreen{
    //   position:absolute;
    //   background:palegreen
    // }
    /*导航展示*/
    #sx-nav{
      background:#354052;
      height:100%;
    }
    .sx-button-primary{
      color:#fff;
      width:80px;
      height:26px;
      display:inline-block;
      position:absolute;
      top:10px;
      right:30px;
      background:#00A0EA;
      border:1px solid #fff;
      border-radius:2px;
      text-align:center;
      line-height:24px;
      padding:2px;
      cursor:pointer;
    }
    /*弹窗*/
    #sx-dialog{
      position:absolute;
      left:calc(50% - 250px);
      width:500px;
      height:300px;
      display:none;
      border:1px solid #ddd
    }
    .sx-header{
      height:40px;
      width:100%;
      padding:0 20px;
      box-sizing:border-box;
      background:#e6f3f9;
      line-height:40px;
    }
    .sx-title{

      font-size:18px;
      float:left;
    }
    #sx-close{
      float:right;
      cursor:pointer;
    }
    .sx-content{
      padding: 5px 20px 10px;
      height:220px;
    }
    .sx-content input{
      height:38px;
      font-size:16px;
      padding:0 10px;
    }
    .sx-content .sx-save{
      vertical-align:bottom;
      background:#00a0ea;
      display:inline-block;
      width:50px;
      height:44px;
      line-height:44px;
      text-align:center;
      border-radius:3px;
      cursor:pointer;
      color:#fff;
    }
 `
// 引入style
var sxStyle = document.createElement("style");
sxStyle.type = "text/css";
sxStyle.appendChild(document.createTextNode(styleNode));
document.head.appendChild(sxStyle);

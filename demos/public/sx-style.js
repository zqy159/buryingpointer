let styleNode = `
    #sx-box{
      position:absolute;
      left: 0;
      top: 0;
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
      z-index: 202022;
      display:none;
      min-width: 500px;
      min-height: 300px;
      position: fixed;
      -webkit-overflow-scrolling: touch;
      top: 50%;
      left: 50%;
      margin: 0;
      padding: 0;
      background-color: #fff;
      -webkit-background-clip: content;
      border-radius: 2px;
      box-shadow: 1px 1px 50px rgba(0, 0, 0, .3);
    }
    .sx-header{
      position: relative;
    }
    .sx-title{
      padding: 0 80px 0 20px;
      height: 42px;
      line-height: 42px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      color: #333;
      overflow: hidden;
      background-color: #F8F8F8;
      border-radius: 2px 2px 0 0;
    }
    #sx-close{
      position: absolute;
      right: 10px;
      top: 12px;
      width: 20px;
      cursor: pointer;
      font-size: 20px;
      text-align: center;
      line-height: 18px;
    }
    .sx-content{
      padding: 20px 20px 60px;
      line-height: 24px;
      word-break: break-all;
      overflow: hidden;
      font-size: 14px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .sx-footer{
      text-align: right;
      padding: 0 20px 12px;
      width: 100%;
      heigth:50px;
      bottom: 10px;
      box-sizing: border-box;
      pointer-events: auto;
      user-select: none;
      position: absolute;
      -webkit-user-select: none;
    }
    .sx-input{
      height: 38px;
      line-height: 1.3;
      line-height: 38px\9;
      border-width: 1px;
      border-style: solid;
      background-color: #fff;
      border-radius: 2px;
      border-color: #e6e6e6;
      outline: 0;
      -webkit-appearance: none;
      transition: all .3s;
      -webkit-transition: all .3s;
      box-sizing: border-box;
      display: block;
      width: 100%;
      padding-left: 10px;
    }
    .sx-block{
      position: relative;
      margin-left: 90px;
      min-height: 36px;
    }
    .sx-form-item{
      margin-bottom: 15px;
      clear: both;
    }
    .sx-input-info{
      font-size:12px;
      color:#FFB800
    }
    .sx-label {
      position: relative;
      float: left;
      display: block;
      padding: 9px 15px;
      width: 60px;
      font-weight: 400;
      line-height: 20px;
      text-align: right;
    }
    .sx-btn{
      display: inline-block;
      height: 38px;
      line-height: 38px;
      padding: 0 18px;
      background-color: #1E9FFF;
      color: #fff;
      white-space: nowrap;
      text-align: center;
      font-size: 14px;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      outline: 0;
      -webkit-appearance: none;
      transition: all .3s;
      -webkit-transition: all .3s;
      box-sizing: border-box;
      vertical-align: middle;
    }
    .sx-dialog-mask{
      display:none;
      position: fixed;
      z-index: 202021;
      background-color: rgb(0, 0, 0);
      opacity: 0.3;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .sx-form-emitType{
      height:38px;
      line-height:38px;
    }
    .sx-form-quit{
      border: 1px solid #C9C9C9;
      background-color: #fff;
      color: #555;
    }
     .sx-form-quit:hover{
      border-color: #009688;
      color: #333;
    }
    .sx-message{
      position:fixed;
      left: calc(50% - 190px);
      top: 20px;
      box-sizing: border-box;
      border-width: 1px;
      border-style: solid;
      min-width: 380px;
      background-color: #f0f9eb;
      border-color: #e1f3d8;
      color:#67C23A;  
      padding: 15px 15px 15px 20px;
    }
    [data-hoverable] {
      outline: 2px solid #7ed321 !important;
      outline-offset: -2px !important;
      cursor:pointer;
    }
    [data-selectable] {
      // background: rgba(0, 160, 234, 0.1) !important;
      outline: 2px solid #7ed321 !important;
      outline-offset: -2px !important;
      border: 2px solid #00a0ea !important;
      box-shadow: 0 0 6px 0 #00A0EA !important;
    }
    
 `
// 引入style
var sxStyle = document.createElement("style");
sxStyle.type = "text/css";
sxStyle.appendChild(document.createTextNode(styleNode));
document.head.appendChild(sxStyle);

let sxSdk = {

}

let styleNode = `
  /*滑块*/
  .sx-topslider {
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
    width: 100%;
    height: 2px;
    background: #354052;
  }
 .sx-topslider:hover {
  height:50px
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
 .sx-topslider sx-btn{
   float:right;
 }
`
let htmlNode = `
   <div class="sx-topslider">
      <button type="button" class="sx-btn">成功按钮</button>
   </div>
   
   
`
// 引入style
var sxStyle = document.createElement("style");
sxStyle.type = "text/css";
sxStyle.appendChild(document.createTextNode(styleNode));
document.head.appendChild(sxStyle);

// 引入html
var sxBox = document.createElement("div");
sxBox.id = "sx-box"
sxBox.innerHTML = htmlNode
document.body.appendChild(sxBox)

// 引入svg图片
let svg = `<svg class="sx-interface-icon" markup-inline="" width="100%" height="100%" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xml: space="preserve" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M10 .156C4.563.156.155 4.564.155 10c0 5.436 4.408 9.845 9.843 9.845 5.436 0 9.845-4.409 9.845-9.845 0-5.435-4.409-9.843-9.845-9.843zm2.05 15.256c-.508.2-.91.352-1.214.457a3.2 3.2 0 0 1-1.052.157c-.613 0-1.09-.15-1.43-.449a1.45 1.45 0 0 1-.51-1.139c0-.18.013-.363.038-.549a7.19 7.19 0 0 1 .122-.633l.635-2.24c.055-.215.104-.419.142-.609.038-.192.057-.368.057-.528 0-.285-.059-.485-.177-.597-.119-.113-.343-.168-.678-.168-.163 0-.33.025-.504.075-.17.053-.319.1-.44.147l.167-.69c.415-.169.813-.314 1.192-.434a3.508 3.508 0 0 1 1.075-.182c.61 0 1.08.15 1.41.442.33.294.495.677.495 1.147 0 .097-.012.27-.034.514-.023.246-.065.47-.127.676l-.63 2.233a6.313 6.313 0 0 0-.14.613 3.224 3.224 0 0 0-.06.522c0 .297.065.5.198.607.132.107.363.161.69.161.154 0 .326-.027.521-.08.193-.054.333-.1.422-.142l-.169.69zm-.113-9.065c-.294.273-.648.41-1.063.41a1.52 1.52 0 0 1-1.066-.41 1.308 1.308 0 0 1-.444-.994c0-.388.15-.72.444-.997a1.507 1.507 0 0 1 1.066-.414c.415 0 .77.137 1.063.414.294.276.442.61.442.997 0 .39-.148.721-.442.994z" fill="#fff" fill-rule="nonzero"></path></svg>`
let htmlNode = `
    <sx-div class="sx-toolbar">
        <div id="sx-nav">
          <span class="sx-button-primary" id="cancel-nav">创建事件</span>
        </div>
         <div id="sx-burying">
            ${svg} <span class="icon-tip">选择一个元素来创建事件</span>
           <span class="sx-toolbar-quit" id="cancael-burying">取消</span>
         </div>
    </sx-div>
    <div id="sx-dialog">
      <div class="sx-header">
        <div class="sx-title">
            创建事件
        </div>
        <div id="sx-close">
           x
        </div>
      </div>
      <div class="sx-content">
        <div style="margin:80px auto;text-align:center">
          <input placeholder="填写事件名称"></input><span class="sx-save">保存</span>
        </div>
      
      </div>
      <div class="sx-footer">     
      </div>
    
    
    </div>
    <!-- <div id="sx-select-palegreen"></div> --!>
   
`


// 引入html
var sxBox = document.createElement("div");
sxBox.id = "sx-box"
sxBox.innerHTML = htmlNode
document.body.appendChild(sxBox)

// html内事件
let cancelNav = document.getElementById('cancel-nav')
let cancaelBurying = document.getElementById('cancael-burying')
let sxNav = document.getElementById('sx-nav')
let sxBurying = document.getElementById('sx-burying')
let sxDialog = document.getElementById('sx-dialog')
let sxClose = document.getElementById('sx-close')


// 遍历页面上所有节点


console.log('xxx')
var sxSdk = {
  nodeArray: null,
  init() {
    this.nodeArray = this._compile(document.body)
    this.nodeArray.forEach(node => {
      node.onmouseout = e => {
        node.style.background = "#fff"
      }
      node.onmouseover = e => {
        node.style.background = "palegreen"
      }
      node.style.cursor = "pointer"
      node.onclick = e => {
        e.stopPropagation()
        console.log(e)
        // sxSdk.getEl(e)
        sxDialog.style.display = 'block'
      }
    })
  },
  distory() {
    let array = ['$s']
    this.nodeArray.forEach(node => {
      node.onmouseout = null
      node.onmouseover = null
      node.onclick = null
      node.style.cursor = "auto"
    })

    node = document.getElementById('s')
    node.style.background = "rgba(0, 160, 234, 0.1)"
    node.style.border = "2px solid #00a0ea"
    node.style.boxShadow = "0 0 6px 0 #00A0EA"
    node.onmouseover = e => {
      console.log('xxx')
    }
    // 对采集的数据高亮
  },
  close() {
    // 为了不影响原先的事件因此重载
    location.reload(true)
  },
  _compile(root, arr = []) {
    const nodes = Array.prototype.slice.call(root.children);
    let filterNode = ['SCRIPT', 'STYLE', 'SVG']
    nodes.forEach((node) => {
      if (filterNode.includes(node.tagName) || node.id === "sx-box") return
      if (node.children && node.children.length) {
        this._compile(node, arr);
      }
      arr.push(node);
    });
    return arr;
  },
  getNode(arr) {
    let el = ''
    let node = document
    arr.reverse().forEach((item, index) => {
      node = node.querySelectorAll(item.ele)[item.index]
    })
    return node
  },
  getEl(e) {
    let arr = []
    for (var i = 0; i < e.path.length; i++) {
      if (e.path[i].tagName === 'BODY') {
        arr.push({ ele: e.path[i].localName, index: 0 })
        return this.getNode(arr)
      } else if (e.path[i].id) {
        arr.push({ ele: '#' + e.path[i].id, index: 0 })
        return this.getNode(arr)
      } else {
        if (e.path[i].className) {
          let index = 0
          index = Array.prototype.slice.call(e.path[i].parentElement.children).findIndex(node => {
            return node === e.path[i]
          })
          arr.push({ ele: '.' + e.path[i].className, index: index })
        } else if (e.path[i].localName && e.path[i].localName !== 'font') {
          let index = 0
          index = Array.prototype.slice.call(e.path[i].parentElement.children).findIndex(node => {
            return node === e.path[i]
          })
          arr.push({ ele: e.path[i].localName, index: index })
        }

      }
    }
    return this.filterEl(arr)
  },

}

cancelNav.onclick = e => {
  sxBurying.style.display = "block"
  sxNav.style.display = "none"
  sxSdk.init()
}
sxClose.onclick = e => {
  sxDialog.style.display = 'none'
}
cancaelBurying.onclick = e => {
  sxBurying.style.display = "none"
  sxNav.style.display = "block"
  sxSdk.distory()
}
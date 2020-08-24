let svg = `<svg sx-el class="sx-interface-icon" markup-inline="" width="100%" height="100%" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xml: space="preserve" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path sx-el d="M10 .156C4.563.156.155 4.564.155 10c0 5.436 4.408 9.845 9.843 9.845 5.436 0 9.845-4.409 9.845-9.845 0-5.435-4.409-9.843-9.845-9.843zm2.05 15.256c-.508.2-.91.352-1.214.457a3.2 3.2 0 0 1-1.052.157c-.613 0-1.09-.15-1.43-.449a1.45 1.45 0 0 1-.51-1.139c0-.18.013-.363.038-.549a7.19 7.19 0 0 1 .122-.633l.635-2.24c.055-.215.104-.419.142-.609.038-.192.057-.368.057-.528 0-.285-.059-.485-.177-.597-.119-.113-.343-.168-.678-.168-.163 0-.33.025-.504.075-.17.053-.319.1-.44.147l.167-.69c.415-.169.813-.314 1.192-.434a3.508 3.508 0 0 1 1.075-.182c.61 0 1.08.15 1.41.442.33.294.495.677.495 1.147 0 .097-.012.27-.034.514-.023.246-.065.47-.127.676l-.63 2.233a6.313 6.313 0 0 0-.14.613 3.224 3.224 0 0 0-.06.522c0 .297.065.5.198.607.132.107.363.161.69.161.154 0 .326-.027.521-.08.193-.054.333-.1.422-.142l-.169.69zm-.113-9.065c-.294.273-.648.41-1.063.41a1.52 1.52 0 0 1-1.066-.41 1.308 1.308 0 0 1-.444-.994c0-.388.15-.72.444-.997a1.507 1.507 0 0 1 1.066-.414c.415 0 .77.137 1.063.414.294.276.442.61.442.997 0 .39-.148.721-.442.994z" fill="#fff" fill-rule="nonzero"></path></svg>`
let htmlNode = `
    <div class="sx-toolbar" sx-el>
        <div id="sx-nav" sx-el v-show="!showBurying">
          <span sx-el class="sx-button-primary" id="cancel-nav" @click="handleBury">创建事件</span>
        </div>
         <div sx-el id="sx-burying" v-show="showBurying">
            ${svg} <span sx-el class="icon-tip">选择一个元素来创建事件</span>
           <span  sx-el class="sx-toolbar-quit" id="cancael-burying" @click="destory">取消</span>
         </div>
    </div>
    <div sx-el id="sx-dialog" v-show="showDialog"  ref="sxdialog">
      <div sx-el class="sx-header">
        <div sx-el class="sx-title">
            创建事件
        </div>
        <div sx-el id="sx-close" @click="closeDialog">
           x
        </div>
      </div>
      <div sx-el class="sx-content"> 
        <div sx-el class="sx-form-item">
          <label sx-el class="sx-label">标签类型</label>
          <div sx-el class="sx-block">
              <div sx-el class="sx-form-emitType">{{elementInfo.nodeType}}</div>
        </div>
        </div>
        <div sx-el class="sx-form-item">
          <label sx-el class="sx-label">事件名称</label>
            <div sx-el class="sx-block">
            <input sx-el placeholder="请填写事件名称" class="sx-input" v-model="elementInfo.elementName"></input>
          </div>
        </div>
      
      </div>
      <div sx-el class="sx-footer">     
       <button sx-el type="button" class="sx-btn sx-form-quit" @click="closeDialog">取消</button>
       <button sx-el type="button" class="sx-btn sx-save" @click="saveBury">保存</button>
      </div>

    </div>
    <div sx-el v-show="showDialog" class="sx-dialog-mask"></div>
    <div sx-el  class="sx-boxShadow" style="background:palegreen;opacity:0.5;position:absolute;pointer-events: none;"></div>
`


// 引入html
var sxBox = document.createElement("div");
sxBox.id = "sx-box"
sxBox.setAttribute("sx-el", '');
sxBox.innerHTML = htmlNode
document.body.appendChild(sxBox)

// html内事件
function getEl(el) {
  return document.querySelector(el)
}

let boxShadow = getEl('.sx-boxShadow')





// 引入vjm
new Vjm({
  el: '#sx-box',
  data: {
    timer: null,
    overTimer: null,
    elementInfo: {
      selectElement: '',
      nodeType: '',
      elementName: "事件名称"
    },
    selectNode: [],
    selectType: "outbox", //outline 轮廓,outbox  盒子
    buryingData: [1],
    showDialog: false,
    showBurying: false,
    timerMessage: null,
  },
  mounted() {
    // this.buryingData = [1, 2]

    // this.$proxyData.buryingData = [1, 2]
    console.log(this)
    this.$ajax('get', 'api/getBuryingData').then(res => {
      if (res.code === 0) {
        this.setData({
          buryingData: res.data
        })
        this.selectedNode(this.buryingData)
        res.data.forEach((eleItem) => {
          let node = getEl(eleItem.selectElement)
          node.onclick = e => {
            this.$ajax('post', 'api/emitBurying', {
              id: eleItem.id
            }).then(res => {
              console.log(res)
            })
          }
          node.oninput = e => {
            console.log(e)
            // this.$ajax('post', 'api/emitBurying', {
            //   id: eleItem.id
            // }).then(res => {
            //   console.log(res)
            // })
          }


        })
      }
    })
  },
  methods: {
    selectedNode(data, type = "add") {
      this.buryingData.forEach(eleItem => {
        let node = getEl(eleItem.selectElement)
        if (node && location.href === eleItem.localtionPath) {

          if (type === 'add') {
            if (node.localName === 'input') {
              node.parentNode.setAttribute('data-selectable', true);
            } else {
              node.setAttribute('data-selectable', true);
            }

          } else {
            if (node.localName === 'input') {
              node.parentNode.removeAttribute('data-selectable');
            } else {
              node.parentNode.removeAttribute('data-selectable');
            }

          }

        }
      })


    },
    handleBury() {
      this.setData({
        showBurying: true
      })
      this.selectedNode(this.buryingData, 'remove')
      let delay = 100;
      document.body.onmouseover = (e) => {
        // clearTimeout(this.overTimer);
        // this.overTimer = setTimeout(() => {
        if (e.target.getAttribute('sx-el') !== '') {

          if (this.selectType === 'outline') {
            // 轮廓框选
            e.target.setAttribute("data-hoverable", true);
          } else {
            // 盒子框选
            this.showShadow(e.target)
          }
          if (!this.selectNode.includes(e.target)) this.selectNode.push(e.target)
          e.target.onclick = (ex) => {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
              this.setData({
                elementInfo: {
                  selectElement: this.getDomSelector(ex.target),
                  nodeType: ex.target.tagName.toLowerCase(),
                  elementName: this.elementInfo.elementName,
                },
                showDialog: true
              })
              this.$refs.sxdialog.style.transform = `translate(-${this.$refs.sxdialog.offsetWidth / 2}px,-${this.$refs.sxdialog.offsetHeight / 2}px)`
              e.target.onclick = null
            });
          };

        }
        // }, delay)
      };
      document.body.onmouseout = (e) => {
        if (e.target.getAttribute('sx-el') !== '') {
          e.target.removeAttribute("data-hoverable");
        }
      };
    },

    closeDialog() {
      this.setData({
        showDialog: false
      })
    },
    saveBury() {
      this.$ajax('post', 'api/setBuryingData', { ...this.elementInfo, localtionPath: location.href }).then(res => {
        if (res.code === 0) {
          this.setData({
            showDialog: false
          })
          alert(res.msg)
        } else {
          alert(res.msg)
          // this.$message
        }
      })


    },
    destory() {
      this.setData({
        showBurying: false
      })
      this.selectedNode(this.buryingData)
      document.body.onmouseover = null
      document.body.onmouseout = null
      this.selectNode.forEach(node => {
        node.onclick = null
      })
      if (this.selectType !== 'outline') {
        //去除盒子框选
        boxShadow.style.display = 'none'
      }
      this.selectNode = []
    },
    getDomSelector(el, arr) {

      if (!el || !el.parentNode || !el.parentNode.children) {
        return false;
      }
      arr = arr && arr.join ? arr : [];
      var name = el.nodeName.toLowerCase();
      if (!el || name === "body" || 1 != el.nodeType) {
        arr.unshift("body");
        return arr.join(" > ");
      }
      arr.unshift(this.selector(el));
      if (
        el.getAttribute &&
        el.getAttribute("id")
      )
        return arr.join(" > ");
      return this.getDomSelector(el.parentNode, arr);
    },
    getDomIndex(el) {

      if (!el.parentNode) return -1;
      var i = 0;
      var nodeName = el.tagName;
      var list = el.parentNode.children;
      for (var n = 0; n < list.length; n++) {
        if (list[n].tagName === nodeName) {
          if (el === list[n]) {
            return i;
          } else {
            i++;
          }
        }
      }
      return -1;
    },
    selector(el) {
      var i =
        el.parentNode && 9 == el.parentNode.nodeType
          ? -1
          : this.getDomIndex(el);
      if (
        el.getAttribute &&
        el.getAttribute("id")
      ) {
        return "#" + el.getAttribute("id");
      } else {
        return (
          el.tagName.toLowerCase() + (~i ? ":nth-of-type(" + (i + 1) + ")" : "")
        );
      }
    },
    showShadow(target) {
      boxShadow.style.display = 'block'
      boxShadow.style.height = target.offsetHeight + "px";
      boxShadow.style.width = target.offsetWidth + "px";
      boxShadow.style.top = this.getOffset(target).top + "px";
      boxShadow.style.left = this.getOffset(target).left + "px";
    },
    getOffset(o) {
      var top = 0;
      var left = 0;
      var offsetParent = o;
      while (offsetParent != null && offsetParent != document.body) {
        top += offsetParent.offsetTop;
        left += offsetParent.offsetLeft;
        offsetParent = offsetParent.offsetParent;
      }
      return { left, top };
    },
    $ajax(requestType, url, data) {
      return new Promise((resolve, reject) => {
        let localPath = 'http://localhost:3000/';
        url = localPath + url;
        let ajax = new XMLHttpRequest();
        let paramsStr = '';
        if (data) {
          Object.keys(data).forEach((key, index) => {
            if (index > 0) {
              paramsStr += '&';
            }
            paramsStr += paramsStr = key + '=' + data[key];
          });
        }

        if (requestType === 'get') {
          if (paramsStr) {
            url += '?';
            url += paramsStr;
          }
          ajax.open(requestType, url);
          ajax.send();
        } else if (requestType === 'post') {
          ajax.open(requestType, url);
          ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          if (paramsStr) {
            ajax.send(paramsStr);
          } else {
            ajax.send();
          }
        }

        ajax.onreadystatechange = function () {
          if (ajax.readyState == 4 && ajax.status == 200) {
            resolve(JSON.parse(ajax.responseText));
          }
        };
      });

    }
  }
})

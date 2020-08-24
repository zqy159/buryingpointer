// 设置弹出层尺寸
function getEl(el) {
  return document.querySelector(el)
}

let mixiJs = {
  init() {
    // 对所有的mixi - select添加元素
    this.createSelect()
    this.createSwitch()
  },
  getEl(el) {
    return getEl(el)
  },
  createSwitch() {
    Array.prototype.slice.call(document.querySelectorAll('.mixi-switch')).forEach(nodeSwitch => {
      let switchWrapper = document.createElement("div");
      switchWrapper.className = 'mixi-form-switch'
      let switchNode = `<em>开关</em><i></i>`
      switchWrapper.innerHTML = switchNode
      if (switchWrapper.value !== '0') {
        switchWrapper.classList.add('mixi-form-onswitch')
      }
      switchWrapper.onclick = e => {
        if (/mixi-form-onswitch/.test(switchWrapper.className)) {
          switchWrapper.classList.remove('mixi-form-onswitch')
          nodeSwitch.value = 0
        } else {
          switchWrapper.classList.add('mixi-form-onswitch')
          nodeSwitch.value = 1
        }
      }
      nodeSwitch.parentNode.appendChild(switchWrapper)
    })



  },

  createSelect() {
    let selctList = null
    Array.prototype.slice.call(document.querySelectorAll('.mixi-select')).forEach(nodeSelect => {
      let selectWrapper = document.createElement("div");
      let oFragmeng = document.createDocumentFragment();
      let listArray = Array.prototype.slice.call(nodeSelect.children).map(item => {
        let ddNode = document.createElement("dd");
        // ddNode.setAttribute('mixi-value', item.value)
        ddNode.innerHTML = item.label ? item.label : '请选择'

        ddNode.onclick = e => {
          if (!/mixi/.test(ddNode.className)) {
            let array = Array.prototype.slice.call(selectWrapper.querySelector('.mixi-select-list').children)
            array.forEach(item => {
              if (/mixi-this/.test(item.className)) {
                item.classList.remove('mixi-this')
              }
            })
          }
          ddNode.classList.add('mixi-this')
          selectWrapper.querySelector('.mixi-select-title input').value = item.label
          selectWrapper.previousElementSibling.value = item.value
        }
        oFragmeng.appendChild(ddNode)
        return {
          label: item.label,
          value: item.value
        }

      })

      selectWrapper.className = "mixi-form-select"
      selectNode = `<div class="mixi-select-title">
            <input type="text" placeholder="请选择...">
            <i class="mixi-icon-xiajiantou mixi-edge"></i>
          </div>
          <dl class="mixi-select-list" >
              
          </dl>`
      selectWrapper.innerHTML = selectNode
      selectWrapper.querySelector('.mixi-select-title input').onfocus = e => {
        selectWrapper.classList.add('mixi-form-selected')
      }
      selectWrapper.querySelector('.mixi-select-title input').onblur = e => {
        setTimeout(() => {
          selectWrapper.classList.remove('mixi-form-selected')
        }, 200)
      }
      selectWrapper.querySelector('.mixi-select-list').appendChild(oFragmeng)
      nodeSelect.parentNode.appendChild(selectWrapper)
    })
  },
  dialog: {
    createDialog({
      title,
      content,
      cancel,
      confirm,
      confirmCallback
    }) {
      let dialogWrapper = document.createElement("div");
      dialogWrapper.className = "mixi-dialog"
      let cancelBtn = `<button type="button" class="mixi-btn mixi-cancel mixi-btn-primary">${cancel}</button>`

      let dialogNode = `<div class="mixi-dialog-header">
        <div class="mixi-dialog-title">
          ${title}
        </div>
        <div class="mixi-dialog-close">
            x
        </div>
      </div>
      <div class="mixi-dialog-content">
        ${content}
      </div>
      <div class="mixi-dialog-footer">
        ${cancel?cancelBtn:''}
        <button type="button" class="mixi-btn mixi-confirm">${confirm?confirm:"确定"}</button>
      </div>`
      let dialogMask = document.createElement("div");
      dialogMask.className = "mixi-dialog-mask"
      dialogWrapper.innerHTML = dialogNode
      document.body.appendChild(dialogWrapper)
      document.body.appendChild(dialogMask)

      getEl('.mixi-cancel').onclick = e => {
        dialogWrapper.remove()
        dialogMask.remove()
      }
      getEl(".mixi-dialog-close").onclick = e => {
        dialogWrapper.remove()
        dialogMask.remove()
      }
      getEl(".mixi-confirm").onclick = e => {
        confirmCallback()
        dialogWrapper.remove()
        dialogMask.remove()
      }
      dialogWrapper.style.transform = `translate(-${dialogWrapper.offsetWidth/2}px,-${dialogWrapper.offsetHeight/2}px)`
    },
    open(data) {
      this.createDialog(data)
    }

  },
  message: {
    messageInfo: {
      success: {
        icon: 'mixi-icon-chenggong',
        wrapperClass: "mixi-message--success"
      },
      error: {
        icon: 'mixi-icon-shibai',
        wrapperClass: "mixi-message--error"
      },
      warning: {
        icon: 'mixi-icon-jinggao',
        wrapperClass: "mixi-message--warning"
      }
    },
    messageWrapper: null,
    timer: null,
    createDialog(type = "success", message, duration = 0) {
      if (!getEl('.mixi-message')) this.messageWrapper = document.createElement("div");
      this.messageWrapper.className = `mixi-message ${this.messageInfo[type].wrapperClass}`
      let messgaeNode = `<i class="${this.messageInfo[type].icon} mixi-message-icon"></i>
              <span class="mixi-message-content">${message}</span>
              <i class="mixi-icon-guanbi mixi-message-close"></i>`
      this.messageWrapper.innerHTML = messgaeNode
      if (!getEl('.mixi-message')) document.body.appendChild(this.messageWrapper)



      getEl(".mixi-message-close").onclick = e => {
        this.messageWrapper.remove()
      }
      if (duration) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.messageWrapper.remove()
        }, duration)
      }
    },
    open({
      type,
      message,
      duration
    }) {
      this.createDialog(type, message, duration)
    }
  },
  form: {
    validate({
      el,
      success,
      error
    }) {
      let resultData = {}
      let errorArray = []
      for (var i = 0; i < Array.prototype.slice.call(el).length; i++) {
        let node = Array.prototype.slice.call(el)[i]
        if (/mixi-input|mixi-select|mixi-switch/.test(node.className)) {
          let nodeResult
          if (/mixi-select/.test(node.className)) {
            nodeResult = node.nextElementSibling.querySelector('input')
          } else {
            nodeResult = node
          }
          if (!node.value && node.getAttribute("mixi-require")) {
            nodeResult.classList.add('mixi-require')
            // 终止
            errorArray.push(node.name)
          } else {
            nodeResult.classList.remove('mixi-require')
          }
          resultData[node.name] = node.value
        }

      }

      if (errorArray.length) {
        error(errorArray)
      } else {
        success(resultData)
      }
    }
  }
}
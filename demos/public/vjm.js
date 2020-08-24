
class Vjm {
  constructor(options) {
    this.$refs = [1, 2, 3, 4]
    this.$el = document.querySelector(options.el);
    this._binding = {};
    this.$methods = options.methods;
    // 改变proxyData,获取data
    this.$proxyData = this._observer(options.data);
    this.$data = options.data
    this.$refs = {}

    Object.assign(this, this.$data, this.$methods);

    this.$created = options.created;
    this.$created ? this.$created() : null

    this.$mounted = options.mounted;
    this.$mounted ? this.$mounted() : null

    this._compile(this.$el);





  }
  /*
    observer的作用是能够对所有的数据进行监听操作，可以通过使用Proxy,以及defineProperty对象进行监听
   */
  _observer(data) {
    const me = this;
    let handler = {
      get(target, key) {
        //懒监听，去获取的时候才监听对象里面的对象，而不是直接递归循环监听

        if (typeof target[key] === 'object' && target[key] !== null) {
          if (this.key) {
            this.key += '.' + key
          } else {
            this.key = key
          }
          return new Proxy(target[key], handler);
        }
        return Reflect.get(target, key);
      },
      set(target, key, value, m) {
        // console.log('set', target, key, value, me._binding);
        //数组新增会执行两次，一次是修改length，一次是添加值

        let oldValue = target[key];
        let reflect = Reflect.set(target, key, value);
        if (target instanceof Array) {
          if (key !== 'length' && me._binding[this.key]) {
            // 执行
            let resultTarget = me._resultTarget(this.key)
            if (resultTarget.length) {
              resultTarget.forEach(ites => {
                me._binding[ites].forEach(_watcher => {
                  _watcher.update()
                })
              })
            }

          }
        } else {
          // 执行
          let resultKey = this.key ? (this.key + '.' + key) : key
          if (oldValue !== value) {
            //老值和新值不相等，修改
            let resultTarget = me._resultTarget(resultKey)
            if (resultTarget.length) {
              resultTarget.forEach(ites => {
                me._binding[ites].forEach(_watcher => {
                  _watcher.update()
                })
              })

            }
          }
        }
        if (!oldValue) {
          //找不到老值，新增
        }
        this.key = ''

        return reflect;
      }
    }
    return new Proxy(data, handler)
  }
  _resultTarget(resultKey) {
    let target
    if (this._binding[resultKey]) {
      target = [resultKey]
    } else {
      target = Object.keys(this._binding).filter(ites => {
        if (ites.startsWith(resultKey)) {
          return true
        }

      })
    }
    return target
  }
  _pushWatcher(watcher) {
    if (!this._binding[watcher.key]) {
      this._binding[watcher.key] = [];
    }
    this._binding[watcher.key].push(watcher);
  }
  // 指令解析器，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相对应的更新函数
  _filterSign(result, key) {
    if (/!/.test(key)) {
      return !result
    } else {
      return result
    }
  }
  _resultKey(data, key, index = 0) {
    let keys = key
    if (/!/.test(key)) {
      key = key.replace(/!/, '')
    }
    let resultKey = data[key.split('.')[index]]
    // 对key进行处理

    if (keys.split('.').length - 1 === index) {
      return this._filterSign(resultKey, keys)
    } else {
      index++
      return this._resultKey(resultKey, keys, index)
    }
  }
  _resultSet(data, key, index = 0) {
    if (key.split('.').length - 1 === index) {
      return data
    } else {
      let resultKey = data[key.split('.')[index]]
      index++
      return this._resultSet(resultKey, key, index)
    }
  }
  // 对新增元素进行拓展
  _extend(el) {
    let $el = document.querySelector(el)
    this._compile($el)

  }
  setData(data, keyStr = "") {
    let dataList = Object.keys(data)
    dataList.forEach(key => {
      let keys = keyStr
      if (keys) {
        keys += '.' + key
      } else {
        keys = key
      }
      if (Object.prototype.toString.call(data[key]) === "[object Object]") {
        // 半替换
        this.setData(data[key], keys)
      } else {
        // 全体替换
        console.log(data[keys.split('.').pop()])
        if (Object.prototype.toString.call(data[key]) === "[object Array]") {
          this._resultSet(this, keys)[keys.split('.').pop()] = data[keys.split('.').pop()]
        } else {
          this._resultSet(this.$proxyData, keys)[keys.split('.').pop()] = data[keys.split('.').pop()]
        }
      }
    })
  }
  _compile(root) {
    const nodes = Array.prototype.slice.call(root.children);
    nodes.map(node => {
      if (node.children && node.children.length) {
        this._compile(node);
      }
      let reg = /\{\{(.*)\}\}/

      if (reg.test(node.textContent)) {
        let key = reg.exec(node.textContent)[1]
        node['innerHTML'] = this._resultKey(this.$data, key)
        this._pushWatcher(new Watcher(node, 'innerHTML', this.$data, key));
      }
      const $input = node.tagName.toLocaleUpperCase() === "INPUT";
      const $textarea = node.tagName.toLocaleUpperCase() === "TEXTAREA";
      const $vmodel = node.hasAttribute('v-model');
      // 如果是input框 或 textarea 的话，并且带有 v-model 属性的
      if (($vmodel && $input) || ($vmodel && $textarea)) {
        const key = node.getAttribute('v-model');
        node['value'] = this._resultKey(this.$data, key)
        this._pushWatcher(new Watcher(node, 'value', this.$data, key));
        node.addEventListener('input', () => {
          this._resultSet(this.$proxyData, key)[key.split('.').pop()] = node.value
        });
      }
      if (node.hasAttribute('v-bind')) {
        const key = node.getAttribute('v-bind');
        node['v-bind'] = this._resultKey(this.$data, key)
        this._pushWatcher(new Watcher(node, 'innerHTML', this.$data, key));
      }
      if (node.hasAttribute('v-html')) {
        const key = node.getAttribute('v-html');
        node['innerHTML'] = this._resultKey(this.$data, key)
        this._pushWatcher(new Watcher(node, 'innerHTML', this.$data, key));
      }
      if (node.hasAttribute('@click')) {
        const methodName = node.getAttribute('@click');
        const method = this.$methods[methodName].bind(this);
        node.addEventListener('click', method);
      }
      if (node.hasAttribute('v-show')) {
        const key = node.getAttribute('v-show');
        let keys = key
        if (/!/.test(keys)) {
          keys = keys.replace(/!/, '')
        }
        if (this._resultKey(this.$data, key)) {
          node.style.display = "block"
        } else {
          node.style.display = "none"
        }
        this._pushWatcher(new Watcher(node, 'show', this.$data, keys, () => {
          if (this._resultKey(this.$data, key)) {
            node.style.display = "block"
          } else {
            node.style.display = "none"
          }
        }));
      }

      if (node.hasAttribute('ref')) {
        const key = node.getAttribute('ref');
        this.$refs[key] = node
      }

    });
  }
}
/*
    watcher的作用是 链接Observer 和 Compile的桥梁，能够订阅并收到每个属性变动的通知，
    执行指令绑定的响应的回调函数，从而更新视图。
    每一个node加一个监听
   */
class Watcher {
  constructor(node, attr, data, key, callback) {
    this.node = node;
    this.attr = attr;
    this.data = data;
    this.key = key;
    this.callback = callback
  }
  _resultKey(data, key, index = 0) {
    let resultKey = data[key.split('.')[index]]
    if (key.split('.').length - 1 === index) {
      return resultKey
    } else {
      index++
      return this._resultKey(resultKey, key, index)
    }
  }
  update() {
    if (this.callback) {
      this.callback()
    } else {
      this.node[this.attr] = this._resultKey(this.data, this.key)
    }

  }
}


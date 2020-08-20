<template>
  <div id="app">
    <div
      id="box"
      style="margin-top:100px;"
    >
      <div>
        <div></div>
        <div></div>
        <div>
          <div>
            <div>
              <div>
                <div class="s">
                  <input type="text">
                  <div>1111111</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <el-input
      v-model="input"
      ref="s"
      placeholder="请输入内容"
    ></el-input>
    <el-select
      v-model="value"
      filterable
      @click="ff()"
      placeholder="请选择"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-radio
      v-model="radio"
      label="1"
    >备选项</el-radio>
    <el-radio
      v-model="radio"
      label="2"
    >备选项</el-radio>
    <!-- position:absolute -->
    <div
      id="boxShadow"
      style="background:palegreen;opacity:0.5;position:absolute"
    >

    </div>
    <!-- <router-view></router-view> -->

  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      radio: "1",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      input: "",
      node: null,
      timer: null
    };
  },
  mounted() {
    // this.$refs.s.onclick = e => {
    //   console.log(this.getEl(e.currentTarget));
    // };
    // document.body.onmousemove = e => {
    //   console.log(this.getEl(e.target));
    //   // alert(1); //只要是点击页bai面的任何一个地方，都会弹1.
    // };
    let boxShadow = document.getElementById("boxShadow");
    document.body.onmousemove = e => {
      // this.node !== e.target &&
      // console.log(e.target);
      if (e.target != boxShadow) {
        console.log("xx");
        boxShadow.style.height = e.target.offsetHeight + "px";
        boxShadow.style.width = e.target.offsetWidth + "px";
        boxShadow.style.top = this.getOffset(e.target).top + "px";
        boxShadow.style.left = this.getOffset(e.target).left + "px";
        boxShadow.setAttribute("data-el", this.getEl(e.target));
        this.node = e.target;
      }
    };

    boxShadow.onclick = e => {
      console.log(e.target.getAttribute("data-el"));
    };
    document.body.onmousedown = e => {
      console.log("down", e.target, e);
    };
    Element.prototype.trigger = function(eventName) {
      this.dispatchEvent(new Event(eventName));
    };

    boxShadow.onmousemove = e => {
      clearInterval(this.timer);
      this.timer = setTimeout(() => {
        boxShadow.style.top = "-200px";
        document.body.trigger("mousedown"); // => 'hello jTool'
        console.log("xx,m");
      }, 500);
    };

    console.log(Element);
    let dom = document.querySelector(
      "#app .el-input:nth-of-type(2) .el-input__inner:nth-of-type(1)"
    );
    // console.log(this.getOffset(dom), "xxx");
    dom.addEventListener("input", () => {
      console.log("xxx");
    });
  },
  methods: {
    ff() {
      console.log("xxx");
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
    filterEl(arr) {
      console.log;
      let elStr = "";
      let filterStr = "";
      let isDom;
      for (var i = 0; i < arr.length; i++) {
        if (i > 0) {
          elStr += " > ";
        }
        let node = arr[arr.length - i - 1];
        let sign = "";
        let child = "";
        switch (node.type) {
          case "id":
            sign = "#";
            break;
          case "class":
            sign = ".";
            child = "nth-of-type";
            break;
          default:
            sign = "";
            child = "nth-child";
        }
        if (
          ["id", "class", "body"].includes(node.type) ||
          arr.length - 1 === i
        ) {
          if (filterStr) {
            filterStr += " ";
          }
          filterStr +=
            sign + node.ele + (node.index ? `:${child}(${node.index})` : "");
        }
        elStr +=
          sign + node.ele + (node.index ? `:${child}(${node.index})` : "");
      }

      isDom = document.querySelectorAll(filterStr).length === 1;
      return isDom ? filterStr : elStr;
    },
    getEl(target, arr = []) {
      if (target.tagName === "BODY") {
        arr.push({ ele: target.localName, type: "body", index: 0 });
        return this.filterEl(arr);
      } else if (target.id) {
        arr.push({ ele: target.id, type: "id", index: 0 });
        return this.filterEl(arr);
      } else {
        if (target.className) {
          // console.log(target.className);
          let nodes = document.querySelectorAll("." + target.className);
          if (nodes.length > 1) {
            let index = 0;
            index = Array.prototype.slice
              .call(target.parentElement.children)
              .findIndex(node => {
                return node === target;
              });
            arr.push({
              ele: target.className.replace(/ /g, "."),
              type: "class",
              index: index + 1
            });
            return this.getEl(target.parentElement, arr);
          } else {
            arr.push({
              ele: target.className.replace(/ /g, "."),
              type: "class",
              index: 0
            });
            return this.filterEl(arr);
          }
        } else if (target.localName && target.localName !== "font") {
          let index = 0;
          index = Array.prototype.slice
            .call(target.parentElement.children)
            .findIndex(node => {
              return node === target;
            });
          arr.push({
            ele: target.localName,
            type: "tagName",
            index: index + 1
          });
          return this.getEl(target.parentElement, arr);
        }
      }
    }
  }
};
</script>
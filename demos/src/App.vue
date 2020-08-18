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
                  <div ref="s">1111111</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- <router-view></router-view> -->

  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.$refs.s.onclick = e => {
      console.log(e);
    };
  }
};
</script>
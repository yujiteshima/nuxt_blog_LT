<template>
  <div>
    <Top />
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import Top from '../components/Top'
import Footer from '../components/Footer'
export default {
  components: {
    Top,
    Footer
  },
  computed: {}
}
</script>
<style>
html {
  /* font-family: sans-serif, 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; */
  font-family: Quicksand, 游ゴシック体, 'Yu Gothic', YuGothic,
    'ヒラギノ角ゴシック Pro', 'Hiragino Kaku Gothic Pro', メイリオ, Meiryo,
    Osaka, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
body {
  /* background-color: azure; */
  background-color: #f1f1f1;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

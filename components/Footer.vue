<template>
  <b-container fluid>
    <b-row class="header">
      <b-col cols="12" class="d-flex align-items-center justify-content-center">
        <b-row>
          <b-col cols="12" class="blog-title text-center">
            <nuxt-link v-scroll-to="'#top'" to>Teshi Blog</nuxt-link>
          </b-col>
          <b-col cols="12" class="blog-sub-title text-center">
            <small>Copyright &copy; 2019 Yuji Teshima</small>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.header {
  background: #24c6dc; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #514a9d,
    #24c6dc
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #514a9d,
    #24c6dc
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: cornsilk;
  height: 20vh;
}
.blog-title {
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}
.blog-sub-title {
  font-size: 18px;
}
a {
  color: cornsilk;
  text-decoration: none;
  transition: 0.5s ease-in-out; /* どれだけ時間をかけて変化するか*/
  &:hover {
    color: coral;
    border-bottom: 1px solid coral;
    letter-spacing: 1px;
  }
}
</style>

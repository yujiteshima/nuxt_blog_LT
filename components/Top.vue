<template>
  <div>
    <!--Top-->
    <b-container v-if="isTop" fluid class="top">
      <b-row id="top" class="header">
        <b-col
          cols="12"
          class="d-flex align-items-center justify-content-center"
        >
          <b-row v-if="!isWorks" class="fade-in">
            <b-col
              cols="12"
              class="d-flex align-items-center justify-content-center"
            >
              <b-row class="top-nav">
                <b-col cols="4" class="top-menu backhome px-4" @click="toAbout"
                  >About</b-col
                >
                <b-col cols="4" class="top-menu backhome px-4" @click="toWorks"
                  >Works</b-col
                >
                <b-col
                  cols="4"
                  class="top-menu backhome px-4"
                  @click="toContact"
                  >Contact</b-col
                >
              </b-row>
            </b-col>
            <b-col cols="12" class="blog-title text-center">Teshi Blog</b-col>
            <b-col cols="12" class="blog-sub-title text-center pb-5"
              >Nuxt.js + GraphCMS + Firebase</b-col
            >
            <b-col v-show="getSelectWord" cols="12" class="pt-5 text-center">
              <span class="message">You are narrowing down....</span>
            </b-col>
            <b-col
              v-show="getSelectWord"
              cols="12"
              class="selectInfo text-center"
            >
              <span class="all-item" @click="allItems">All Items</span>
              <span class="pipe">|</span>
              <span class="select-word">{{ getSelectWord }}</span>
            </b-col>
          </b-row>
          <b-row v-if="isWorks">
            <b-col
              cols="12"
              class="d-flex align-items-center justify-content-center"
            >
              <b-row>
                <b-col cols="4" class="text-center backhome" @click="goHome"
                  >Portfolio Top</b-col
                >
                <b-col cols="12" class="blog-title text-center"
                  >Works Page</b-col
                >
                <b-col cols="12" class="blog-sub-title text-center pb-5"
                  >Nuxt.js + GraphCMS + Firebase</b-col
                >
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <!--Topここまで-->
    <!-- ここからDetailHeader-->
    <b-container v-if="isDetail" fluid class="detail">
      <b-row class="header">
        <b-container>
          <b-row id="top" class="fade-in">
            <b-col
              cols="12"
              class="detail-text d-flex align-items-center justify-content-left"
            >
              <b-row>
                <b-col cols="12" class="blog-title" @click="goHome">
                  {{ linkName }}
                </b-col>
                <b-col cols="12" class="title">{{ post.title }}</b-col>
                <b-col cols="12" class="info">
                  <fa-icon icon="calendar-alt" class="tags"></fa-icon>
                  {{ dateFormat(post.date, 'YYYY/MM/DD') }}
                  <fa-icon
                    v-if="post.tag1"
                    icon="tags"
                    class="tags pl-3"
                  ></fa-icon>
                  <b-badge
                    v-if="post.tag1"
                    variant="secondary"
                    class="badge"
                    @click.stop="select(post.tag1)"
                    >{{ post.tag1 }}</b-badge
                  >
                  <b-badge
                    v-if="post.tag2"
                    variant="secondary"
                    class="badge"
                    @click.stop="select(post.tag2)"
                    >{{ post.tag2 }}</b-badge
                  >
                  <b-badge
                    v-if="post.tag3"
                    variant="secondary"
                    class="badge"
                    @click.stop="select(post.tag3)"
                    >{{ post.tag3 }}</b-badge
                  >
                  <b-badge
                    v-if="post.tag4"
                    variant="secondary"
                    class="badge"
                    @click.stop="select(post.tag4)"
                    >{{ post.tag4 }}</b-badge
                  >
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-container>
      </b-row>
    </b-container>
    <!--ここまでDetailHeader-->
  </div>
</template>

<script>
import format from 'date-fns/format'
import ja from 'date-fns/locale/ja'
import parse from 'date-fns/parse'
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getSelectWord']),
    isTop() {
      if (this.$route.path === '/' || this.$route.path === '/works') {
        return true
      } else {
        return false
      }
    },
    isDetail() {
      if (this.$route.path !== '/works' && this.$route.path.match(/^\/.+/)) {
        return true
      } else {
        return false
      }
    },
    isWorks() {
      if (this.$route.path === '/works') {
        return true
      } else {
        return false
      }
    },
    // @detail
    ...mapState(['posts']),
    post() {
      const targetPost = this.posts.find(
        (v) => v.slug === this.$route.params.slug
      )
      return targetPost
    },
    linkName() {
      if (
        this.$route.path === '/posts/about-page' ||
        this.$route.path === '/posts/contact'
      ) {
        return 'Yuji Teshima Portfolio'
      } else {
        return 'Teshi Blog'
      }
    }
    // isAbout() {
    //   if (
    //     this.$route.path === '/posts/about-page' ||
    //     this.$route.path === '/posts/contact'
    //   ) {
    //     return false
    //   } else {
    //     return true
    //   }
    // }
  },
  methods: {
    allItems() {
      this.$store.dispatch('allItems')
    },
    goHome() {
      this.$router.push('/')
    },
    toBlog() {
      this.$router.push(`./`)
    },
    toAbout() {
      this.$router.push(`./about-page`)
    },
    toWorks() {
      this.$router.push(`./works`)
    },
    toContact() {
      this.$router.push(`./contact`)
    },
    // @detail
    dateFormat(date = new Date(), formatStr) {
      return format(parse(date), formatStr, { locale: ja })
    },
    async select(tag) {
      const selectPosts = await this.posts.filter(
        (v) =>
          v.tag1 === tag || v.tag2 === tag || v.tag3 === tag || v.tag4 === tag
      )

      this.$store.dispatch('selectPosts', selectPosts)
      this.$store.commit('setWord', tag)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
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
    height: 60vh;
  }
  .blog-title {
    font-size: 4em;
    //font-family: Economica, sans-serif;
  }
  .blog-sub-title {
    font-size: 16px;
  }

  .selectInfo {
    font-size: 18px;
    .all-item {
      cursor: pointer;
      transition: 0.5s ease-in-out;
      &:hover {
        color: coral;
        border-bottom: 1px solid coral;
        letter-spacing: 1px;
      }
    }
    .pipe {
      font-size: 24px;
    }

    .select-word {
      border-bottom: 1px solid cornsilk;
    }
  }

  .backhome {
    cursor: pointer;
    position: relative;
    padding: 0.1em 0.3em;
    display: inline-block;
    transition: 0.3s;
    color: #ff8f00;
  }
  .backhome::before,
  .backhome::after {
    position: absolute;
    content: '';
    width: 0;
    height: 1px;
    background-color: #ff8f00;
    transition: 0.3s;
  }
  .backhome::before {
    top: 0;
    left: 0;
  }
  .backhome::after {
    bottom: 0;
    right: 0;
  }
  .backhome:hover::before,
  .backhome:hover::after {
    width: 100%;
  }

  .fade-in {
    animation-name: fadein;
    animation-duration: 2s;
    animation-iteration-count: 1;
  }
  @keyframes fadein {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.detail {
  // グラデーション
  .header {
    background: #24c6dc; /* fallback for old browsers */
    background: linear-gradient(to right, #514a9d 0%, #24c6dc 100%);
    opacity: 0.5;
    animation: huerotator 20s infinite alternate;
    color: cornsilk;
  }

  @keyframes huerotator {
    0% {
      -webkit-filter: hue-rotate(0deg);
      filter: hue-rotate(0deg);
    }

    100% {
      -webkit-filter: hue-rotate(360deg);
      filter: hue-rotate(360deg);
    }
  }
  // グラテーションここまで
  .detail-text {
    height: 60vh;
    font-weight: normal;
  }
  .blog-title {
    cursor: pointer;
    font-size: 18px;
    font-weight: bolder;
    transition: 0.5s ease-in-out; /* どれだけ時間をかけて変化するか*/
    &:hover {
      color: coral;
      border-bottom: 1px solid coral;
      letter-spacing: 1px;
    }
  }
  .title {
    font-size: 40px;
  }

  .info {
    font-size: 14px;
  }
  /* 1秒かけて透明度を遷移 */
  // .v-enter-active,
  // .v-leave-active {
  //   transition: opacity 1, transform 1s;
  // }
  /* 見えなくなるときの透明度 */
  // .v-enter {
  //   opacity: 0;
  // }
  // .v-leave-to {
  //   opacity: 0;
  // }
  // .view-enter-active,
  // .view-leave-active {
  //   transition: opacity 0.5s;
  // }
  // .view-leave-active {
  //   position: absolute;
  // }
  // .view-enter,
  // .view-leave-to {
  //   opacity: 0;
  // }

  // .v-enter-active,
  // .v-leave-active {
  //   transition: opacity 1s, transform 1s;
  // }
  /* 表示するときは左から */
  // .v-enter {
  //   opacity: 0;
  //   transform: translateY(-10px);
  // }
  /* 消えるときは下へ */
  // .v-leave-to {
  //   opacity: 0;
  //   transform: translateY(10px);
  // }
  .fade-in {
    animation-name: fadein;
    animation-duration: 2s;
    animation-iteration-count: 1;
  }
  @keyframes fadein {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .backhome {
    cursor: pointer;
    position: relative;
    padding: 0.1em 0.3em;
    display: inline-block;
    transition: 0.3s;
    color: #ff8f00;
  }
  .backhome::before,
  .backhome::after {
    position: absolute;
    content: '';
    width: 0;
    height: 1px;
    background-color: #ff8f00;
    transition: 0.3s;
  }
  .backhome::before {
    top: 0;
    left: 0;
  }
  .backhome::after {
    bottom: 0;
    right: 0;
  }
  .backhome:hover::before,
  .backhome:hover::after {
    width: 100%;
  }

  .badge {
    cursor: pointer;
    transform: scale(1);
    transition: 0.3s ease-in-out;
    &:hover {
      //opacity: 0.8;
      transform: scale(1.1);
      color: coral;
      letter-spacing: 1px;
    }
  }
}
</style>

<template>
  <b-container>
    <b-row v-if="!isWorks" class="pt-4">
      <b-col cols="10" offset="1">
        <b-col cols="12" class="markdown-content">
          <div v-html="$md.render(post.content)"></div>
        </b-col>
      </b-col>
    </b-row>

    <b-row v-if="isWorks" class="mt-4 d-flex justify-content-center">
      <b-card-group deck>
        <b-col
          v-for="item in portf"
          :key="item.id"
          sm="6"
          :md="colParm"
          class="text-center d-flex justify-content-center my-3"
        >
          <b-card
            no-body
            class="mb-2 item-card zoom point"
            @click="detail(item.slug)"
          >
            <b-img-lazy
              v-bind="mainProps"
              :src="item.thumbnail.url"
              center
              fluid
              alt="category Image"
            ></b-img-lazy>
            <b-card-body>
              <b-card-title class="title">{{ item.title }}</b-card-title>
              <b-card-text>
                <span class="descript">{{ item.description }}</span>
                <br />
                <fa-icon icon="calendar-alt" class="tags" />
                <span class="date">
                  {{ dateFormat(item.date, 'YYYY/MM/DD') }}
                </span>
                <br />
              </b-card-text>
            </b-card-body>
          </b-card>
        </b-col>
      </b-card-group>
    </b-row>
  </b-container>
</template>

<script>
import format from 'date-fns/format'
import ja from 'date-fns/locale/ja'
import parse from 'date-fns/parse'

import { mapState } from 'vuex'
import Prism from '~/plugins/prism'
export default {
  data() {
    return {
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: '#bbb',
        width: 600,
        height: 400,
        class: 'my-5'
      }
    }
  },
  computed: {
    ...mapState(['posts', 'portf']),
    colParm() {
      let colnum = '4'
      if (this.portf.length === 2) {
        colnum = '6'
      } else if (this.portf.length === 1) {
        colnum = '12'
      }
      return colnum
    },
    post() {
      const targetPost = this.posts.find(
        (v) => v.slug === this.$route.params.slug
      )
      return targetPost
    },
    isWorks() {
      if (
        // this.$route.path.match(/posts\/[A-Za-z0-9]+/) &&
        this.$route.path === '/works'
      ) {
        return true
      } else {
        return false
      }
    }
  },
  head() {
    if (
      // this.$route.path.match(/posts\/[A-Za-z0-9]+/) &&
      this.$route.path === '/works'
    ) {
      return {
        title: 'works'
      }
    } else {
      return {
        title: this.post.slug
      }
    }
  },
  mounted() {
    Prism.highlightAll()
  },
  methods: {
    dateFormat(date = new Date(), formatStr) {
      return format(parse(date), formatStr, { locale: ja })
    },
    detail(slug) {
      // console.log(slug)
      this.$router.push(`./${slug}`)
      // this.$router.push({ path: `/works-portfolio-site` })
    },
    async select(tag) {
      const selectPosts = await this.posts.filter(
        (v) =>
          v.tag1 === tag || v.tag2 === tag || v.tag3 === tag || v.tag4 === tag
      )

      this.$store.dispatch('selectPosts', selectPosts)
      this.$store.commit('setWord', tag)
    }
  }
}
</script>

<style lang="scss" scoped>
.zoom {
  transform: scale(1);
  transition: 0.3s ease-in-out;
}
.zoom:hover {
  transform: scale(1.01);
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
}
.point {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}
.tags {
  font-size: 0.5rem;
}
.title {
  font-size: 16px;
  font-weight: bolder;
}
.descript {
  font-size: 12px;
}
.date {
  font-size: 14px;
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
</style>

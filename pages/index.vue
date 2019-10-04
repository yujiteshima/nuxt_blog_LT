<template>
  <b-container>
    <b-row class="mt-4 d-flex justify-content-center">
      <b-card-group deck>
        <b-col
          v-for="post in itemsA"
          :key="post.id"
          sm="6"
          :md="colParm"
          class="text-center d-flex justify-content-center my-3"
        >
          <b-card
            no-body
            class="mb-2 item-card zoom point"
            @click="detail(post.slug)"
          >
            <b-img-lazy
              v-bind="mainProps"
              :src="post.thumbnail.url"
              center
              fluid
              alt="category Image"
            ></b-img-lazy>
            <b-card-body>
              <b-card-title class="title">{{ post.title }}</b-card-title>
              <b-card-text>
                <span class="descript">{{ post.description }}</span>
                <br />

                <fa-icon icon="calendar-alt" class="tags"></fa-icon>

                <span class="date">{{
                  dateFormat(post.date, 'YYYY/MM/DD')
                }}</span>
                <br />
              </b-card-text>
              <fa-icon v-if="post.tag1" icon="tags" class="tags"></fa-icon>
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

export default {
  components: {},
  scrollToTop: true,
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
    ...mapState(['posts', 'items']),
    itemsA() {
      return this.items.filter((v) => !v.slug.match(/about-page|contact|works/))
    },
    colParm() {
      let colnum = '4'
      if (this.items.length === 2) {
        colnum = '6'
      } else if (this.items.length === 1) {
        colnum = '12'
      }
      return colnum
    }
  },
  head() {
    return {
      title: 'TOP'
    }
  },
  methods: {
    detail(slug) {
      this.$router.push(`./${slug}`)
    },
    dateFormat(date = new Date(), formatStr) {
      const fmtdate = format(parse(date), formatStr, { locale: ja })
      return fmtdate
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

<template>
  <div id="game-detail">
    <h1>{{ game.title }}</h1>

    <p class="actions">
      <router-link class="action" :to="{ name: 'game-detail', params: { gameId: $route.params.gameId } }"><icon-text text="문제보기" icon="today" /></router-link>
      <router-link class="action" :to="{ name: 'game-submission', params: { gameId: $route.params.gameId } }"><icon-text text="제출목록" icon="list" /></router-link>
      <router-link class="action" :to="{ name: 'game-match', params: { gameId: $route.params.gameId } }"><icon-text text="실시간 전적" icon="flame" /></router-link>
    </p>

    <div v-html="$options.filters.marked(game.description)"></div>
  </div>
</template>

<script>
import { query } from '../../components/undersky-api';

export default {
  data() {
    return { game: {} };
  },
  mounted() {
    query(`game(id: "${this.$route.params.gameId}") { id title description }`).then((data) => {
      this.game = data.game;
    });
  },
};
</script>

<style lang="scss">
h1 {
  margin: 10px 0;
}

.actions {
  font-weight: 700;

  .action {
    line-height: 30px;
    padding: 0 10px;
    color: #303f9f;
    margin-right: 10px;

    &:hover {
      background: #303f9f;
      color: #ffffff;
    }
  }
}
</style>

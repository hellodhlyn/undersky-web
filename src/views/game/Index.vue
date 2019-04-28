<template>
  <div id="game-index">
    <div class="game" v-for="game in games" v-bind:key="game.id">
      <h2 class="title">
        <router-link :to="{ name: 'game-detail', params: { gameId: game.id } }">{{ game.title }}</router-link>
      </h2>
      <p class="description"><icon-text :text="'0명 도전중'" icon="people" /></p>
      <div class="summary" v-html="$options.filters.marked(game.summary)"></div>
      <p class="actions">
        <router-link class="action" :to="{ name: 'game-detail', params: { gameId: game.id } }"><icon-text text="문제보기" icon="today" /></router-link>
        <router-link class="action" :to="{ name: 'game-submission', params: { gameId: game.id } }"><icon-text text="제출목록" icon="list" /></router-link>
        <router-link class="action" :to="{ name: 'game-match', params: { gameId: game.id } }"><icon-text text="실시간 전적" icon="flame" /></router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { query } from '../../components/undersky-api';

export default {
  data() {
    return { games: [] };
  },
  mounted() {
    query('gameList { items { id title summary } }').then((data) => {
      this.games = data.gameList.items;
    });
  },
};
</script>

<style lang="scss">
.game {
  .title {
    margin: 10px 0;
    a { color: #212121; }
  }

  .description {
    margin-top: 0;
    color: #757575;
  }

  .summary p {
    margin: 8px 0;
  }

  .actions {
    text-align: center;
    font-weight: 700;

    .action {
      line-height: 30px;
      padding: 0 10px;
      color: #303f9f;
      margin: 0 10px;

      &:hover {
        background: #303f9f;
        color: #ffffff;
      }
    }
  }
}
</style>

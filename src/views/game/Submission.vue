<template>
  <div id="game-submission">
    <h1>{{ game.title }}<span> : 제출목록</span></h1>

    <p class="actions">
      <router-link class="action" :to="{ name: 'game-detail', params: { gameId: $route.params.gameId } }"><icon-text text="문제보기" icon="today" /></router-link>
      <router-link class="action" :to="{ name: 'game-submission', params: { gameId: $route.params.gameId } }"><icon-text text="제출목록" icon="list" /></router-link>
      <router-link class="action" :to="{ name: 'game-match', params: { gameId: $route.params.gameId } }"><icon-text text="실시간 전적" icon="flame" /></router-link>
    </p>

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>제출자</th>
          <th>실행환경</th>
          <th>메모</th>
          <th>전적</th>
          <th>동작</th>
          <th>일시</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sub in submissionList" v-bind:key="sub.id">
          <td>{{ sub.id }}</td>
          <td>{{ sub.user.username }}</td>
          <td>{{ runtimeText(sub.runtime) }}</td>
          <td>{{ sub.description || '-' }}</td>
          <td>{{ matchingLogText(sub.matchList.items) }}</td>
          <td>
            <router-link :to="{ name: 'game-try', params: { 'gameId': $route.params.gameId }, query: { 'competition': sub.id }, }" v-if="isMatchable(sub)">
              <icon-text text="매치" icon="arrow-dropright-circle"/>
            </router-link>
            <icon-text class="match-unavaliable" text="매치 불가" icon="close" v-else/>
          </td>
          <td>{{ $options.filters.datetime(sub.createdAt) }}</td>
        </tr>
      </tbody>
    </table>

    <router-link :to="{ name: 'game-try', params: { 'gameId': $route.params.gameId }, query: { 'noMatch': true } }">
      <button class="primary">매칭 없이 제출</button>
    </router-link>
  </div>
</template>

<script>
import { query } from '../../components/undersky-api';

export default {
  data() {
    return {
      game: {},
      submissionList: [],
    };
  },
  methods: {
    runtimeText(runtime) {
      return {
        'python3.6': 'Python 3',
      }[runtime];
    },
    matchingLogText(matches) {
      if (!matches || matches.length === 0) {
        return '전적 없음';
      }

      const winCount = matches.filter(m => m.result === 'win').length;
      const loseCount = matches.filter(m => m.result === 'lose').length;
      const drawCount = matches.filter(m => m.result === 'draw').length;
      return `${winCount}승 ${drawCount}무 ${loseCount}패 (${(winCount / matches.length * 100).toFixed(2)}%)`;
    },
    isMatchable(sub) {
      const matches = sub.matchList.items;
      const finishedCount = matches.filter(m => m.state === 'finished').length;
      const errorCount = matches.filter(m => m.result === 'error').length;

      return matches.length === 0 || (errorCount === 0 && finishedCount > 0);
    },
  },
  mounted() {
    query(`
      game(id: "${this.$route.params.gameId}") { title }
      submissionList { items { 
        id user{username} description runtime createdAt
        matchList{items{state result}}
      }}
    `).then((data) => {
      this.game = data.game;
      this.submissionList = data.submissionList.items;
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

button {
  margin: 20px 0;
}
</style>

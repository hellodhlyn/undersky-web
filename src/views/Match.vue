<template>
  <div id="match">
    <h1>최근 전적</h1>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>게임</th>
          <th>제출자</th>
          <th>제출환경</th>
          <th>상대방</th>
          <th>상대환경</th>
          <th>상태</th>
          <th>결과</th>
          <th>승/무/패</th>
          <th>총 라운드</th>
          <th>승률</th>
          <th>일시</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="match in matchList" v-bind:key="match.id">
          <td>{{ match.id }}</td>
          <td>
            <router-link :to="{ name: 'game-detail', params: { gameId: match.game.id } }">
              {{ match.game.title }}
            </router-link>
          </td>
          <td>{{ match.player.username }}</td>
          <td>{{ runtimeText(match.playerSubmission.runtime) }}</td>
          <td>{{ match.competitor.username }}</td>
          <td>{{ runtimeText(match.competitorSubmission.runtime) }}</td>
          <td>{{ stateText(match.state) }}</td>
          <td :class="['result', match.result]">{{ resultText(match.result) }}</td>
          <td>{{ match.playerWin }}/{{ match.totalRound - match.playerWin - match.competitorWin }}/{{ match.competitorWin }}</td>
          <td>{{ match.totalRound }}</td>
          <td>{{ match.state === 'finished' ? `${(match.playerWin / match.totalRound * 100).toFixed(2)}%` : '-' }}</td>
          <td>{{ $options.filters.datetime(match.createdAt) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { query } from '../components/undersky-api';

export default {
  data() {
    return {
      matchList: [],
    };
  },
  methods: {
    stateText(state) {
      return {
        submitted: '대기중',
        initializing: '준비중',
        started: '진행중',
        finished: '매치 종료',
        failed: '매치 오류',
      }[state];
    },
    resultText(result) {
      return {
        win: '승리!',
        lose: '패배 :(',
        draw: '무승부',
        error: '실행 오류',
      }[result] || '-';
    },
    runtimeText(runtime) {
      return {
        'python3.6': 'Python 3',
      }[runtime];
    },
  },
  mounted() {
    query(`
      matchList { items { 
        id game{id title} state player{username} competitor{username}
        playerSubmission{runtime} competitorSubmission{runtime}
        result errorMessage totalRound playerWin competitorWin createdAt
      }}
    `).then((data) => {
      this.matchList = data.matchList.items;
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

table {
  .result {
    &.win {
      font-weight: 700;
      color: #388e3c;
    }
    &.lose { color: #d32f2f; }
    &.draw { color: #616161; }
    &.error { color: #616161; }
  }
}
</style>

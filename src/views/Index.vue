<template>
  <div id="index">
    <div class="divided container game">
      <h1 class="title">#1000 - 틱택토</h1>
      <p class="description"><icon-text :text="'0명 도전중'" icon="people" /></p>
      <p>틱택토는 3×3판에 두 사람이 번갈아가며 O, X를 표기하여, 같은 모양이 가로/세로/대각선으로 먼저 이어지게 만드는 사람이 이기는 게임입니다.</p>
      <p class="actions">
        <router-link class="action" :to="{ name: 'game-index', params: { gameId: '1000' } }"><icon-text text="도전하기" icon="play-circle" /></router-link>
        <router-link class="action" to="#"><icon-text text="실시간 랭킹" icon="list" /></router-link>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game {
  margin-top: 20px;

  .title {
    margin: 10px 0;
    text-align: center;
  }

  .description {
    margin-top: 0;
    text-align: center;
    color: #757575;
  }

  .actions {
    text-align: center;
    font-weight: 700;

    .action {
      line-height: 30px;
      padding: 0 10px;
      color: #3f51b5;
      margin: 0 10px;

      &:hover {
        background: #3f51b5;
        color: #ffffff;
      }
    }
  }
}
</style>

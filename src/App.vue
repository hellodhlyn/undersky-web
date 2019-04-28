<template>
  <div id="app">
    <div class="navbar">
      <div id="user-info" @click="signOut()" v-if="getUserInfo() !== null">
        <icon-text :text="getUserInfo().username" padding="8px" icon="person"/>
      </div>
      <div id="user-info" @click="$router.push({ name: 'auth-signin' })" v-else>
        <span class="nav-user">
          <icon-text text="로그인" padding="8px" icon="person"/>
        </span>
      </div>
      <ul>
        <li><router-link class="nav-item" :to="{ name: 'game-index' }">게임 목록</router-link></li>
        <li><router-link class="nav-item" :to="{ name: 'match' }">최근 전적</router-link></li>
        <li><router-link class="nav-item" to="#">실시간 랭킹</router-link></li>
      </ul>
    </div>
    <div class="router-view-wrapper">
      <router-view class="router-view"/>
    </div>
    <notifications group="undersky"/>
  </div>
</template>

<script>
export default {
  methods: {
    getUserInfo() {
      const expiredAt = this.$localStorage.get('undersky.auth.validUntil', -1, Number);
      if (expiredAt > (new Date()).getTime()) {
        return JSON.parse(this.$localStorage.get('undersky.auth.userInfo'));
      }
      return null;
    },
    signOut() {
      // eslint-disable-next-line
      if (confirm('로그아웃할까요?')) {
        this.$router.push({ name: 'auth-signout' });
      }
    },
  },
};
</script>


<style lang="scss">
body {
  margin: 0;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 300;
}

h1 span, h2 span, h3 span {
  font-weight: 400;
  &.small { font-size: 12px; }
}

a {
  color: #0288d1;
}

button {
  color: #ffffff;
  border: none;
  padding: 12px 16px;
  display: inline-block;

  background-color: #212121;
  &:not(:disabled):hover { background-color: #424242; }

  &.primary {
    background-color: #303f9f;
    &:not(:disabled):hover { background-color: #5c6bc0; }
  }
  &:disabled { background-color: #e0e0e0; }
}

table {
  border-collapse: collapse;
  width: 100%;
  text-align: left;

  thead {
    color: #ffffff;
    background-color: #212121;
  }

  tr {
    height: 50px;
  }

  tr:nth-child(2n) {
    background-color: #f5f5f5;
  }

  th, td {
    padding-left: 8px;
    border: 0;
  }

  .match-unavaliable {
    color: #616161;
  }
}

.navbar {
  height: 100vh;
  width: 320px;
  float: left;
  background: #212121;
  color: #fafafa;
  line-height: 40px;

  a {
    color: #fafafa;
    text-decoration: none;
  }

  ul {
    margin: 0;
    padding: 32px;
    list-style: none;

    li:hover { text-decoration: underline; }
  }

  #user-info {
    margin: 22px 22px 0 22px;
    padding: 0 10px;

    &:hover {
      cursor: pointer;
      background-color: #424242;
    }
  }
}

.router-view-wrapper {
  height: calc(100vh);
  overflow: scroll;
  float: right;
  width: calc(100% - 320px);

  .router-view { margin: 40px; }
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  &.divided {
    width: 758px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
  }
}

.vue-notification {
  margin-top: 4px;
  margin-bottom: 0;
}
</style>

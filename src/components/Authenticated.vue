<template>
  <div class="authenticated">
    <div v-if="loading">
      잠시만 기다려주세요...
    </div>
    <div v-else-if="authenticated">
      <slot/>
    </div>
    <div v-else id="error" class="container">
      <div>
        <h1>401</h1>
        <p>로그인이 필요합니다.</p>
        <router-link :to="{ name: 'auth-signin' }">
          <button>지금 로그인</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      authenticated: false,
    };
  },
  created() {
    const expiredAt = this.$localStorage.get('undersky.auth.validUntil', -1, Number);
    this.authenticated = (expiredAt > (new Date()).getTime());
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.authenticated #error {
  display: flex;
  height: calc(70vh);
  align-items: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  text-align: center;

  h1 {
    font-size: 600%;
    margin: 0;
  }

  p {
    margin-top: 0px;
    font-size: 150%;
  }
}
</style>

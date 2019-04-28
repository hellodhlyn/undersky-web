<template>
  <p>잠시만 기다려주세요...</p>
</template>

<script>
export default {
  mounted() {
    // eslint-disable-next-line
    if (gapi.auth2) {
      // eslint-disable-next-line
      gapi.auth2.init().signOut();
    }

    this.$localStorage.remove('undersky.auth.accessToken');
    this.$localStorage.remove('undersky.auth.secretToken');
    this.$localStorage.remove('undersky.auth.userInfo');
    this.$localStorage.remove('undersky.auth.validUntil');

    this.$notify({
      group: 'undersky',
      title: '로그아웃 성공',
      text: '로그아웃에 성공했습니다. 또 만나요!',
      type: 'success',
    });

    this.$router.push({ name: 'index' });
  },
};
</script>

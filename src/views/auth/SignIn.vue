<template>
  <div id="signup">
    <div class="wrapper">
      <div v-if="state === 'signin'">
        <h1>로그인</h1>
        <div id="signin-google"></div>
      </div>
      <div v-else-if="state === 'signup'">
        <h1>환영합니다!</h1>
        <p>첫 로그인 시 회원정보 등록이 필요합니다.</p>
        <input type="text" name="username" placeholder="닉네임 (2 ~ 20글자)" v-model="input.username" />
        <button @click="onRegister()">등록하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import { query, mutation } from '../../components/undersky-api';

export default {
  data() {
    return {
      state: 'signin', // signin | signup
      input: { username: '' },
      googleIdToken: '',
    };
  },
  methods: {
    signIn() {
      query(`signInWithGoogle(token: "${this.googleIdToken}") { registered accessToken secretToken }`).then((data) => {
        if (data.signInWithGoogle.registered) {
          const { accessToken, secretToken } = data.signInWithGoogle;
          this.$localStorage.set('undersky.accessToken', accessToken);
          this.$localStorage.set('undersky.secretToken', secretToken);
          this.$router.push({ name: 'index' });
        } else {
          this.state = 'signup';
        }
      });
    },
    onSignIn(user) {
      this.googleIdToken = user.getAuthResponse().id_token;
      this.signIn();
    },
    onSignInFail() {
      alert('로그인에 실패했습니다. 잠시 후 다시 시도해주세요.');
    },
    onRegister() {
      mutation(`registerUserWithGoogle(input: { token: "${this.googleIdToken}", username: "${this.input.username}" }) { result }`).then(() => {
        alert('회원정보 등록이 완료되었습니다.');
        this.signIn();
      }).catch((err) => {
        alert(err[0].message);
      });
    },
  },
  mounted() {
    // eslint-disable-next-line
    gapi.signin2.render('signin-google', {
      scope: 'profile email',
      width: 360,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: this.onSignIn,
      onfailure: this.onSignInFail,
    });
  },
};
</script>

<style lang="scss" scoped>
#signup {
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  height: calc(100vh - 80px);

  .wrapper {
    width: 360px;
    padding: 20px;
    border: 1px solid #e0e0e0;
    text-align: center;

    h1 {
      font-weight: normal;
    }

    #signin-google {
      margin: 50px 0;
    }

    input {
      width: 100%;
      padding: 10px 0;
      margin: 5px 0;
      border: 0;
      border-bottom: 1px solid #e0e0e0;
      font-size: 16px;

      &:focus {
        border-bottom: 1px solid #9e9e9e;
      }
    }

    button {
      height: 40px;
      width: 100%;
      margin: 5px 0;
      font-size: 16px;
      border: 0;
      background: #3f51b5;
      color: #fafafa;
    }
  }
}
</style>

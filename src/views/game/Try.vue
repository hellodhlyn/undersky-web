<template>
  <authenticated id="game-try">
    <h1>{{ game.title }}<span> : 매치</span></h1>

    <p class="actions">
      <router-link class="action" :to="{ name: 'game-detail', params: { gameId: $route.params.gameId } }"><icon-text text="문제보기" icon="today" /></router-link>
      <router-link class="action" :to="{ name: 'game-submission', params: { gameId: $route.params.gameId } }"><icon-text text="제출목록" icon="list" /></router-link>
      <router-link class="action" :to="{ name: 'game-match', params: { gameId: $route.params.gameId } }"><icon-text text="실시간 전적" icon="flame" /></router-link>
    </p>

    <h3>제출 정보</h3>
    <div id="submission-info">
      <div class="info-item" v-if="!noMatch">
        <span class="label">상대방</span>
        <span class="dropdown"><icon-text :text="compSub.user && compSub.user.username" icon="arrow-dropdown" position="right"/></span>
      </div>
      <div class="info-item" v-else>
        <span class="label">상대방</span>
        <span class="text">매칭없이 제출</span>
      </div>
      <div class="info-item">
        <span class="label">실행 환경</span>
        <span class="dropdown"><icon-text text="Python 3.6" icon="arrow-dropdown" position="right"/></span>
      </div>
      <div class="info-item">
        <span class="label">공개 메모</span>
        <input type="text" name="description" placeholder="100글자 미만의 메시지" maxlength="100" v-model="input.description" />
      </div>
    </div>

    <h3>소스 코드 <span class="small">(<a target="_blank" href="https://github.com/hellodhlyn/undersky/blob/master/docs/Submission.md">제출 도움말</a>)</span></h3>
    <codemirror id="code-editor" v-model="input.source" :options="cmOptions" />

    <button class="primary" @click="submit()" :disabled="!validated">제출</button>
  </authenticated>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import { query, mutation } from '../../components/undersky-api';

// Languages
import 'codemirror/mode/python/python';

// Themes
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-light.css';

// Add-ons
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/selection/active-line';

const pythonDemo = `def action(data, context): 
    result = ['myresult']
    mydata = {'key': 'value'}

    return result, mydata
`;

export default {
  components: { codemirror },
  data() {
    return {
      input: {
        source: '',
        description: '',
      },
      cmOptions: {
        mode: 'text/x-python',
        theme: 'base16-light',
        autoCloseBrackets: true,
        indentUnit: 4,
        tabSize: 4,
        line: true,
        lineNumbers: true,
        styleActiveLine: true,
      },
      noMatch: false,
      validated: false,
      game: {},
      compSub: {},
    };
  },
  methods: {
    submit() {
      const mutationStr = this.noMatch
        ? `submitSource(input: {
          gameID: "${this.$route.params.gameId}",
          runtime: "python3.6",
          source: """\n${this.input.source}\n"""
          description: "${this.input.description}"
        }) { id }`
        : `submitSource(input: {
          gameID: "${this.$route.params.gameId}",
          runtime: "python3.6",
          source: """\n${this.input.source}\n"""
          description: "${this.input.description}"
          competitorSubmissionID: "${this.$route.query.competition}"
        }) { id }`;

      mutation(mutationStr, true).then(() => {
        this.$notify({
          group: 'undersky',
          title: '제출 성공',
          text: '제출에 성공했습니다. 매치 실행에는 다소 시간이 소요될 수 있습니다.',
          type: 'success',
        });
        this.$router.push({ name: 'game-match', params: { gameId: this.$route.params.gameId } });
      }).catch((err) => {
        this.$notify({
          group: 'undersky',
          title: '제출 실패',
          text: err[0].message,
          type: 'error',
        });
      });
    },
  },
  mounted() {
    this.noMatch = this.$route.query.noMatch;
    this.input.source = pythonDemo;

    if (this.noMatch) {
      query(`game(id: "${this.$route.params.gameId}") { title }`).then((data) => {
        this.game = data.game || {};
      });
      this.validated = true;
    } else {
      query(`
        game(id: "${this.$route.params.gameId}") { title }
        submission(id: "${this.$route.query.competition}") { game{id} user{username} }
      `).then((data) => {
        this.game = data.game || {};
        this.compSub = data.submission || {};

        if (data.submission === null
            || this.$route.params.gameId !== data.submission.game.id) {
          this.$notify({
            group: 'undersky',
            title: '오류 발생',
            text: '올바르지 않은 접근입니다.',
            type: 'error',
          });
        } else {
          this.validated = true;
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
h1 { margin-top: 0; }

#submission-info {
  .info-item {
    span {
      padding: 10px 0;

      &.text {
        padding-left: 10px;
      }

      &.label {
        display: inline-block;
        width: 120px;
        font-weight: bold;
      }

      &.dropdown {
        padding-left: 10px;
        padding-right: 10px;
        display: inline-block;

        ion-icon { vertical-align: center; }
        &:hover { background: #f5f5f5; }
      }
    }

    input {
      padding-left: 10px;
      font-size: 16px;
      border: 0;
    }

    &:not(:last-of-type) { border-bottom: 1px solid #e0e0e0; }
  }
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

#code-editor {
  margin: 20px 0;
}
</style>
